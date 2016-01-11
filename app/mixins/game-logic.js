import Ember from 'ember';
import PlayingDeck from '../mixins/playing-deck';

export default Ember.Mixin.create(PlayingDeck, {
  canFinishCard: function(cards, card) {
    var finishedCards = this.cardsInLocation(cards, card.get('suit'));
    if (finishedCards.length === 0) { return card.get('cardNumber') === 'a'; }

    var maxCard = this.maxCard(finishedCards);

    if (card.get('cardNumber') === 2) {
      return maxCard.get('cardNumber') === 'a';
    } else if (!isNaN(card.get('cardNumber'))) {
      return card.get('cardNumber') === (maxCard.get('cardNumber') + 1);
    } else if (card.get('cardNumber') === 'j') {
      return maxCard.get('cardNumber') === 10;
    } else if (card.get('cardNumber') === 'q') {
      return maxCard.get('cardNumber') === 'j';
    } else if (card.get('cardNumber') === 'k') {
      return maxCard.get('cardNumber') === 'q';
    }
  },

  canStackCard: function(cards, card, stack) {
    var stackedCards = this.cardsInLocation(cards, stack);
  }
});
