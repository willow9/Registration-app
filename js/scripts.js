/* eslint-disable arrow-parens */
/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
class Person {
  constructor(name, id, timestamp, servicedDate, specialist) {
    this.name = name;
    this.id = id;
    this.timestamp = timestamp;
    this.servicedDate = servicedDate;
    this.specialist = specialist;
  }
}

function addNewCustomer() {
  if (validate()) {
    const newName = document.getElementById('name').value;
    const newId = generateId();
    const e = document.getElementById('spec');
    const dropdownValue = e.options[e.selectedIndex].value;
    const persons = JSON.parse(localStorage.getItem('persons'));

    const person = new Person(newName, newId, Date.now(), 'not served', dropdownValue);
    persons.push(person);
    localStorage.setItem('persons', JSON.stringify(persons));

    reloadTable();
  }
}

function validate() {
  const newName = document.getElementById('name');
  const e = document.getElementById('spec');
  const dropdownValue = e.options[e.selectedIndex].value;

  if (!newName.validity.valueMissing && dropdownValue != '') {
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

function reloadTable() {
  const newPersons = JSON.parse(localStorage.getItem('persons'));
  newPersons.forEach(element => {
    rowMaker(0, element.name, element.id, element.timestamp, 'table');
  });
}

function loadCustomers() {
  if (localStorage.getItem('persons') == null) {
    const persons = [];

    $.ajax({
      url: 'words.json',
      dataType: 'json',
      type: 'get',
      cache: 'false',
      success: function(data) {
        $(data).each(function(index, value) {
          persons.push(new Person(value.name, value.id, value.timestamp, value.servicedDate, value.specialist));
          persons.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
          rowMaker(0, value.name, value.id, value.timestamp, value.servicedDate, value.specialist, 'table');
        });
        localStorage.setItem('persons', JSON.stringify(persons));
      }
    });
    // const newPersons = JSON.parse(localStorage.getItem("persons"));
    // newPersons.forEach(element => {
    //     rowMaker(0, element.name, element.id);
    // });
  } else {
    const newPersons = JSON.parse(localStorage.getItem('persons'));
    newPersons.forEach(element => {
      console.log(element.specialist);
      rowMaker(0, element.name, element.id, element.timestamp, element.servicedDate, element.specialist, 'table');
    });
  }
  // var a = new Date();
  // c= a.toString().substr(3, 21);
  //  b= a.toISOString();
  // console.log(c);
  // console.log(b);
}

// function liMaker(a) {
//   const ul = document.getElementById("ul");
//   const li = document.createElement("li");
//   li.textContent = a;
//   ul.append(li);
// }

function rowMaker(index, name, id, timestamp, servicedDate, specialist, tableName) {
  date = new Date(timestamp * 1);
  if (servicedDate != 'not served') {
    servicedDate = new Date(servicedDate * 1).toString().substr(3, 18);
  }

  const table = document.getElementById(tableName);
  const row = table.insertRow(index + 1);
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  const cell4 = row.insertCell(3);
  const cell5 = row.insertCell(4);
  cell1.innerHTML = id;
  cell2.innerHTML = name;
  // cell3.innerHTML = date.toISOString().replace("T", " ").substr(0, 16);
  cell3.innerHTML = date.toString().substr(3, 18);
  cell4.innerHTML = servicedDate;
  cell5.innerHTML = specialist;
}
