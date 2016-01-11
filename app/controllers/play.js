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

      debugger;

      if (finishStacks.indexOf(newLocation) !== -1 && this.canFinishCard(this.get('model'), card) ||
          cardStacks.indexOf(newLocation) !== -1 && this.canStackCard(this.get('model', card, newLocation))) {
        card.set('location', newLocation);
      }
    }
  }
});
