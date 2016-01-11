import Ember from 'ember';
import GameLogic from '../mixins/game-logic';

export default Ember.Component.extend(GameLogic, {
  classNames: ['card-stack'],

  doubleClick: function() {
    if (this.canFinishCard(this.get('cards'), this.get('showingCard'))) {
      this.sendAction('moveCard', this.get('showingCard'), this.get('showingCard.suit'));
    }
  },

  dragOver: function(event) {
    event.preventDefault();
  },

  drop: function(event) {
    var card = JSON.parse(event.dataTransfer.getData('card'));
    if (this.canStackCard(Ember.Object.create(card), this.get('showingCard'))) {
      this.sendAction('moveCard', card.id, this.get('stackNumber'));
    }
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
