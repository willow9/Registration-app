/* eslint-disable indent */
/* eslint-disable arrow-parens */
/* eslint-disable require-jsdoc */
function dropdownValidation() {
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
  if (dropdownValidation()) {
  }
}

function logSpecialist() {
  dropdownValidation();
  console.log(dropdownValidation());
  if (dropdownValidation() != undefined) {
    console.log(dropdownValidation());
    const newPersons = JSON.parse(localStorage.getItem('persons'));
    newPersons.forEach(element => {
      if (element.specialist === dropdownValidation()) {
        rowMaker(0, element.name, element.id, element.timestamp, element.servicedDat, element.specialist, 'table2');
      }
    });
    document.getElementById('btn').disabled = true;
  }
}
