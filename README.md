# Registration to queue
Customers registration to queue and waiting room display

## Description
Application consists of three pages: administrator, specialist and waiting room board. <br/>
**The admin page is for queuing a new client.** The administrator enters the name of the new customer and chooses from the list which specialist he/she wants to access. The customers table is displayed. Table consist of columns with: customer name, registration to queue time, wanted specialist and status (not served or end of service time).<br/>
**To access the specialist page and manage the users assigned to the specialist**, you need to select a specialist and enter passw ord. After that users who belongs to specialist is displayed. Specialist can see all his customes with registration to queue time and status. After specialist ends consultation, he/she clicks the button on current customer row and changes customer status from not served to end of service date and time.<br/>
**On waiting room board page is displayed customers list sorted by specialist and place in queue**.<br/>
## Demo
https://willow9.github.io/willow9/

## Database
This application uses Mongo DB Atlas. Document in mongo db consist of following fields:

```json
    _id:ObjectId("5db84459cf89dc3b60160891")
    id:"132"
    name:"Mr. Burns"
    timestamp:"1572357209128"
    servicedDate:"not served"
    specialist:"Transformation Specialist"
 ```
 1. AJAX is used to retrieve a document from a database.
 *mongoDB.js*:
 ```javascript
    function get() {
      return $.ajax({
        url:
           'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/mongocrud-bgxqf/service/http/incoming_webhook/webhook0',
        dataType: 'json',
        type: 'get'
     });
    }
 ```
 MongoDB service code for retrieving all documents (customers) from database and returning to frontend is:
 ```javascript
   exports = function(payload) {
  const mongodb = context.services.get("mongodb-atlas");
  const mycollection = mongodb.db("mongoDB").collection("todo");
  return mycollection.find({}).toArray();
};
 ```
2. To add new customer in database another webhook is used and declared in AJAX request url field.
*mongoDB.js*:
 ```javascript
   function post(dataToSend) {
  return $.ajax({
    url:
      'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/mongocrud-bgxqf/service/post/incoming_webhook/webhook1',
    dataType: 'json',
    type: 'POST',
    contentType: 'application/json',
    data: dataToSend
  });
}
 ```
MongoDB function for post request:
 ```javascript
  exports = function(payload, response) {
  const mongodb = context.services.get("mongodb-atlas");
  const requestLogs = mongodb.db("mongoDB").collection("todo");
  requestLogs.insertOne({
    id: EJSON.parse(payload.body.text()).id,
    name: EJSON.parse(payload.body.text()).name,
    timestamp: EJSON.parse(payload.body.text()).timestamp,
    servicedDate: EJSON.parse(payload.body.text()).servicedDate,
    specialist: EJSON.parse(payload.body.text()).specialist,})
    .then((result) => {
    response.setStatusCode(201);
    console.log('result.insertedId');
   response.setBody(EJSON.stringify('insertedId ' + result.insertedId));
  });
};
 ```
3. To generate unique and short identification number for new customers we need largest id number increased by one. In order to do so we get array of all ids from database, filter largest one and increase by one. MongoDB service to retrieve ids array:
```javascript
  exports = function() {
  const mongodb = context.services.get("mongodb-atlas");
  const mycollection = mongodb.db("mongoDB").collection("todo");

 return mycollection.find({}).toArray().then((item) => {
    let ids = [];
    item.map((i) => {
    ids.push(i.id);
    });
    return ids;
  });
  
 };
 ```
4. When customer gets service, the status "not served" is changed to the current timestamp. In order to edit database document, MongoDB service is used:
```javascript
  exports = function(payload, response) {
  const mongodb = context.services.get("mongodb-atlas");
  const requestLogs = mongodb.db("mongoDB").collection("todo");
 
  requestLogs.updateOne(
    {id: EJSON.parse(payload.body.text()).id },
    { $set: { servicedDate: EJSON.parse(payload.body.text()).servicedDate }} 
          ).then ((result) =>{
            response.setBody(EJSON.stringify('insertedId ' + result.insertedId));
          });

};
 ```

 
