enyo.kind({
  name: 'XV.Inbox',
  kind: 'enyo.FittableRows',
  classes: 'message-inbox',
  published: {
    messages: null
  },
  components: [
    { kind: 'onyx.Toolbar', content: 'Inbox', style: 'width: 100%' },
    // { name: 'messages', kind: 'XV.ChatWindow', fit: true, style: 'width: 100%' },
    { kind: 'enyo.Scroller', 
      fit: true, 
      style: 'width: 100%', 
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
    { kind: 'enyo.Signals', onModelCreated: 'newMessage' }
  ],
  bindings: [
    { from: '.messages', to: '.$.repeater.collection' }
  ],
  create: enyo.inherit(function(sup) {
    return function() {
      var messages = new XM.MessageCollection();

      messages.fetch();

      sup.call(this, arguments);

      this.set('messages', messages);
    };
  }),
  newMessage: function(inSender, inEvent) {
    if(inEvent.kind == 'XM.Message') {
      var newMessage = xCore.getRecordForKind(inEvent.kind, inEvent.id);

      // Don't want to put things in our inbox that weren't sent to us
      if(newMessage.get('recipient') == xCore.currentUser().get('uid')) {
        this.messages.add(newMessage);
        // this.render();
      }
    }

    return true;
  }
});
