import Ember from 'ember';
import GameLogic from '../mixins/game-logic';

export default Ember.Component.extend(GameLogic, {
  classNames: ['flipping-deck'],

  deckPosition: 0,

  cardsInStack: function() {
    return this.get('cards').filterBy('location', 'f');
  }.property('cards.@each.location'),

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

  click: function(event) {
    if ($(event.target).hasClass('deck')) {
      this.set('deckPosition', this.get('nextPosition'));
    }
  },

  doubleClick: function(event) {
    var card = this.get('showingCards.lastObject');
    if (this.canFinishCard(this.get('cards'), card)) {
      this.sendAction('moveCard', card, card.get('suit'));
    }
  }
});
