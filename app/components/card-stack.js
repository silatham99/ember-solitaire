import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['card-stack'],

  showingCard: function() {
    return this.get('cards.lastObject');
  }.property('cards')

});
