enyo.kind({
  name: 'XV.MessageForm',
  kind: 'enyo.Control',
  events: {
    onMessageSend: ''
  },
  components: [
    { kind: 'enyo.FittableColumns',
      components: [
        { kind: 'enyo.Input',
          name: 'messageInput',
          fit: true,
          onkeypress: 'checkForEnter',
          style: 'height: 34px; font-size: 1.2em'
        },
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
