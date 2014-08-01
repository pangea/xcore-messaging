enyo.kind({
  name: 'XV.ChatWindow',
  kind: 'enyo.Control',
  published: {
    messages: null,
    recipient: null
  },
  handlers: {
    onMessageSend: 'sendMessage'
  },
  components: [
    { kind: 'enyo.FittableRows',
      style: 'height: 100%',
      components: [
        { kind: 'enyo.Scroller',
          name: 'scroller',
          classes: 'chat-message-wrapper',
          fit: true,
          components: [
            { kind: 'enyo.DataRepeater',
              name: 'repeater',
              selection: false,
              components: [
                { kind: 'XV.ChatMessage',
                  bindings: [
                    { from: '.model.message', to: '.message' },
                    { from: '.model.recipient',
                      to: '.recipient', 
                      transform: function(value) {
                        // Check if the current user sent this message
                        if(value == xCore.currentUser().uid) {
                          this.addClass('recipient');
                        } else {
                          this.addClass('sender');
                        }
                        // Send the value out.  We don't actually need to do
                        // anything to it.
                        return value;
                      } 
                    }
                  ]
                }
              ]
            }
          ]
        },
        { kind: 'XV.MessageForm' }
      ]
    }
  ],
  bindings: [
    { from: '.messages', to: '.$.repeater.collection' }
  ],
  sendMessage: function(inEvent, message) {
    var messages = this.get('messages'),
        newMessage = messages.createRecord({
          message: message,
          recipient: this.get('recipient')
        });
    // newMessage.commit();
    this.$.scroller.scrollToBottom();
  }
});
