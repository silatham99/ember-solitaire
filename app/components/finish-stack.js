import Ember from 'ember';
import PlayingDeck from '../mixins/playing-deck';

export default Ember.Component.extend(PlayingDeck, {
  attributeBindings: ['style'],
  classNames: ['finish-stack'],

  dragOver: function(event) {
    event.preventDefault();
  },

  drop: function(event) {
    var cardId = event.dataTransfer.getData('card');
    this.sendAction('moveCard', cardId, this.get('suit'));
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
