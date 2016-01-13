import Ember from 'ember';

export default Ember.Component.extend({
	classNameBindings: ['stackable:stackable', ':playing-card'],
	attributeBindings: ['draggable'],

	draggable: Ember.computed('card.visible', 'stacked', function() {
		return this.get('card.visible') && !this.get('stacked');
	}),

	dragStart: function(event) {
		var card = { id: this.get('card.id'), cardNumber: this.get('card.cardNumber'), suit: this.get('card.suit') };
    return event.dataTransfer.setData('card', JSON.stringify(card));
  }
});
