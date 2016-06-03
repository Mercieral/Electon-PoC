// Create Application
let App = window.App = Ember.Application.create({

});

// Router
App.Router.map(function(){
    this.resource('main', {path: '/'});
    this.route('docs');
    this.route('about');
});
