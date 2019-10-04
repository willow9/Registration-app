/* eslint-disable indent */
/* eslint-disable arrow-parens */
/* eslint-disable require-jsdoc */
function formValidation() {
  const e = document.getElementById('spec1');
  const dropdownValue = e.options[e.selectedIndex].value;
  const pass = document.getElementById('password').value;

  if (dropdownValue == 'Flying Specialist' && pass == '1') {
    return dropdownValue;
  }
  if (dropdownValue == 'Invisibility Specialist' && pass == '2') {
    return dropdownValue;
  }

  if (dropdownValue == 'Transformation Specialist' && pass == '3') {
    return dropdownValue;
  }
}

function passwordvalidation() {
  if (formValidation()) {
  }
}

function logSpecialist() {
  if (formValidation() != undefined) {
    fillTableForSpecialist();
    document.getElementById('login').disabled = true;
    document.getElementById('myForm2').reset();
    document.getElementById('loginForm').hidden = true;
    document.getElementById('specialistTable').hidden = false;
    document.getElementById('logOut').style.visibility = 'visible';
  }
}

function fillTableForSpecialist() {
  const newPersons = JSON.parse(localStorage.getItem('persons'));
  newPersons.forEach(element => {
    if (element.specialist === formValidation()) {
      formatTableForSpecialist(0, element.name, element.id, element.timestamp, element.servicedDate);
      document.getElementById('title').innerHTML = formValidation();
      console.log('mmmmm' + document.getElementById('title').innerHTML);
    }
  });
}

function addButton(id, servicedDate) {
  var x = document.createElement('BUTTON');
  if (servicedDate === 'not served') {
    var text = document.createTextNode('Serve');
    x.appendChild(text);
    x.id = id;
    x.onclick = function() {
      changeStatus(this.id);
    };
  } else {
    var text = document.createTextNode('Serviced');
    x.appendChild(text);
    x.id = id;
  }
  return x;
}

function formatTableForSpecialist(index, name, id, timestamp, servicedDate) {
  var button = addButton(id, servicedDate);

  date = new Date(timestamp * 1);
  if (servicedDate != 'not served') {
    date2 = new Date(servicedDate * 1).toString().substr(3, 18);
  } else {
    date2 = servicedDate;
  }

  const table = document.getElementById('table2');
  const row = table.insertRow(index + 1);
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  const cell4 = row.insertCell(3);
  row.appendChild(button);
  cell1.innerHTML = id;
  cell2.innerHTML = name;
  cell3.innerHTML = date.toString().substr(3, 18);
  cell4.innerHTML = date2;
}

function changeStatus(id) {
  // const btn = document.getElementById(id);
  // btn.innerHTML = 'Serviced';
  const persons = JSON.parse(localStorage.getItem('persons'));
  persons.forEach(person => {
    if (person.id == id) {
      person.servicedDate = Date.now();
    }
  });
  localStorage.setItem('persons', JSON.stringify(persons));
  // document.getElementById("table2").innerHTML = "";

  var table = document.getElementById('table2');
  //or use :  var table = document.all.tableid;
  for (var i = table.rows.length - 1; i > 0; i--) {
    table.deleteRow(i);
  }

  const newPersons = JSON.parse(localStorage.getItem('persons'));
  newPersons.forEach(element => {
    if (element.specialist === document.getElementById('title').innerHTML) {
      formatTableForSpecialist(0, element.name, element.id, element.timestamp, element.servicedDate);
    }
  });
}
 