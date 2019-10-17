function get() {

  return $.ajax({
    url:
      'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/mongocrud-bgxqf/service/http/incoming_webhook/webhook0',
    dataType: 'json',
    type: 'get'
  });
}

function post(dataToSend){

  return $.ajax({
    url:
      'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/mongocrud-bgxqf/service/post/incoming_webhook/webhook1',
    dataType: 'json',
    type: 'POST',
    contentType: 'application/json',
    data: dataToSend
  });
}

// const clientPromise = stitch.StitchClientFactory.create('mongocrud-bgxqf');
//         let client;
//         let db;
//         let login;

//         let testVariable="hilllow";
// function test(){
//     console.log(variableFromIndex)
// }

//         function displayCommentsOnLoad() {
//             clientPromise.then(stitchClient => {
//                 client = stitchClient;
//                 db = client.service('mongodb', 'mongodb-atlas').db('mongoDB');
//                 login = client.login();
//                 // return login.then(displayComments);
//                 login.then(()=>{db.collection('todo').find({}).limit(1000).execute().then(docs => {
//                     // var html = docs.map(c => "<div>" + c.comment + "</div>").join("");
//                     var html = docs.map(c => tableRowMaker(0, c.comment, c.owner_id));
//                     // console.log(docs);
//                     // document.getElementById("comments").innerHTML = html;
//                 });
//             });

//             });
//         }
//         function displayComments() {
//             db.collection('todo').find({}).limit(1000).execute().then(docs => {
//                 var html = docs.map(c => "<div>" + c.comment + "</div>").join("");
//                 console.log(docs);
//                 // document.getElementById("comments").innerHTML = html;
//             });
//         }

//         function addComment() {
//             var foo = document.getElementById("new_comment");
//             db.collection("todo").insertOne({ owner_id: "23", comment: foo.value }).then(displayComments);
//             foo.value = "";
//         }

//         function deleteComment() {
//             db.collection("todo").deleteOne({ "comment": "55555" }).then(displayComments);
//         }

//         function editComment() {
//             db.collection("todo").updateOne({comment: '21'}, {$set:{comment:"hey, there"}}, {upsert:true}).then(displayComments);
//         }

// export function displayCommentsOnLoad(){
//     return "technology";
// }
//         $.getScript('./js/index.js', function()
// {
//     // your-script.js is now loaded and you can use any function from it.
//     console.log("tets");
// });

// ###########################

// import { Stitch, RemoteMongoClient, AnonymousCredential } from 'mongodb-stitch-browser-sdk';

// const client = Stitch.initializeDefaultAppClient('mongocrud-bgxqf');

// const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('mongoDB');

// client.auth.loginWithCredential(new AnonymousCredential()).then(user =>
// db.collection('todo').updateOne({owner_id: client.auth.user.id}, {$set:{number:42}}, {upsert:true})
// ).then(() =>
// db.collection('todo').find({owner_id: client.auth.user.id}, { limit: 100}).asArray()
// ).then(docs => {
//   console.log("Found docs", docs)
//   console.log("[MongoDB Stitch] Connected to Stitch")
// }).catch(err => {
//   console.error(err)
// });
