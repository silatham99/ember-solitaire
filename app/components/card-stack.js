import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['card-stack'],

  doubleClick: function() {
    this.sendAction('moveCard', this.get('showingCard'), this.get('showingCard.suit'));
  },

  dragOver: function(event) {
    event.preventDefault();
  },

  drop: function(event) {
    var cardId = event.dataTransfer.getData('card');
    this.sendAction('moveCard', cardId, this.get('stackNumber'));
  },

  cardsInStack: function() {
    return this.get('cards').filterBy('location', this.get('stackNumber'));
  }.property('cards.@each.location', 'stackNumber'),

  showingCard: function() {
    return this.get('cardsInStack.lastObject');
  }.property('cardsInStack'),

  isEmpty: function() {
    return this.get('cardsInStack.length') === 0;
  }.property('cardsInStack.length')
});
