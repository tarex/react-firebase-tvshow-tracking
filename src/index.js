import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import theme from './toolbox/theme';
import { store, history } from './redux/store';
import Boot from './redux/boot';
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

Boot().then(() => renderApp()).catch(error => console.error(error));
registerServiceWorker();
