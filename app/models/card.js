import DS from 'ember-data';

export default DS.Model.extend({
  suit: DS.attr(),
  cardNumber: DS.attr(),
  location: DS.attr(),
  sortOrder: DS.attr(),
  visible: DS.attr(),
  photoSrc: function() {
    if (this.get('visible')) {
			return this.assets.resolve("/images/" + this.get('suit') + this.get('cardNumber') + ".png");
		} else {
			return this.assets.resolve("/images/ember-card.png");
		}
	}.property('suit', 'cardNumber', 'visible')
});
