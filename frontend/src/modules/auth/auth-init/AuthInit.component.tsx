import { FunctionComponent, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import {
  graphql,
  STORE_OR_NETWORK,
  useQuery,
  ReactRelayContext,
} from 'relay-hooks';
import { me } from '../+store/auth.actions';
import ME_QUERY, {
  AuthInitMeQuery,
} from '../../../__generated__/AuthInitMeQuery.graphql';
import resolveUserFragment from '../utils/resolve-user-fragment';

graphql`
  mutation AuthInitSessionRefreshTokenMutation($input: RefreshInput!) {
    refreshToken(input: $input) {
      token
      payload
    }
  }
`;

graphql`
  query AuthInitMeQuery {
    me {
      ...AuthInitUserFragment
    }
  }
`;

graphql`
  fragment AuthInitUserFragment on UserNode {
    id
    firstName
    lastName
    username
    email
  }
`;

interface Props {
  loadingMsg: string;
  setLoadingMsg: any;
  error: null | Error;
  setError: any;
}

const AuthInit: FunctionComponent<Props> = (componentProps: Props) => {
  const { setLoadingMsg, setError } = componentProps;

  const dispatch = useDispatch();

  const { error, props } = useQuery<AuthInitMeQuery>(
    ME_QUERY,
    {},
    { fetchPolicy: STORE_OR_NETWORK },
  );
  // console.log('error', error);
  // console.log('props', props);

  useEffect(() => {
    setLoadingMsg('');
  }, [setLoadingMsg]);
  const relayContext = useContext(ReactRelayContext) as any;

  useEffect(() => {
    if (error && ['NoSession', 'SessionExpired'].includes(error.name)) {
      dispatch(me(null));
    } else if (error) {
      setError(error);
    } else if (props && props.me) {
      const user = resolveUserFragment(relayContext, props.me);
      dispatch(me(user));
    } else if (props) {
      dispatch(me(null));
    }
  }, [dispatch, error, props, relayContext, setError, setLoadingMsg]);
  return null;
};

export default AuthInit;
