import Ember from 'ember';
import GameLogic from '../mixins/game-logic';

export default Ember.Controller.extend(GameLogic, {
  actions: {
    updateCard: function(card, params) {
      if (typeof params !== 'object') { return false; }
      if (typeof card === "string") {
        card = this.store.getById('card', card);
      }
      Object.keys(params).forEach(function(attribute) {
        if (attribute === 'location') {
          if (['s','c','h','d'].indexOf(params[attribute]) !== -1 ||
              [1, 2, 3, 4, 5, 6, 7].indexOf(params[attribute]) !== -1) {
            card.set(attribute, params[attribute]);
          }
        } else {
          card.set(attribute, params[attribute]);
        }
      })
    }
  }
});
