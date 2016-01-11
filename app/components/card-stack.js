import Ember from 'ember';
import GameLogic from '../mixins/game-logic';

export default Ember.Component.extend(GameLogic, {
  classNames: ['card-stack'],

  didInsertElement() {
    var cards = this.get('cards').filterBy('location', this.get('stackNumber'));
    this.sendAction('updateCard', cards.get('lastObject'), { sortOrder: 0 });
  },

  doubleClick: function() {
    if (this.canFinishCard(this.get('cards'), this.get('showingCard'))) {
      this.sendAction('updateCard', this.get('showingCard'), { location: this.get('showingCard.suit') });
    }
  },

  dragOver: function(event) {
    event.preventDefault();
  },

  drop: function(event) {
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

  cardsInStack: function() {
    return this.get('cards').filterBy('location', this.get('stackNumber'));
  }.property('cards.@each.location', 'stackNumber'),

  showingCard: function() {
    if (!this.get('cardsInStack.length')) { return undefined; }
    return this.get('cardsInStack').reduce(function(max, item) {
      if (isNaN(item.get('sortOrder'))) { return max; }
      return max.get('sortOrder') > item.get('sortOrder') ? max : item
    });
  }.property('cardsInStack.@each.sortOrder'),

  isEmpty: function() {
    return this.get('cardsInStack.length') === 0;
  }.property('cardsInStack.length')
});
