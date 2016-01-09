import Ember from 'ember';

export default Ember.ArrayController.extend({
	cardsInFlippingDeck: Ember.computed.filterBy('@this', 'location', 'f'),

	cardsInHeartStack: Ember.computed.filterBy('@this', 'location', 'h'),
	cardsInSpadeStack: Ember.computed.filterBy('@this', 'location', 's'),
	cardsInDiamondStack: Ember.computed.filterBy('@this', 'location', 'd'),
	cardsInClubStack: Ember.computed.filterBy('@this', 'location', 'c'),

	cardsInFirstStack: Ember.computed.filterBy('@this', 'location', 1),
	cardsInSecondStack: Ember.computed.filterBy('@this', 'location', 2),
	cardsInThirdStack: Ember.computed.filterBy('@this', 'location', 3),
	cardsInFourthStack: Ember.computed.filterBy('@this', 'location', 4),
	cardsInFifthStack: Ember.computed.filterBy('@this', 'location', 5),
	cardsInSixthStack: Ember.computed.filterBy('@this', 'location', 6),
	cardsInSeventhStack: Ember.computed.filterBy('@this', 'location', 7)
});