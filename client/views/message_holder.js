(function() {
  "use strict";
  
  XT.extensions.message.initMessageHolder = function() {
    var nav = XT.app.$.postbooks.getNavigator(),
        workspace = nav.$.workspace,
        messageHolder = workspace.createComponent(
          {
            name: "messageHolder", classes: "col-lg-10 col-md-10 no-padding clearfix message-holder", 
            components: [
              {
                kind: 'onyx.MenuDecorator', name: 'chatUsersButton',
                ontap: "loadChatUsers", style: 'float: right', 
                components: [
                  { content: "Users", classes: 'chat-bar-button' },
                  {
                    name: 'chatUserList', modal: false,  kind: "onyx.TitledMenu", 
                    menuTitle: "Online Users", ontap: "chatUserSelected",
                    minimize: function(inSender, inEvent) {
                      this.setShowing(false);
                    },
                    maximize: function(inSender, inEvent) {
                      this.setShowing(true);
                    }
                  }
                ]
              }
            ]
          }
        );

    // Add additional functions to the workspace so that the message shit will work
    workspace.loadChatUsers = function(){
      var users = new XM.UserAccountRelationCollection(),
          excludeValues = ["xtuple","pangea_api","postgres","admin","beryl"],
          list = this.$.chatUserList;

      // fetch users and create and array based off that
      // iterate over and exclude any values matching in excludeValues
      // then wipe the list and repopulate it with names and render
      users.fetch({
        success: function() { 
          list.destroyClientControls();
          for(var i = 0; i < users.models.length; i++){
            if(!(excludeValues.indexOf(users.models[i].id) != -1)){
              list.createComponent({content: users.models[i].id, value: users.models[i].id});
            }
          }
          list.render();
        }
      });
    };

    workspace.chatUserSelected = function(inSender, inEvent) {
      var action = inEvent.originator;
      if (action.value) {
        this.generateNewChatBox(action.value);
      }
      return true; // stop propagation to loadChatUsers
    };

    workspace.generateNewChatBox = function(chatUser, openChat) {
      var nameOfChat = chatUser + "Chat",
          messageHolder = this.$.messageHolder,
          existingChats = [],
          chatbox,
          button;

      // Gather all existingChats
      for(var i = 0, l = messageHolder.children.length; i < l; i++){
        existingChats.push(messageHolder.children[i].name);
      }

      // if chat does not exist then create it
      if(existingChats.indexOf(nameOfChat) == -1){
        chatbox = messageHolder.createComponent(
          {kind: 'onyx.MenuDecorator', name: nameOfChat, ontap: "", style: 'float: right', components: [
            {content: chatUser, classes: 'chat-bar-button'},
            {name: chatUser + "ChatBox", kind: "onyx.ChatBox", chatTitle: chatUser, ontap: "", style: 'right: 0;', components: [
            ]}
          ]}
        );
        this.$.chatUserList.minimize();
        this.$.messageHolder.render();
      } else {
        chatbox = messageHolder.$[nameOfChat];
      }

      // click the button of the new rendered chat so it is displayed
      button = document.querySelectorAll("#" + chatbox.id + " button")[0];
      if(!button.classList.contains('active')) {
        if(!(openChat == false)) {
          button.click();
        }
      }

      // then focus the input
      messageHolder.$[nameOfChat + "Box"].$.input.node.focus();
    };
  };

}());
