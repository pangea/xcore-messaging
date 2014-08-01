enyo.kind({
  name: 'XV.ChatMessage',
  kind: 'enyo.Control',
  classes: 'chat-message',
  published: {
    message: '',
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
    { from: '.message', to: '.$.text.content' }
  ]
});
