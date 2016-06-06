// Create Application
let App = window.App = Ember.Application.create({

});

var request = require('request');

// Router
App.Router.map(function(){
    this.resource('main', {path: '/'});
    this.route('docs');
    this.route('about');
});

App.DocsController = Ember.ObjectController.extend({
    test: '123abc',
    documents: function (){
        request("http://localhost:3000/documents", function(error, response, val){
           console.log(val);
            return 7;
        });
    }()
})