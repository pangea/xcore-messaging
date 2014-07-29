CREATE OR REPLACE FUNCTION comment_at_user_check() RETURNS trigger AS
$$
  (function() {
    var text = NEW.comment_text,
        sourceId = NEW.comment_source_id,
        // Grab @ mentions. E.g @chall or @bzettler
        recipients = text.match(/@\w+/g);

    // No recipients, no action.
    if(!recipients.length) { return; }

    if(DEBUG) {
      XT.debug('recipients (before OLD check)): ', JSON.stringify(recipients));
    }

    // Remove users that have already been messaged from this comment
    if(OLD) {
      if(DEBUG) {
        XT.debug('old comment text: ', OLD.comment_text);
      }
      OLD.comment_text.match(/@\w+/g).forEach(function(username) {
        var index = recipients.indexOf(username);
        if(index > -1) {
          recipients.splice(index, 1);
        }
      });
    }

    if(DEBUG) {
      XT.debug('final recipients: ', JSON.stringify(recipients));
    }

    if(recipients.length) {
      recipients.forEach(function(username) {
        // Strip off that leading @
        username = username.replace('@', '');

        XM.Messenger.deliver(username, text);
      });
    }

  }());
$$ LANGUAGE plv8;

-- HOOKINitUP!
DROP TRIGGER IF EXISTS comment_at_user_check ON comment;
CREATE TRIGGER comment_at_user_check
       AFTER INSERT OR UPDATE ON comment
       FOR EACH ROW EXECUTE PROCEDURE comment_at_user_check();
