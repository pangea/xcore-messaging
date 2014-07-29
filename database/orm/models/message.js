[
  {
    "context": "message",
    "nameSpace": "XM",
    "type": "MessageUser",
    "table": "msguser",
    "comment": "Message User Map",
    "properties": [
      {
        "name": "msgId",
        "attr": {
          "type": "Number",
          "column": "msguser_msg_id"
        }
      },
      {
        "name": "username",
        "attr": {
          "type": "String",
          "column": "msguser_username",
          "isNaturalKey": true
        }
      }
    ]
  },
  {
    "context": "message",
    "nameSpace": "XM",
    "type": "Message",
    "table": "msg",
    "comment": "Message Map",
    "privileges": {
      "all": {
        "create": true,
        "read": false,
        "update": false,
        "delete": false
      },
      "personal": {
        "read": true,
        "properties": ["sender", "recipient"]
      }
    },
    "properties": [
      {
        "name": "id",
        "attr": {
          "type": "Number",
          "column": "msg_id",
          "isPrimaryKey": true
        }
      },
      {
        "name": "sender",
        "attr": {
          "type": "String",
          "column": "msg_username",
          "isNaturalKey": true
        }
      },
      {
        "name": "recipient",
        "toOne": {
          "type": "MessageUser",
          "column": "msg_id",
          "inverse": "msgId",
          "isChild": true
        }
      },
      {
        "name": "postDate",
        "attr": {
          "type": "Date",
          "column": "msg_posted"
        }
      },
      {
        "name": "text",
        "attr": {
          "type": "String",
          "column": "msg_text"
        }
      }
    ],
    "isSystem": true
  }
]
