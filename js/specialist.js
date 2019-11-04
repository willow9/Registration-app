function formValidation() {
  const specialist = document.getElementById('spec1');
  const dropdownValue = specialist.options[specialist.selectedIndex].value;
  const pass = document.getElementById('password').value;

  if (dropdownValue == 'Flying Specialist' && pass == '1') {
    return dropdownValue;
  }

  if (dropdownValue == 'Invisibility Specialist' && pass == '2') {
    return dropdownValue;
  }

  if (dropdownValue == 'Transformation Specialist' && pass == '3') {
    return dropdownValue;
  } else document.getElementById('alert').style.display = 'block';
}

function logSpecialist() {
  if (formValidation() != undefined) {
    fillTableForSpecialist();
    document.getElementById('login').disabled = true;
    document.getElementById('specialistForm').reset();
    document.getElementById('loginForm').hidden = true;
    document.getElementById('specialistTable').hidden = false;
    document.getElementById('logOut').style.visibility = 'visible';
    document.getElementsByClassName('sticky')[0].hidden = true;
  }
}

function fillTableForSpecialist() {
  let spec = formValidation();
  get().then(data => {
    $(data).each(function(index, value) {
      if (value.specialist === spec) {
        formatTableForSpecialist(0, value.name, value.id, value.timestamp, value.servicedDate);
        document.getElementById('title').innerHTML = value.specialist;
      }
    });
  });
}

function addButton(id, servicedDate) {
  let button = document.createElement('BUTTON');
  if (servicedDate === 'not served') {
    let text = document.createTextNode('Serve');
    button.appendChild(text);
    button.id = id;
    button.onclick = function() {
      changeStatus(this.id);
    };
  } else {
    let text = document.createTextNode('Served');
    button.appendChild(text);
    button.id = id;
    button.className = 'disabled';
  }
  return button;
}

function formatTableForSpecialist(index, name, id, timestamp, servicedDate) {
  var button = addButton(id, servicedDate);

  registrationDate = new Date(timestamp * 1);
  if (servicedDate != 'not served') {
    serviceDate = new Date(servicedDate * 1).toString().substr(3, 18);
  } else {
    serviceDate = servicedDate;
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
  cell3.innerHTML = registrationDate.toString().substr(3, 18);
  cell4.innerHTML = serviceDate;
}
function changeStatus(id) {
  let dataToSend = JSON.stringify({ id: id, servicedDate: Date.now().toString() });
  put(dataToSend).then(() => {
    reloadTable2();
  });
}

function reloadTable2() {
  var table = document.getElementById('table2');
  const specialist = document.getElementById('title').innerHTML;

  for (var i = table.rows.length - 1; i > 0; i--) {
    table.deleteRow(i);
  }

  get().then(data => {
    $(data).each(function(index, value) {
      if (value.specialist === specialist) {
        formatTableForSpecialist(0, value.name, value.id, value.timestamp, value.servicedDate);
      }
    });
  });
}
