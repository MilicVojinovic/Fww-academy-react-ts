import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import './index.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

library.add(fas)

ReactDOM.render(
//   <React.StrictMode>
    <App />
//   </React.StrictMode>,
,
  document.getElementById('root')
);


// reportWebVitals(console.log);
