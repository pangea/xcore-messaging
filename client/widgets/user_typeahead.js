enyo.kind({
  name: 'XV.UserTypeahead',
  kind: 'enyo.Control',
  style: 'position: relative; padding: 5px 10px;',
  events: {
    onChatCreate: ''
  },
  components: [
    { content: '@',
      style: 'position: absolute; top: 10px; left: 15px; color: #d0d0d0; font-size: 1.5em;'
    },
    { kind: 'onyx.Input',
      onkeypress: 'checkForEnter',
      style: 'box-sizing: border-box; width: 100%; padding: 5px 5px 5px 30px; border-radius: 5px; font-size: 1.2em;' }
  ],
  checkForEnter: function(inSender, inEvent) {
    if(!inEvent.shiftKey && inEvent.keyIdentifier == 'Enter') {
      this.doChatCreate(inSender.getValue());
      inSender.setValue('');
    }
    return false;
  }
});
