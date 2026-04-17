import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// …existing imports…
import './styles/global.css';
import { initI18n } from './i18n';

initI18n();

ReactDOM.render(<App />, document.getElementById('root'));
