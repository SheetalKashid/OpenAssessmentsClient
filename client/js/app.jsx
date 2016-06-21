"use strict";

import 'babel-polyfill';
import es6Promise              from 'es6-promise';
import React                   from 'react';
import ReactDOM                from 'react-dom';
import { Provider }            from 'react-redux';
import Immutable               from 'immutable';
import _                       from 'lodash';
import $                       from 'jquery';

import routes                  from './routes';
import DevTools                from './dev/dev_tools';
import configureStore          from './store/configure_store';
import jwt                     from './loaders/jwt';
import QueryString             from './utils/query_string';
import { htmlDecodeWithRoot }  from './utils/utils';

// Polyfill es6 promises for IE
es6Promise.polyfill();

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();


class Root extends React.Component {
  render(){
    const devTools = __DEV__ ? <DevTools /> : null;
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div>
          {routes}
          {devTools}
        </div>
      </Provider>
    );
  }
}

function getAssessmentData(){
  var data = null;
  const el = document.getElementById('assessment_data');
  if(el && el.innerText.length > 0){
    data = el.innerText;
  }
  var result = htmlDecodeWithRoot(data);
  if(!result){ // Result was empty. Try returning the raw result
    result = data;
  }
  result = _.trim(result);
  result = result.replace('<![CDATA[', '');
  result = result.replace('<!--[CDATA[', '');
  if(result.slice(-3) == ']]>'){
    result = result.slice(0,-3);
  }
  return result;
}

// Build settings from DEFAULT_SETTINGS, the url, and data embedded in the page
var settings = _.merge(window.DEFAULT_SETTINGS, QueryString.params(), { assessment_data: getAssessmentData() });
settings.assessment_kind = settings.assessment_kind ? settings.assessment_kind.toUpperCase() : null;
settings = Immutable.fromJS(settings);

const store = configureStore({settings});

if (window.DEFAULT_SETTINGS.jwt){
  // Setup JWT refresh
  jwt(store.dispatch, window.DEFAULT_SETTINGS.userId);
}

ReactDOM.render(
  <Root store={store} />,
  document.getElementById("main-app")
);
