import Ember from 'ember';
import GameLogic from '../mixins/game-logic';

export default Ember.Component.extend(GameLogic, {
  classNames: ['flipping-deck'],

  deckPosition: 0,

  didInsertElement() {
    var self = this;
    self.get('cards').filterBy('location', 'f').forEach(function(card, index) {
      self.sendAction('updateCard', card, { sortOrder: index });
    });
  },

  cardsInStack: Ember.computed('cards.@each.location', function() {
    return this.get('cards').filterBy('location', 'f');
  }),

  showingCards: Ember.computed('deckPosition', 'nextPosition', function() {
    if (this.get('nextPosition') > this.get('deckPosition')) {
      return this.get('cardsInStack').slice(this.get('deckPosition'), this.get('nextPosition'));
    } else {
      return this.get('cardsInStack').slice(this.get('deckPosition'), this.get('cardsInStack.length'));
    }
  }),

  nextPosition: Ember.computed('deckPosition', 'cardsInStack.length', function() {
    if (this.get('cardsInStack.length') > this.get('deckPosition') + 3) {
      return this.get('deckPosition') + 3;
    } else {
      return this.get('cardsInStack.length') - this.get('deckPosition');
    }
  }),

  click(event) {
    if ($(event.target).hasClass('deck')) {
      this.set('deckPosition', this.get('nextPosition'));
    }
  },

  doubleClick(event) {
    var card = this.get('showingCards.lastObject');
    if (this.canFinishCard(this.get('cards'), card)) {
      this.sendAction('updateCard', card, { location: card.get('suit') });
    }
  }
});
