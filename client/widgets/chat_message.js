enyo.kind({
  name: 'XV.ChatMessage',
  kind: 'enyo.Control',
  classes: 'chat-message',
  published: {
    model: '',
    recipient: ''
  },
  components: [
    // Eventually, we should probably change these to display actual avatars
    { name: 'avatar',
      classes: 'fa fa-user chat-message-avatar',
      tag: 'i'
    },
    { name: 'text',
      classes: 'chat-message-text'
    }
  ],
  bindings: [
    { from: '.model.text', to: '.$.text.content' },
    { from: '.model.recipient',
      to: '.recipient', 
      transform: function(value) {
        // Check if the current user sent this message
        if(value == xCore.currentUser().get('uid')) {
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
});
