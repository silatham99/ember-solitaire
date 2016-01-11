import Ember from 'ember';
import GameLogic from '../mixins/game-logic';

export default Ember.Component.extend(GameLogic, {
  classNames: ['card-stack'],

  didInsertElement() {
    var self = this,
        cards = self.get('cards').filterBy('location', this.get('stackNumber'));

    cards.forEach(function(card, index) {
      self.sendAction('updateCard', card, { sortOrder: index, visible: ((index + 1) === cards.length) });
    });
  },

  doubleClick() {
    if (this.canFinishCard(this.get('cards'), this.get('showingCard'))) {
      this.sendAction('updateCard', this.get('showingCard'), { location: this.get('showingCard.suit') });
    }
  },

  dragOver(event) {
    event.preventDefault();
  },

  drop(event) {
    var dropData = event.dataTransfer.getData('card');
    if (!dropData) { return false; }
    var card = JSON.parse(dropData);
    if (this.canStackCard(Ember.Object.create(card), this.get('showingCard'))) {
      if (isNaN(this.get('showingCard.sortOrder'))) {
        var newSortOrder = 0;
      } else {
        var newSortOrder = this.get('showingCard.sortOrder') + 1;
      }
      this.sendAction('updateCard', card.id, { location: this.get('stackNumber'), sortOrder: newSortOrder });
    }
  },

  cardsInStack: Ember.computed('cards.@each.location', 'stackNumber', function() {
    return this.get('cards').filterBy('location', this.get('stackNumber')).sortBy('sortOrder');
  }),

  showingCard: Ember.computed('cardsInStack.@each.sortOrder', 'isEmpty', function() {
    if (this.get('isEmpty')) { return undefined; }
    return this.get('cardsInStack').reduce(function(max, item) {
      if (isNaN(item.get('sortOrder'))) { return max; }
      return max.get('sortOrder') > item.get('sortOrder') ? max : item
    });
  }),

  showNextCard: Ember.computed('cardsInStack.@each.visible', function() {
    if (this.get('cardsInStack').filterBy('visible', true).length === 0) {
      return this.sendAction('updateCard', this.get('showingCard'), { visible: true });
    }
  }),

  isEmpty: Ember.computed('cardsInStack.length', function() {
    return this.get('cardsInStack.length') === 0;
  })
});
