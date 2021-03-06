import Ember from 'ember';
import PlayingDeck from '../mixins/playing-deck';

export default Ember.Route.extend(PlayingDeck, {
	model() {
		return this.generateNewDeck();
	}
});
