enyo.kind({
  name: 'XV.ChatClient',
  kind: 'enyo.Control',
  handlers: {
    onChatSwitch: 'switchChat'
  },
  components: [
    { kind: 'enyo.FittableRows',
      style: 'height: 250px;',
      components: [
        { kind: 'onyx.Toolbar',
          name: 'chatList',
          defaultKind: 'XV.ChatListButton',
          handlers: {
            onChatSwitch: 'uncheckButtons'
          },
          uncheckButtons: function(inEvent, recipient) {
            enyo.forEach(this.children, function(child) {
              if(child.get('recipient') !== recipient) {
                child.deactivate();
              }
            });
          }
        },
        { name: 'chatsContainer',
          kind: 'enyo.Panels',
          arrangerKind: 'CardArranger',
          defaultKind: 'XV.ChatWindow',
          fit: true
        }
      ]
    }
  ],
  chats: [],
  addChat: function(options) {
    if(!options) { throw new Error("No Component Provided"); }
    if(!options.recipient) { throw new Error("No Recipient Provided"); }
    
    var numChats = this.chats.length + 1,
        selector;

    options.name = 'chatWindow' + numChats;

    this.chats.push(options);

    this.$.chatsContainer.createComponent(options);

    selector = this.$.chatList.createComponent({
      recipient: options.recipient,
      name: 'chatSelector' + numChats
    });

    this.render();

    if(numChats == 1 || options.forceOpen) {
      selector.activate();
    }
  },
  switchChat: function(inEvent, recipient) {
    enyo.forEach(this.chats, function(chat, i) {
      if(chat.recipient == recipient) {
        console.log('activating chat for', recipient);

        this.$.chatsContainer.setIndex(i);

        var chatWindow = this.$.chatsContainer.getActive();
        chatWindow.$.scroller.scrollToBottom();

        return false;
      }
    }, this);

    return true;
  }
});
