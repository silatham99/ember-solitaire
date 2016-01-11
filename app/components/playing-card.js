import Ember from 'ember';

export default Ember.Component.extend({
	classNameBindings: ['movable:movable', 'stackable:stackable', ':playing-card'],
	attributeBindings: ['draggable'],

	draggable: Ember.computed('card.visible', function() {
		return this.get('card.visible');
	}),

	dragStart: function(event) {
		var card = { id: this.get('card.id'), cardNumber: this.get('card.cardNumber'), suit: this.get('card.suit') };
    return event.dataTransfer.setData('card', JSON.stringify(card));
  },

	imageFilePath: function() {
		if (this.get('card.visible')) {
			return "/images/" + this.get('card.suit') + this.get('card.cardNumber') + ".png";
		} else {
			return "/images/ember-card.png";
		}
	}.property('card.suit', 'card.cardNumber', 'card.visible')
});
