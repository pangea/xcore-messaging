SELECT xt.install_js('XM', 'Messenger', 'xcore-messaging', $$
  (function() {
    if(!XM.Messenger) { XM.Messenger = {}; }

    XM.Messenger.isDispatchable = true;

    XM.Messenger.deliver = function(recipient, text) {
      if(!recipient) { throw "Messages must have a recipient"; }
      if(!text) { throw "Messages must have text"; }

      if(DEBUG) {
        XT.debug('recipient = ', recipient);
        XT.debug('message = ', text);
      }
      
      var msgId = plv8.execute("SELECT postmessage($1, $2);", [recipient, text])[0].postmessage,
          msg = plv8.execute("SELECT * FROM xm.message WHERE id = $1;", [msgId])[0],
          notification = { action: 'message', content: msg },
          // For some reason, single quotes are never escaped properly.
          // All the documentation says that XT.format should properly escape
          // single quotes, but it never seems to work in practice.  Combining
          // it with the replace seems to work, though.
          notifySql = XT.format("NOTIFY %1$I, '%2$s';", ['nodext', JSON.stringify(notification).replace(/'/g, "''")]); //'

      // Send notification back up to node so we can send the new message down
      // to the correct client
      if(DEBUG) {
        XT.debug('notification = ', JSON.stringify(notification));
        XT.debug('notifySql = ', notifySql);
      }

      plv8.execute(notifySql);

      return { data: msg };
    };

    XM.Messenger.getUsers = function() {
      return plv8.execute("SELECT usename FROM pg_user");
    };

    XM.Messenger.echo = function() {
      XT.debug('echo service hit', arguments);
      
      return arguments;
    };
  }());
$$);
