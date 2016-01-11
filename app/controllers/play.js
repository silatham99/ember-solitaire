import Ember from 'ember';
import GameLogic from '../mixins/game-logic';

export default Ember.Controller.extend(GameLogic, {
  actions: {
    moveCard: function(card, newLocation) {
      var finishStacks = ['s','c','h','d'],
          cardStacks = ['a', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'j', 'q', 'k'];

      if (typeof card === "string") {
        card = this.store.getById('card', card);
      }

      if (finishStacks.indexOf(newLocation) !== -1 || cardStacks.indexOf(newLocation) !== -1) {
        card.set('location', newLocation);
      }
    }
  }
});
