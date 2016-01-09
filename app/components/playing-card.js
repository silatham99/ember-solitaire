import Ember from 'ember';

export default Ember.Component.extend({

	imageFilePath: function() {
		return "/assets/images/" + this.get('card.cardNumber') + this.get('card.suit') + ".svg";
	}.property('card.suit', 'card.cardNumber')

});