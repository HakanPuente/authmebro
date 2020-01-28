import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import makeStore from '../src/store/createStore';
import 'semantic-ui-less/semantic.less';
import '../src/styles/styles.less';
import { RelayEnvironmentProvider } from 'relay-hooks';
import { Store as ReduxStore } from 'redux';
import { appWithTranslation } from '../src/i18n';
import AuthInit from '../src/modules/auth/auth-init';
import InitLayout from '../src/modules/common/init-layout';
import createRelayEnv from '../src/relay/relay-env';
import { RelayModernEnvironment } from 'relay-runtime/lib/store/RelayModernEnvironment';

class MyApp extends App {
  state = {
    loadingMsg: 'One moment ...',
    error: null,
  };

  store?: ReduxStore = undefined;
  relayEnv?: RelayModernEnvironment = undefined;

  setLoadingMsg = (msg: string): void => {
    this.setState({ loadingMsg: msg });
  };

  setError = (error: Error): void => {
    this.setState({ error });
  };

  UNSAFE_componentWillMount(): void {
    this.store = makeStore({});
    this.relayEnv = createRelayEnv(this.store);
  }

  render(): any {
    const { Component, pageProps } = this.props as any;
    const { loadingMsg, error } = this.state;
    return (
      <InitLayout error={error} loadingMsg={loadingMsg}>
        {this.store && this.relayEnv && (
          <Provider store={this.store}>
            <RelayEnvironmentProvider environment={this.relayEnv}>
              <AuthInit
                loadingMsg={loadingMsg}
                setLoadingMsg={this.setLoadingMsg}
                error={error}
                setError={this.setError}
              />
              <Component {...pageProps} />
            </RelayEnvironmentProvider>
          </Provider>
        )}
      </InitLayout>
    );
  }
}

export default appWithTranslation(MyApp);
