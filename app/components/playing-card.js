import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['playing-card'],
	attributeBindings: ['style', 'draggable'],

	draggable: true,

	dragStart: function(event) {
    return event.dataTransfer.setData('card', this.get('card.id'));
  },

	style: function() {
		return 'background-image: url("' + this.get('imageFilePath') + '"); background-size: 100%;';
	}.property('imageFilePath'),

	imageFilePath: function() {
		return "/images/" + this.get('card.suit') + this.get('card.cardNumber') + ".png";
	}.property('card.suit', 'card.cardNumber')
});
