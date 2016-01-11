import DS from 'ember-data';

export default DS.Model.extend({
  suit: DS.attr(),
  cardNumber: DS.attr(),
  location: DS.attr(),
  sortOrder: DS.attr(),
  visible: DS.attr(),
  photoSrc: function() {
    if (this.get('visible')) {
			return "images/cards/" + this.get('suit') + this.get('cardNumber') + ".png";
		} else {
			return "images/ember-card.png";
		}
	}.property('suit', 'cardNumber', 'visible')
});
