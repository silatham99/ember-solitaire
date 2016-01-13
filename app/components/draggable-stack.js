import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['draggable'],
  draggable: true,

  card: Ember.computed('cards.@each.sortOrder', function() {
    return this.get('cards').sortBy('sortOrder').get('firstObject');
  }),
  // Used for first iteration
  nextCard: Ember.computed('cards.@each.sortOrder', function() {
    return this.get('cards').sortBy('sortOrder').get(1);
  }),

  remainingCards: Ember.computed('card', function() {
    var cardId = this.get('card.id');
    return this.get('cards').filter(function(card) {
      return cardId !== card.get('id');
    });
  }),
  continueStacking: Ember.computed('remainingCards.length', function() {
    return this.get('remainingCards.length') > 0;
  })
});
