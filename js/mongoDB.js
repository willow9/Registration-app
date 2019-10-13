const clientPromise = stitch.StitchClientFactory.create('mongocrud-bgxqf');
        let client;
        let db;
        let login;


        function displayCommentsOnLoad() {
            clientPromise.then(stitchClient => {
                client = stitchClient;
                db = client.service('mongodb', 'mongodb-atlas').db('mongoDB');
                login = client.login();
                return login.then(displayComments)
                
            });
        }
        function displayComments() {
            db.collection('todo').find({}).limit(1000).execute().then(docs => {
                var html = docs.map(c => "<div>" + c.comment + "</div>").join("");
                console.log(docs);
                // document.getElementById("comments").innerHTML = html;
            });
        }

        function addComment() {
            var foo = document.getElementById("new_comment");
            db.collection("todo").insertOne({ owner_id: "23", comment: foo.value }).then(displayComments);
            foo.value = "";
        }

        function deleteComment() {
            db.collection("todo").deleteOne({ "comment": "55555" }).then(displayComments);
        }

        function editComment() {
            db.collection("todo").updateOne({comment: '21'}, {$set:{comment:"hey, there"}}, {upsert:true}).then(displayComments);
        }

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