import DS from 'ember-data';

export default DS.Model.extend({
  suit: DS.attr(),
  cardNumber: DS.attr(),
  location: DS.attr(),
});
