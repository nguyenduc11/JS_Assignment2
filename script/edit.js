'use strict';
const displayBtn = document.querySelector('#display-btn');
let petArr = [];
let petId;
const idInput = document.querySelector('#input-id');
const nameInput = document.querySelector('#input-name');
const ageInput = document.querySelector('#input-age');
const weightInput = document.querySelector('#input-weight');
const typeInput = document.querySelector('#input-type');
const lengthInput = document.querySelector('#input-length');
const colorInput = document.querySelector('#input-color-1');
const breedInput = document.querySelector('#input-breed');
const vaccinatedInput = document.querySelector('#input-vaccinated');
const dewormedInput = document.querySelector('#input-dewormed');
const sterilizedInput = document.querySelector('#input-sterilized');
petArr = JSON.parse(localStorage.getItem('myPetList'));
console.log(petArr);
// Render Table Data Function
const myTable = document.querySelector('#myTable');
const myTableBody = myTable.querySelector('#myTableBody');
const editForm = document.querySelector('#container-form');
function renderTableData(array) {
  myTableBody.innerHTML = '';
  if (Array.isArray(array) && array.length != 0) {
    for (let i = 0; i < array.length; i++) {
      var newRow = myTableBody.insertRow();
      var cell1 = newRow.insertCell(0);
      cell1.innerHTML = array[i].id;
      var cell2 = newRow.insertCell(1);
      cell2.innerHTML = array[i].name;
      var cell3 = newRow.insertCell(2);
      cell3.innerHTML = array[i].age;
      var cell4 = newRow.insertCell(3);
      cell4.innerHTML = array[i].type;
      var cell4 = newRow.insertCell(4);
      cell4.innerHTML = `${array[i].weight} kg`;
      var cell5 = newRow.insertCell(5);
      cell5.innerHTML = `${array[i].length} cm`;
      var cell6 = newRow.insertCell(6);
      cell6.innerHTML = array[i].breed;
      var cell7 = newRow.insertCell(7);
      cell7.innerHTML = `<i
      class="bi bi-square-fill"
      style="color: ${array[i].color}"></i>`;
      var cell8 = newRow.insertCell(8);
      cell8.innerHTML = array[i].vaccinated;
      if (array[i].vaccinated) {
        cell8.innerHTML = `<i class="bi bi-check-circle-fill"></i>`;
      } else cell8.innerHTML = `<i class="bi bi-x-circle-fill"></i>`;

      var cell9 = newRow.insertCell(9);
      if (array[i].dewormed) {
        cell9.innerHTML = `<i class="bi bi-check-circle-fill"></i>`;
      } else cell9.innerHTML = `<i class="bi bi-x-circle-fill"></i>`;
      var cell10 = newRow.insertCell(10);
      if (array[i].sterilized) {
        cell10.innerHTML = `<i class="bi bi-check-circle-fill"></i>`;
      } else cell10.innerHTML = `<i class="bi bi-x-circle-fill"></i>`;
      var cell11 = newRow.insertCell(11);
      // cell11.innerHTML = `${array[i].date.getDate()}/${array[i].date.getMonth() + 1}/${array[i].date.getFullYear()}`;
      // cell11.innerHTML = 'date';
      cell11.innerHTML = array[i].date;
      var cell12 = newRow.insertCell(12);
      cell12.innerHTML = `<button
      type="button"
      class="btn btn-warning edit"
      >Edit</button>`;
    }
  }
}
// renderTableData(petArr);
displayBtn.addEventListener('click', (e) => {
  e.preventDefault();
  renderTableData(petArr);
});
// Edit Button Function
document.querySelector('#myTableBody').addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.classList.contains('edit')) {
    editForm.classList.toggle('hide');
    let editRow = e.target.closest('tr');
    petId = editRow.cells[0].innerText;
    startEditPet(petId, petArr);
  }
  return petArr;
});

function startEditPet(str, arr) {
  arr.forEach((item) => {
    if (item.id === str) {
      idInput.value = item.id;
      nameInput.value = item.name;
      ageInput.value = item.age;
      typeInput.value = item.type;
      weightInput.value = item.weight;
      lengthInput.value = item.length;
      colorInput.value = item.color;
      breedInput.value = item.breed;
      vaccinatedInput.checked = item.vaccinated;
      dewormedInput.checked = item.dewormed;
      sterilizedInput.checked = item.sterilized;
    }
  });
  return arr;
}

/// Update Data When Click Submit Button
const submitBtn = document.querySelector('#submit-btn');
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let editID = idInput.value;
  updatePetArr(petId, petArr);
  // Update data when User changes
  let newName = nameInput.value;
  nameInput.addEventListener('change', (e) => (newName = e.target.value));
  let newAge = ageInput.value;
  ageInput.addEventListener('change', (e) => (newAge = e.target.value));
  let newType = typeInput.value;
  typeInput.addEventListener('change', (e) => (newType = e.target.value));
  let newWeight = weightInput.value;
  weightInput.addEventListener('change', (e) => (newWeight = e.target.value));
  let newLength = lengthInput.value;
  lengthInput.addEventListener('change', (e) => (newLength = e.target.value));
  let newBreed = breedInput.value;
  breedInput.addEventListener('change', (e) => (newBreed = e.target.value));
  // ===
  // Validate Updated Data Function
  function validateUpdatedData() {
    if (
      nameInputChecked(newName) &&
      ageInputChecked(newAge) &&
      weightInputChecked(newWeight) &&
      lengthInputChecked(newLength) &&
      typeInputChecked(newType) &&
      breedInputChecked(newBreed)
    ) {
      console.log('validation is successful');
      return true;
    } else return false;
  }
  if (validateUpdatedData()) {
    localStorage.removeItem('myPetList');
    localStorage.setItem('myPetList', JSON.stringify(petArr));
    console.table(petArr);
    renderTableData(petArr);
    editForm.classList.toggle('hide');
    alert(`Edit pet ${editID} successfully`);
    return petArr;
  } else return;
});

function updatePetArr(str, arr) {
  arr.forEach((item) => {
    if (item.id === str) {
      item.name = nameInput.value;
      item.age = ageInput.value;
      item.type = typeInput.value;
      item.weight = weightInput.value;
      item.length = lengthInput.value;
      item.color = colorInput.value;
      item.vaccinated = vaccinatedInput.checked;
      item.dewormed = dewormedInput.checked;
      item.sterilized = sterilizedInput.checked;
    }
  });
  console.log(arr);
  return arr;
}

// Render Breed Task
let breedList = JSON.parse(localStorage.getItem('myBreedList'));
// Filter Dog Breed List
let dogBreedList = breedList.filter(function (item) {
  return item.type === 'Dog';
});
// Filter Cat Breed List
let catBreedList = breedList.filter((i) => i.type === 'Cat');
// Set Breed Input to Default Status
function clearBreedInput() {
  breedInput.innerHTML = '';
  const defaultOption = document.createElement('option');
  breedInput.appendChild(defaultOption);
  defaultOption.innerHTML = `<option>Select Breed</option>`;
}
// Render Breed Function
function renderBreed(arr) {
  clearBreedInput();
  arr.forEach((i) => {
    console.log(i.breed);
    const option = document.createElement('option');
    breedInput.appendChild(option);
    option.innerHTML = `<option>${i.breed}</option>`;
  });
}

// Add Change Event To Type Input
typeInput.addEventListener('change', (e) => {
  e.preventDefault();
  if (e.target.value === 'Dog') {
    renderBreed(dogBreedList);
  }
  if (e.target.value === 'Cat') {
    renderBreed(catBreedList);
  }
  if (e.target.value === 'Select Type') {
    clearBreedInput();
  }
  console.log('rendercompleted');
});

// ===
// Check Name Function
function nameInputChecked(obj) {
  if (obj === '') {
    alert('Name must not be empty');
    return false;
  } else return true;
}
// Check Age Function
function ageInputChecked(obj) {
  if (obj < 1 || obj > 15) {
    alert('Age must be between 1 and 15!');
    return false;
  } else return true;
}
// Check Weight Function
function weightInputChecked(obj) {
  if (obj < 1 || obj > 15) {
    alert('Weight must be between 1 and 15!');
    return false;
  } else return true;
}
// Check Length Function
function lengthInputChecked(obj) {
  if (obj < 1 || obj > 100) {
    alert('Length must be between 1 and 100!');
    return false;
  } else return true;
}

// Check Type Function
function typeInputChecked(obj) {
  if (obj === 'Select Type') {
    alert('Please select Type!');
    return false;
  } else return true;
}
// Check Breed Type Function
function breedInputChecked(obj) {
  if (obj === 'Select Breed') {
    alert('Please select Breed!');
    return false;
  } else return true;
}
