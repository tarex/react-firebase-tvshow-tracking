import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import theme from './toolbox/theme';
import { store, history } from './redux/store';
import { FirebaseAuth } from './helper/firebase';
import authActions from './redux/auth/actions';
import watchActions from './redux/watchlist/actions';
import App from './containers/App/App';
import registerServiceWorker from './registerServiceWorker';
import './toolbox/theme.css';
import './index.css';

const renderApp = () => render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App history={history} />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root'),
);

const boot = () => new Promise((resolve, reject) => {
  const unsub = FirebaseAuth.onAuthStateChanged(
    user => {
      store.dispatch(authActions.syncUser(user));
      store.dispatch(watchActions.listen(user));
      unsub();
      resolve();
    },
    error => reject(error),
  );
});

boot().then(() => renderApp()).catch(error => console.error(error));
registerServiceWorker();
