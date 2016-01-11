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

  oppositeSuit: function(cardOne, cardTwo) {
    if (cardOne.get('suit') === 's' || cardOne.get('suit') === 'c') {
      return cardTwo.get('suit') === 'd' || cardTwo.get('suit') === 'h';
    } else if (cardOne.get('suit') === 'd' || cardOne.get('suit') === 'h') {
      return cardTwo.get('suit') === 's' || cardTwo.get('suit') === 'c';
    }
  },

  canStackCard: function(newCard, existingCard) {
    if (!existingCard) {
      return true;
    } else if (existingCard.get('cardNumber') === 'a') {
      return false;
    } else if (existingCard.get('cardNumber') === 2) {
      return newCard.get('cardNumber') === 'a' &&
        this.oppositeSuit(newCard, existingCard);
    } else if (!isNaN(existingCard.get('cardNumber'))) {
      return newCard.get('cardNumber') === (existingCard.get('cardNumber') - 1) &&
        this.oppositeSuit(newCard, existingCard);
    } else if (existingCard.get('cardNumber') === 'j') {
      return newCard.get('cardNumber') === 10 &&
        this.oppositeSuit(newCard, existingCard);
    } else if (existingCard.get('cardNumber') === 'q') {
      return newCard.get('cardNumber') === 'j' &&
        this.oppositeSuit(newCard, existingCard);
    } else if (existingCard.get('cardNumber') === 'k') {
      return newCard.get('cardNumber') === 'q' &&
        this.oppositeSuit(newCard, existingCard);
    }
  }
});
