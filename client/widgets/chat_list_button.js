enyo.kind({
  name: 'XV.ChatListButton',
  style: 'position: relative',
  classes: 'chat-list-button',
  events: {
    onChatSwitch: '',
    onChatClose: ''
  },
  published: {
    active: false,
    recipient: ''
  },
  components: [
    { kind: 'onyx.Button',
      classes: 'button',
      name: 'button',
      ontap: 'activate'
    },
    { kind: 'onyx.Button',
      name: 'close',
      classes: 'close',
      ontap: 'close',
      components: [
        { kind: 'XV.FontAwesomeIcon',
          icon: 'times'
        }
      ]
    }
  ],
  bindings: [
    { from: '.recipient', to: '.$.button.content' }
  ],
  activeChanged: function() {
    console.log('activeChanged');
    if(this.get('active')) {
      this.$.button.addClass('active');
      this.doChatSwitch(this.get('recipient'));
    } else {
      this.$.button.removeClass('active');
    }
  },
  activate: function() {
    this.set('active', true);
    return true;
  },
  deactivate: function() {
    this.set('active', false);
  },
  close: function() {
    this.doChatClose(this.get('recipient'));
    return true;
  }
});
