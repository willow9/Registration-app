// var express = require('express');
const clientPromise = stitch.StitchClientFactory.create('mongocrud-bgxqf');
let client;
let db;
let login;

function displayCommentsOnLoad() {
  clientPromise.then(stitchClient => {
    client = stitchClient;
    db = client.service('mongodb', 'mongodb-atlas').db('mongoDB');
    login = client.login();
    // return login.then(displayComments);
    login.then(() => {
      db.collection('todo')
        .find({})
        .limit(100)
        .execute()
        .then(docs => {
          // var html = docs.map(c => "<div>" + c.comment + "</div>").join("");
          docs.map(c => tableRowMaker(0, c.name, c.id, c.timestamp, c.servicedDate, c.specialist));
          // console.log(docs);
          // document.getElementById("comments").innerHTML = html;
        });
    });
  });
}
// function displayComments() {
//   db.collection('todo')
//     .find({})
//     .limit(1000)
//     .execute()
//     .then(docs => {
//       var html = docs.map(c => '<div>' + c.comment + '</div>').join('');
//       console.log(docs);
//       // document.getElementById("comments").innerHTML = html;
//     });
// }

function addComment() {
  const obj = addNewCustomer2();
  // clientPromise.then(stitchClient => {
  //   client = stitchClient;
  db = client.service('mongodb', 'mongodb-atlas').db('mongoDB');
  login = client.login();
  login.then(() => db.collection('todo').insertOne(obj));
  // .then(displayComments);
  // foo.value = "";
  // });
}

function deleteComment() {
  db.collection('todo')
    .deleteOne({ comment: '55555' })
    .then(displayComments);
}

function editComment() {
  db.collection('todo')
    .updateOne({ comment: '21' }, { $set: { comment: 'hey, there' } }, { upsert: true })
    .then(displayComments);
}
class Person {
  constructor(name, id, timestamp, servicedDate, specialist) {
    this.name = name;
    this.id = id;
    this.timestamp = timestamp;
    this.servicedDate = servicedDate;
    this.specialist = specialist;
  }
}

function loadCustomers() {
  // if (localStorage.getItem('persons') == null) {
  //   const persons = [];

  $.ajax({
    url:
      'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/mongocrud-bgxqf/service/http/incoming_webhook/webhook0',
    dataType: 'json',
    type: 'get',
    cache: false,
    success: function(data) {
      $(data).each(function(index, value) {
        // persons.push(new Person(value.name, value.id, value.timestamp, value.servicedDate, value.specialist));
        // persons.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
        tableRowMaker(0, value.name, value.id, value.timestamp, value.servicedDate, value.specialist);
      });
      // localStorage.setItem('persons', JSON.stringify(persons));
    }
  });
  // } else {
  //   const newPersons = JSON.parse(localStorage.getItem('persons'));
  //   newPersons.forEach(element => {
  //     tableRowMaker(0, element.name, element.id, element.timestamp, element.servicedDate, element.specialist);
  //   });
  // }
}
let valueFromDbArray;

function getId() {

  return  $.ajax({
    url:
      'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/mongocrud-bgxqf/service/http/incoming_webhook/webhook0',
    dataType: 'json',
    type: 'GET',
    global: false,
    async: false,
    success: function(data) {
      let valueFromDb=[];
      $(data).each(function(index, value) {
        valueFromDb.push(value.id);
      });
      valueFromDbArray = Math.max(...valueFromDb) + 1;
    }
  })
  
}

function post() {

  return  $.ajax({
    url:
      'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/mongocrud-bgxqf/service/http/incoming_webhook/webhook0',
    dataType: 'json',
    type: 'POST',
    data: {id: "jkhfkjhs", name: "name"},
    success: 'success'
  })
  
}
  
  function getJson(){
    return JSON.parse($.ajax({
        type: 'GET',
        url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/mongocrud-bgxqf/service/http/incoming_webhook/webhook0',
        dataType: 'json',
        global: false,
        async: false,
        success: function (data) {
            return data[0];
        }
    }).responseText);
}


var myJsonObj = getJson();
var myId = JSON.parse(getId().responseText);

function test(){
  // console.log(myJsonObj[0].id);
  // console.log(myId);
  console.log(valueFromDbArray)
}

function addNewCustomer() {
  if (validate()) {
    const newName = document.getElementById('name').value;
    const newId = generateId();
    const specialist = document.getElementById('spec');
    const selectedSpecialist = specialist.options[specialist.selectedIndex].value;

    const persons = JSON.parse(localStorage.getItem('persons'));

    const person = new Person(newName, newId, Date.now(), 'not served', selectedSpecialist);
    persons.push(person);
    localStorage.setItem('persons', JSON.stringify(persons));

    reloadTable();
  }
}

function addNewCustomer2() {
  const newName = document.getElementById('name').value;
  generateId2();
  const newId = JSON.parse(localStorage.getItem('ids'));
  const specialist = document.getElementById('spec');
  const selectedSpecialist = specialist.options[specialist.selectedIndex].value;

  const person = new Person(newName, newId, Date.now(), 'not served', selectedSpecialist);
  return person;
}

function validate() {
  const newName = document.getElementById('name');
  const specialist = document.getElementById('spec');
  const selectedSpecialist = specialist.options[specialist.selectedIndex].value;

  if (!newName.validity.valueMissing && selectedSpecialist != '') {
    return true;
  } else return false;
}

function generateId() {
  const persons = JSON.parse(localStorage.getItem('persons'));
  const ids = [];
  persons.forEach(element => {
    ids.push(element.id);
  });
  return Math.max(...ids) + 1;
}

function generateId2() {
  db.collection('todo')
    .find({})
    .sort({ id: -1 })
    .limit(1)
    .execute()
    .then(docs => {
      docs.map(c => {
        var html = parseInt(c.timestamp) + 1;
        // document.getElementById("comments").innerHTML = html;
        console.log(html);
        localStorage.setItem('ids', JSON.stringify(html));
      });
    });

  // return "221212"
}

function createNewId(x) {
  let array = [];
  array.push(x);
  console.log(array);
}

function reloadTable() {
  const newPersons = JSON.parse(localStorage.getItem('persons'));
  newPersons.forEach(element => {
    tableRowMaker(0, element.name, element.id, element.timestamp, element.servicedDate, element.specialist);
  });
}

function tableRowMaker(index, name, id, timestamp, servicedDate, specialist) {
  date = new Date(timestamp * 1).toString().substr(3, 18);

  const table = document.getElementById('table');
  const row = table.insertRow(index + 1);
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  const cell4 = row.insertCell(3);
  const cell5 = row.insertCell(4);
  cell1.innerHTML = id;
  cell2.innerHTML = name;
  cell3.innerHTML = date;
  cell4.innerHTML = formatDateOfService(servicedDate);
  cell5.innerHTML = specialist;
}

function formatDateOfService(servicedDate) {
  if (servicedDate != 'not served') {
    return (formatedDate = new Date(servicedDate * 1).toString().substr(3, 18));
  } else return servicedDate;
}
