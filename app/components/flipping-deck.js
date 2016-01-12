import Ember from 'ember';
import GameLogic from '../mixins/game-logic';

export default Ember.Component.extend(GameLogic, {
  classNames: ['flipping-deck'],

  deckPosition: 0,
  currentDeck: [],

  didInsertElement() {
    var self = this;
    this.set('currentDeck', this.get('cards').filterBy('location', 'f'));
    this.get('currentDeck').forEach(function(card, index) {
      self.sendAction('updateCard', card, { sortOrder: index, visible: true });
    });
  },

  click(event) {
    if (Ember.$(event.target).hasClass('deck')) {
      if (this.get('nextPosition') < this.get('deckPosition')) {
        this.set('currentDeck', Ember.copy(this.get('cardsInStack')));
      }
      this.set('deckPosition', this.get('nextPosition'));
    }
  },

  doubleClick() {
    var card = this.get('showingCards.lastObject');
    if (this.canFinishCard(this.get('cards'), card)) {
      this.sendAction('updateCard', card, { location: card.get('suit') });
    }
  },

  cardsInStack: function() {
    return this.get('cards').filterBy('location', 'f');
  }.property('cards.@each.location'),

  showingCards: function() {
    if (this.get('nextPosition') > this.get('deckPosition')) {
      return this.get('currentDeck').slice(this.get('deckPosition'), this.get('nextPosition'));
    } else {
      return this.get('currentDeck').slice(this.get('deckPosition'), this.get('currentDeck.length'));
    }
  }.property('nextPosition', 'currentDeck.[]'),

  nextPosition: Ember.computed('deckPosition', 'currentDeck.length', function() {
    if (this.get('currentDeck.length') > this.get('deckPosition') + 3) {
      return this.get('deckPosition') + 3;
    } else {
      return 3;
    }
  }),

  deckObserver: Ember.observer('cardsInStack.[]', function() {
    var self = this;
    self.get('currentDeck').forEach(function(card, index) {
      var cardIndex = self.get('cardsInStack').findIndex(function(match) { return match.get('id') === card.get('id'); });
      if (isNaN(cardIndex)) {
        self.get('currentDeck').set(index, null);
      }
    });
  })
});
