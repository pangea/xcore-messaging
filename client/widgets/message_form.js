enyo.kind({
  name: 'XV.MessageForm',
  kind: 'enyo.Control',
  classes: 'chat-form',
  events: {
    onMessageSend: ''
  },
  components: [
    { kind: 'enyo.FittableColumns',
      components: [
        {kind: "onyx.InputDecorator", fit: true, components: [
          {kind: "onyx.Input", name: 'messageInput', placeholder: "Type a message...",fit: true, onkeypress: 'checkForEnter'}
        ]},
        { kind: 'onyx.Button', content: 'Send', ontap: 'sendMessage' }
      ]
    }
  ],
  checkForEnter: function(inSender, inEvent) {
    if(!inEvent.shiftKey && inEvent.keyIdentifier == 'Enter') {
      this.sendMessage();
    }
    return false;
  },
  sendMessage: function() {
    var message = this.$.messageInput.getValue();
    if(message) {
      this.doMessageSend(message);
      this.$.messageInput.setValue("");
    }
    return false;
  }
});
