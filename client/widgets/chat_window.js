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
                { kind: 'XV.ChatMessage' }
              ]
            }
          ]
        },
        { kind: 'XV.MessageForm' }
      ]
    },
    { kind: 'enyo.Signals', onModelCreated: 'newMessage' }
  ],
  bindings: [
    { from: '.messages', to: '.$.repeater.collection' }
  ],
  sendMessage: function(inEvent, message) {
    var messages = this.get('messages'),
        newMessage = messages.createRecord({
          text: message,
          recipient: this.get('recipient')
        });
    newMessage.commit();
    this.$.scroller.scrollToBottom();
  },
  newMessage: function(inSender, inEvent) {
    if(inEvent.kind == 'XM.Message') {
      var newMessage = xCore.getRecordForKind(inEvent.kind, inEvent.id),
          recipient = this.get('recipient');

      if(
        newMessage.get('sender') == recipient && 
        newMessage.get('recipient') == xCore.currentUser().get('uid')
      ) {
        this.get('messages').add(newMessage);
        this.$.scroller.scrollToBottom();
      }
    }
  }
});
