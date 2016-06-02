import Ember from 'ember';

const Router = Ember.Router.extend({

});

Router.map(function() {
    this.route('documents');
    this.route('about');
});

export default Router;