import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['flipping-deck'],

  deckPosition: 0,

  showingCards: function() {
    if (this.get('nextPosition') > this.get('deckPosition')) {
      return this.get('cards').slice(this.get('deckPosition'), this.get('nextPosition'));
    } else {
      return this.get('cards').slice(this.get('deckPosition'), this.get('cards.length'));
    }
  }.property('deckPosition', 'nextPosition', 'cards.length'),

  nextPosition: function() {
    if (this.get('cards.length') > this.get('deckPosition') + 3) {
      return this.get('deckPosition') + 3;
    } else {
      return this.get('cards.length') - this.get('deckPosition');
    }
  }.property('deckPosition', 'cards.length'),

  doubleClick: function() {
    this.send('finishCard');
  },

  actions: {
    flipCards: function() {
      this.set('deckPosition', this.get('nextPosition'));
    },
    finishCard: function() {
      this.sendAction('finishCard', this.get('showingCards.lastObject'));
    }
  }
});
