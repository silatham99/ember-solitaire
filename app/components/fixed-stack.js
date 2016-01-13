import Ember from 'ember';

export default Ember.Component.extend({
  sortedCards: Ember.computed('cards.@each.sortOrder', function() {
    return this.get('cards').sortBy('sortOrder');
  })
});
