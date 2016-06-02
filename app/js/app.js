import 'util/offline';
import './util/helpers';

import { logError } from './util/error';
Em.onerror = (error) => logError(error);

// Create Application
let App = window.App = Ember.Application.create();


// Store
App.Store = null;

// Router
import { routeMap } from './router';
App.Router.map(routeMap);
App.Router.reopen({
    location: 'history'
});
