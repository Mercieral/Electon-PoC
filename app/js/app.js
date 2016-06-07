// Create Application
let App = window.App = Ember.Application.create({

});

var request = require('request-promise');

App.deferReadiness();

// Router
App.Router.map(function(){
    this.resource('main', {path: '/'});
    this.route('docs');
    this.route('about');
});

request({
    uri: 'http://localhost:3000/documents',
    json: true
}).then(function (res){
    App.DocsController = Ember.ObjectController.extend({
        documents: res
    });
    App.advanceReadiness();
});


