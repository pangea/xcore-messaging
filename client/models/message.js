(function () {
  "use strict";
  
  XT.extensions.message.initMessageModel = function () {
    XM.Message = XM.Document.extend({
      recordType: "XM.Message",
      documentKey: "sender", //the natural key
      idAttribute: "sender" //the natural key
    });
    
    XM.MessageCollection = XM.Collection.extend({
      model: XM.Message
    });
  };
}());
