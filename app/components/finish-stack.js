import Ember from 'ember';
import PlayingDeck from '../mixins/playing-deck';
import GameLogic from '../mixins/game-logic';

export default Ember.Component.extend(PlayingDeck, GameLogic, {
  attributeBindings: ['style'],
  classNames: ['finish-stack'],

  dragOver: function(event) {
    event.preventDefault();
  },

  drop: function(event) {
    var card = JSON.parse(event.dataTransfer.getData('card'));
    if (this.canFinishCard(this.get('cards'), Ember.Object.create(card))) {
      this.sendAction('moveCard', card.id, this.get('suit'));
    }
  },

	style: function() {
    if (this.get('isEmpty')) { return ''; }
	}.property('isEmpty'),

  cardsInStack: function() {
    return this.get('cards').filterBy('location', this.get('suit'));
  }.property('cards.@each.location', 'suit'),

  showingCard: function() {
    if (this.get('isEmpty')) {
      return null;
    } else {
      return this.maxCard(this.get('cardsInStack'));
    }
  }.property('cardsInStack', 'isEmpty'),

  isEmpty: function() {
    return this.get('cardsInStack.length') === 0;
  }.property('cardsInStack.length')
});
