import Ember from 'ember';

export default Ember.Mixin.create({
	generateNewDeck: function() {
		var suits = ['S','C','H','D'],
			cardNumbers = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'],
			unusedLocations = this.getNewLocations(),
			deck;

		deck = [].concat.apply([], suits.map(function(suit) {
			return cardNumbers.map(function(cardNumber) {
				return { 
					suit: suit,
				 	cardNumber: cardNumber,
				 	location: unusedLocations.pop()
			  	};
			});
		}));

		return this.shuffle(deck);
	},

	getNewLocations: function() {
		var locations = [],
		stack, cards, remainingLocations;

		// Create all of the card stack locations
		for (var stack = 1; stack < 8; stack++) {
			for (cards = 0; cards < stack; cards++) {
				locations.push(stack);
			}
		}

		// Allocate the rest of the cards to the flipping deck
		for (remainingLocations = locations.length; remainingLocations < 52; remainingLocations++) { 
			locations.push('f');
		}

		return this.shuffle(locations);
	},

	shuffle: function(array) {
		var currentIndex = array.length,
			clone = array.slice(0),
		 	temporaryValue, randomIndex

		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = clone[currentIndex];
			clone[currentIndex] = clone[randomIndex];
			clone[randomIndex] = temporaryValue;
		}

		return clone;
	}
});