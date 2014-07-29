(function(){
  "use strict";

  XT.extensions.message.initPostbooks = function() {
    var module, relevantPrivileges;

    module = XT.extensions.message;

    XT.app.$.postbooks.insertModule(module, 8);
    relevantPrivileges = [];

    XT.session.addRelevantPrivileges(module.name, relevantPrivileges);

    // Setup a listener on the datasource websocket to grab message events
    // NOTE: I think this is pretty hacky, but I haven't found a better way to do it
    XT.dataSource.connect(function() {
      XT.dataSource._sock.on('message', module.handleNewMessage);
    });
  };
}());
