import Ember from 'ember';
import PlayingDeck from '../mixins/playing-deck';
import GameLogic from '../mixins/game-logic';

export default Ember.Component.extend(PlayingDeck, GameLogic, {
  attributeBindings: ['style'],
  classNames: ['finish-stack'],

  dragOver(event) {
    event.preventDefault();
  },

  drop(event) {
    var dropData = event.dataTransfer.getData('card');
    if (!dropData) { return false; }
    var card = JSON.parse(dropData);
    if (this.canFinishCard(this.get('cards'), Ember.Object.create(card))) {
      this.sendAction('moveCard', card.id, this.get('suit'));
    }
  },

	style: Ember.computed('isEmpty', function() {
    if (this.get('isEmpty')) { return ''; }
	}),

  cardsInStack: Ember.computed('cards.@each.location', 'suit', function() {
    return this.get('cards').filterBy('location', this.get('suit'));
  }),

  showingCard: Ember.computed('cardsInStack.@each.cardNumber', 'isEmpty', function() {
    if (this.get('isEmpty')) {
      return null;
    } else {
      return this.maxCard(this.get('cardsInStack'));
    }
  }),

  isEmpty: Ember.computed('cardsInStack.length', function() {
    return this.get('cardsInStack.length') === 0;
  })
});
