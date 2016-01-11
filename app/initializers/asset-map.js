import Ember from 'ember';

export function initialize(container, application) {
    application.deferReadiness();

    var AssetMap = Ember.Object.extend();

    var promise = new Ember.RSVP.Promise(function(resolve, reject) {
        Ember.$.getJSON('assets/assetMap.json', resolve).fail(reject);
    });

    promise.then(function(assetMap) {
        AssetMap.reopen({
            assetMap: assetMap,
            resolve: function(name) {
                return assetMap.assets[name];
            }
        });
    }, function() {
        AssetMap.reopen({
            resolve: function(name) {
                return name;
            }
        });
    }).then(function() {
        container.register('assetMap:main', AssetMap, {singleton: true});
        application.inject('model:card', 'assets', 'assetMap:main');
        application.advanceReadiness();
    });
}

export default {
  name: 'asset-map',
  initialize: initialize
};
