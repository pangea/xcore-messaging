(function () {
  "use strict";
  var STATES = enyo.States;

  enyo.kind({
    name: 'XM.Message',
    kind: 'XM.Model',
    primaryKey: 'id',
    mergeKeys: ['id'],
    defaults: {
      sender: xCore.currentUser().uid
    },
    /**
     * Reimplemented to use dispatcher instead of source. Otherwise, functionally
     * equivalent to enyo.Model's [commit]{@link enyo.Model#commit}.
     */
    commit: function(opts) {
      var o = opts ? enyo.clone(opts) : {};
      o.success = enyo.bindSafely(this, 'didCommit', this, opts);
      o.fail = enyo.bindSafely(this, 'didFail', this, opts);
      new XM.Dispatch({
        nameSpace: 'XM',
        type: 'Messenger',
        functionName: 'deliver',
        parameters: [this.get('recipient'), this.get('text')]
      }, o);
    }
  });

  enyo.kind({
    name: 'XM.MessageCollection',
    kind: 'XM.Collection',
    model: 'XM.Message'
  });
}());
