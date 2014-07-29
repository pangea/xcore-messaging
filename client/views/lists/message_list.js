(function() {
  "use strict";

  XT.extensions.message.initMessageList = function() {
    enyo.kind({
      name: "XV.MessageList",
      kind: "XV.List",
      label: "_messageList".loc(),
      collection: "XM.MessageCollection",
      query: { 
        orderBy: [
	        { attribute: 'id' }
        ]
      },
      components: [
        { kind: "XV.ListItem", components: [
	        { kind: "FittableColumns", components: [
	          { kind: "XV.ListColumn", classes: "short",
 	            components: [
	              { kind: "XV.ListAttr", attr: "sender", isKey: true }
              ]
            },
            { kind: "XV.ListColumn", classes: "short",
              components: [ 
                { kind: "XV.ListAttr", attr: "recipient" }
              ]
            },
            { kind: "XV.ListColumn",
              components: [
                { kind: "XV.ListAttr", attr: "text"}
              ]
            },
            { kind: "XV.ListColumn", classes: "short",
              components: [
                { kind: "XV.ListAttr", attr: "postDate"}
              ]
            }
          ]
          }
        ]}
      ]
    });
  };
}());
