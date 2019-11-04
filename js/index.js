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
  get().then(data => {
    $(data).each(function(index, value) {
      tableRowMaker(0, value.name, value.id, value.timestamp, value.servicedDate, value.specialist);
    });
  });
}

function addNewCustomer() {
  if (validate()) {
    const newName = document.getElementById('name').value;
    const newId = generateId();
    const specialist = document.getElementById('spec');
    const selectedSpecialist = specialist.options[specialist.selectedIndex].value;
    const person = new Person(newName, newId.toString(), Date.now().toString(), 'not served', selectedSpecialist);
    const dataToSend = JSON.stringify(person);

    // post(dataToSend).then(() => {          //doesn't work
    //   location.reload(true);
    // });

    
    post(dataToSend); 

    setTimeout(() => location.reload(true), 500);
    // setTimeout(location.reload(true), 500); //doesn't work
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
  promise = JSON.parse(getId());
  let intArray = [];
  promise.forEach(item => {
    intArray.push(parseInt(item));
  });
  return Math.max(...intArray) + 1;
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
