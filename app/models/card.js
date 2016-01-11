import DS from 'ember-data';

export default DS.Model.extend({
  suit: DS.attr(),
  cardNumber: DS.attr(),
  location: DS.attr(),
  sortOrder: DS.attr(),
  visible: DS.attr()
});
