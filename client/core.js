(function () {
  "use strict";

  var messaging = new enyo.Control({
        name: 'messaging',
        classes: 'message-drawer-wrapper',
        handlers: {
          onToggleOpen: 'toggleOpen',
          onChatCreate: 'createNewChat'
        },
        components: [
          { name: 'drawer', 
            kind: 'enyo.Drawer',
            open: false,
            orient: 'h',
            classes: 'message-drawer',
            components: [
              { kind: 'XV.UserTypeahead', name: 'chatCreator' },
              { kind: 'XV.ChatClient', name: 'client'},
              // needs abstraction ----------------------
              { kind: 'onyx.Toolbar',
                content: 'Inbox'
              },
              // ----------------------------------------
              {
                kind: 'XV.FontAwesomeIcon',
                classes: 'fa message-icon',
                icon: 'comments-o',
                events: {
                  onToggleOpen: ''
                },
                handlers: {
                  ontap: 'doTap'
                },
                doTap: function() {
                  this.doToggleOpen();
                  return true;
                }
              }
            ]
          }
        ],
        createNewChat: function(inEvent, recipient) {
          this.$.client.addChat({
            recipient: recipient,
            messages: new XM.MessageCollection(),
            forceOpen: true
          });
        },
        toggleOpen: function() {
          this.$.drawer.setOpen(!this.$.drawer.getOpen());
        }
      }),
      toggleMessageWindow = function() {
        messaging.toggleOpen();
      };

  xCore.$.gui.addStatusBarIcon({
    kind: 'XV.FontAwesomeIcon',
    classes: 'fa message-icon',
    icon: 'comments-o',
    handlers: {
      ontap: 'doTap'
    },
    doTap: function() {
      messaging.toggleOpen();
      return true;
    }
  });

  messaging.render();
  // Add the messaging node to the DOM
  // TODO: This is a really bad way to do this, but I haven't been able to find
  //       a better way to do it.  Attaching it to the xCore object doesn't seem
  //       to work and appending it to the GUI has unintented side effects.
  document.body.appendChild(messaging.hasNode());

  window.messaging = messaging;
  
  // XT.extensions.message = {
  //   name: 'messages',
  //   label: '_message'.loc(),
  //   panels: [
  //     { name: 'messageList', kind: 'XV.MessageList', label: '_message'.loc() }
  //   ],
  //   handleNewMessage: function(newMessage) {
  //     if(!newMessage) { return; }
  //     var nav = XT.app.$.postbooks.getNavigator(),
  //         workspace = nav.$.workspace,
  //         button;
      
  //     workspace.generateNewChatBox(newMessage.sender, false);

  //     button = document.querySelectorAll("#" + workspace.$.messageHolder.$[newMessage.sender + "ChatBox"].node.parentNode.id + " button")[0];
  //     if (!button.classList.contains('active')) {
  //       button.className = button.className + " chat-message-new";
  //     }


  //     workspace.$.messageHolder.$[newMessage.sender + "ChatBox"].addChatMessage(newMessage);
  //   }
  // };

}());

