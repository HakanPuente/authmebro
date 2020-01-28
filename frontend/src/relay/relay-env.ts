import {
  Environment,
  Network,
  QueryResponseCache,
  RecordSource,
  Store,
  UploadableMap,
} from 'relay-runtime';
import { Store as ReduxStore } from 'redux';
import { ajax } from 'rxjs/ajax';
import { switchMap } from 'rxjs/operators';
import nextI18n from '../i18n';
import { withToken } from '../modules/auth/+store/auth.utils';
import settings from '../settings';
import { asyncError } from '../modules/common/async/async.actions';
import { TOKEN_EXPIRED } from '../modules/auth/+store/auth.actions';

const oneMinute = 60 * 1000;
const cache = new QueryResponseCache({ size: 250, ttl: oneMinute });

let environment: Environment;
let reduxStore: ReduxStore;

function fetchQuery(
  operation: any,
  variables: any,
  cacheConfig: any,
  uploadables: UploadableMap | null | undefined,
): any {
  const queryID = operation.text;
  const isMutation = operation.operationKind === 'mutation';
  const isQuery = operation.operationKind === 'query';
  const forceFetch = cacheConfig && cacheConfig.force;
  const fromCache = cache.get(queryID, variables);
  // console.log('operation', operation, variables, cacheConfig);
  if (isQuery && fromCache !== null && !forceFetch) {
    return fromCache;
  }
  return withToken()
    .pipe(
      switchMap(token => {
        let body;
        const headers: any = {
          Accept: 'application/json',
          'Accept-Language': nextI18n.i18n.language,
        };
        if (token) {
          headers['Authorization'] = `JWT ${token}`;
        }
        if (uploadables) {
          if (!window.FormData) {
            throw new Error(
              'Uploading files without `FormData` not supported.',
            );
          }

          const formData = new FormData();
          formData.append('query', operation.text);
          formData.append('variables', JSON.stringify(variables));

          Object.entries(uploadables).forEach(([key, uploadable]) => {
            formData.append(key, uploadable);
          });

          body = formData;
        } else {
          headers['Content-Type'] = 'application/json';
          body = {
            query: operation.text,
            variables,
          };
        }
        return ajax.post(settings.apiUrl, body, headers);
      }),
    )
    .toPromise()
    .then(response => {
      // console.log('response', response);
      if (response.status !== 200) {
        throw Error(`Network error ${response.status}`);
      }
      if (isQuery && response.response) {
        cache.set(queryID, variables, response.response);
      }
      // Clear cache on mutations
      if (isMutation) {
        cache.clear();
      }
      if (response.response.errors) {
        throw new Error(response.response.errors[0].message);
      }
      return response.response;
    })
    .catch(err => {
      // console.error('err', err);
      if (['NoSession', 'SessionExpired'].includes(err.name)) {
        reduxStore.dispatch(asyncError(TOKEN_EXPIRED, err, err.message));
      }
      if (err.response && err.response.errors) {
        throw new Error(err.response.errors[0].message);
      }
      throw err;
    });
}

const createRelayEnv = (store: ReduxStore): Environment => {
  reduxStore = store;
  if (environment) return environment;
  environment = new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
  });
  return environment;
};

export default createRelayEnv;
