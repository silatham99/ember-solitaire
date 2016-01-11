import Ember from 'ember';

export default Ember.Component.extend({
	classNameBindings: ['movable:movable', ':playing-card'],
	attributeBindings: ['style', 'draggable'],

	draggable: true,

	dragStart: function(event) {
		var card = { id: this.get('card.id'), cardNumber: this.get('card.cardNumber'), suit: this.get('card.suit') };
    return event.dataTransfer.setData('card', JSON.stringify(card));
  },

	style: function() {
		return 'background-image: url("' + this.get('imageFilePath') + '"); background-size: 100%;';
	}.property('imageFilePath'),

	imageFilePath: function() {
		return "/images/" + this.get('card.suit') + this.get('card.cardNumber') + ".png";
	}.property('card.suit', 'card.cardNumber')
});
