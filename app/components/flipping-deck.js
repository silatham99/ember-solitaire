import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['flipping-deck'],

  deckPosition: 0,

  cardsInStack: function() {
    return this.get('cards').filterBy('location', 'f');
  }.property('cards'),

  showingCards: function() {
    if (this.get('nextPosition') > this.get('deckPosition')) {
      return this.get('cardsInStack').slice(this.get('deckPosition'), this.get('nextPosition'));
    } else {
      return this.get('cardsInStack').slice(this.get('deckPosition'), this.get('cardsInStack.length'));
    }
  }.property('deckPosition', 'nextPosition', 'cardsInStack.length'),

  nextPosition: function() {
    if (this.get('cardsInStack.length') > this.get('deckPosition') + 3) {
      return this.get('deckPosition') + 3;
    } else {
      return this.get('cardsInStack.length') - this.get('deckPosition');
    }
  }.property('deckPosition', 'cardsInStack.length'),

  doubleClick: function() {
    this.send('flipCards');
  },

  actions: {
    flipCards: function() {
      this.set('deckPosition', this.get('nextPosition'));
    },
    finishCard: function() {
      var card = this.get('showingCards.lastObject');
      this.sendAction('moveCard', card, card.get('suit'));
    }
  }
});
