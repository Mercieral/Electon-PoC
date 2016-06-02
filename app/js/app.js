// Create Application
let App = window.App = Ember.Application.create();


// Store
App.Store = null;

// Router
App.Router.map(function(){
    this.resource('main', {path: '/'});
    this.route('documents');
    this.route('about');
});
App.Router.reopen({
    location: 'history'
});
