(function () {
  "use strict";
  
  XT.extensions.message = {
    name: 'messages',
    label: '_message'.loc(),
    panels: [
      { name: 'messageList', kind: 'XV.MessageList', label: '_message'.loc() }
    ],
    handleNewMessage: function(newMessage) {
      if(!newMessage) { return; }
      var nav = XT.app.$.postbooks.getNavigator(),
          workspace = nav.$.workspace,
          button;
      
      workspace.generateNewChatBox(newMessage.sender, false);

      button = document.querySelectorAll("#" + workspace.$.messageHolder.$[newMessage.sender + "ChatBox"].node.parentNode.id + " button")[0];
      if (!button.classList.contains('active')) {
        button.className = button.className + " chat-message-new";
      }


      workspace.$.messageHolder.$[newMessage.sender + "ChatBox"].addChatMessage(newMessage);
    }
  };

}());

