enyo.kind({
  name: 'XV.UserTypeahead',
  kind : "onyx.Toolbar",
  layoutKind: "FittableHeaderLayout",
  classes: "white",
  events: {
    onChatCreate: ''
  },
  components: [
    { kind: "onyx.InputDecorator", fit: true, style: 'min-width: 300px;', components: [
      { kind: 'onyx.Input', placeholder: "@",
        onkeypress: 'checkForEnter', style: 'width: 100%;'}
    ]}
  ],
  checkForEnter: function(inSender, inEvent) {
    if(!inEvent.shiftKey && inEvent.keyIdentifier == 'Enter') {
      this.doChatCreate(inSender.getValue());
      inSender.setValue('');
    }
    this.resized();
    return false;
  }
});
