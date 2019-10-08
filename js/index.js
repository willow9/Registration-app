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
          tableRowMaker(0, value.name, value.id, value.timestamp, value.servicedDate, value.specialist);
        });
        localStorage.setItem('persons', JSON.stringify(persons));
      }
    });
  } else {
    const newPersons = JSON.parse(localStorage.getItem('persons'));
    newPersons.forEach(element => {
      tableRowMaker(0, element.name, element.id, element.timestamp, element.servicedDate, element.specialist);
    });
  }
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
