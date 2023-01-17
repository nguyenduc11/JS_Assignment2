'use strict';
import { saveToStorage, getFromStorage } from './script/storage.js';
// Task 01: Sidebar animation using Toggle Class
const sideBar = document.querySelector('#sidebar');
// console.log(sideBar);
sideBar.addEventListener('click', (e) => {
  // e.preventDefault();
  sideBar.classList.toggle('active');
});
// Task 02: save data to local storage

// Variables Declaration
const submitBtn = document.querySelector('#submit-btn');
const showPetBtn = document.getElementById('healthy-btn');
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
const myTable = document.querySelector('#myTable');
const myTableBody = myTable.querySelector('#myTableBody');
const deleteBtn = document.querySelector('#delete-btn');
const loadBtn = document.querySelector('#load-btn');

let petArr;

// Add Pet Database Function
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  checkNullPetLocalStorage();
  renderTableData(petArr);
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: weightInput.value,
    length: lengthInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    sterilized: sterilizedInput.checked,
    dewormed: dewormedInput.checked,
    date: new Date(),
  };
  // Validate data from input fields
  function validate() {
    if (
      ageInputChecked(data) &&
      weightInputChecked(data) &&
      typeInputChecked(data) &&
      lengthInputChecked(data) &&
      breedInputChecked(data) &&
      allInputFilled() &&
      IdInputChecked(data.id, petArr)
    ) {
      alert('validation is successful');
      return true;
    } else {
      alert('validation failed');
      return false;
    }
  }
  // Add Pets to Databases when validation succeeds
  if (validate()) {
    petArr.push(data);
    clearInput();
    saveToStorage('myPetList', JSON.stringify(petArr));
    renderTableData(petArr);
  }
  console.table(petArr);
  return petArr;
});
// Check Unique Id Function
function IdInputChecked(checkID, arr) {
  let checkResult = true;
  if (arr.length > 0) {
    for (let pet of arr) {
      if (checkID === pet.id) {
        alert('ID must be unique');
        checkResult = false;
        break;
      }
    }
  }
  return checkResult;
}
// Check Age Function
function ageInputChecked(obj) {
  if (obj.age < 1 || obj.age > 15) {
    alert('Age must be between 1 and 15!');
    return false;
  } else return true;
}
// Check Weight Function
function weightInputChecked(obj) {
  if (obj.weight < 1 || obj.weight > 15) {
    alert('Weight must be between 1 and 15!');
    return false;
  } else return true;
}
// Check Length Function
function lengthInputChecked(obj) {
  if (obj.length < 1 || obj.length > 100) {
    alert('Length must be between 1 and 100!');
    return false;
  } else return true;
}

// Check Type Function
function typeInputChecked(obj) {
  if (obj.type === 'Select Type') {
    alert('Please select Type!');
    return false;
  } else return true;
}
// Check Breed Type Function
function breedInputChecked(obj) {
  if (obj.breed === 'Select Breed') {
    alert('Please select Breed!');
    return false;
  } else return true;
}
// Check All Input Filled Function
function allInputFilled() {
  if (
    idInput.value === '' ||
    nameInput.value === '' ||
    ageInput.value === '' ||
    weightInput.value === '' ||
    lengthInput.value === ''
    // typeInput.value === 'Select Type' ||
    // breedInput.value === 'Select Breed'
  ) {
    alert('Please fill all the fields!');
    return false;
  } else return true;
}

// Clear Input Function
function clearInput() {
  idInput.value = '';
  nameInput.value = '';
  ageInput.value = '';
  typeInput.value = 'Select Type';
  weightInput.value = '';
  lengthInput.value = '';
  colorInput.value = '#000000';
  breedInput.value = 'Select Breed';
  vaccinatedInput.checked = false;
  sterilizedInput.checked = false;
  dewormedInput.checked = false;
}

// Render Table Data Function

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
      // cell6.innerHTML = 'breed';
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
      class="btn btn-danger delete"
      >Delete</button>`;
    }
  }
}

// Delete Button Function
document.querySelector('#myTableBody').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    let userAnswer = confirm('Are you sure you want to delete this pet');
    if (userAnswer) {
      let deletedRow = e.target.parentElement.parentElement;
      let deleteIndex = deletedRow.rowIndex - 1;
      petArr.splice(deleteIndex, 1);
      localStorage.removeItem('myPetList');
      localStorage.setItem('myPetList', JSON.stringify(petArr));
      renderTableData(petArr);
      console.table(petArr);
      return petArr;
    }
  }
});

// Retrieve breedList from LocalStorage
let breedList = JSON.parse(getFromStorage('myBreedList'));
// Filter Dog Breed List
let dogBreedList = breedList.filter((i) => i.type === 'Dog');
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
});

// construct a Default Pet Template
const defaultPetArr = [
  {
    id: 'P001',
    name: 'Dober Mix',
    age: 3,
    type: 'Dog',
    weight: '12',
    length: '87',
    color: '#ff8080',
    breed: 'Dobeman Pinscher',
    vaccinated: true,
    sterilized: true,
    dewormed: true,
    date: '2023-01-17T05:06:18.528Z',
  },
  {
    id: 'P002',
    name: 'Charlie Tux',
    age: 4,
    type: 'Cat',
    weight: '4',
    length: '65',
    color: '#80ff80',
    breed: 'Tabby',
    vaccinated: true,
    sterilized: false,
    dewormed: false,
    date: '2023-01-17T05:07:05.970Z',
  },
  {
    id: 'P003',
    name: 'Sweetie Pie',
    age: '3',
    type: 'Dog',
    weight: '6',
    length: '45',
    color: '#ff0000',
    breed: 'Husky',
    vaccinated: false,
    sterilized: true,
    dewormed: false,
    date: '2023-01-17T05:07:51.182Z',
  },
  {
    id: 'P004',
    name: 'Chocolate And Kitten',
    age: '4',
    type: 'Cat',
    weight: '6',
    length: '87',
    color: '#ffff00',
    breed: 'Mixed Breed',
    vaccinated: false,
    sterilized: false,
    dewormed: false,
    date: '2023-01-17T05:08:40.859Z',
  },
  {
    id: 'P005',
    name: 'Symph',
    age: 6,
    type: 'Dog',
    weight: '8',
    length: '77',
    color: '#0080c0',
    breed: 'Dobeman Pinscher',
    vaccinated: true,
    sterilized: true,
    dewormed: true,
    date: '2023-01-17T05:09:29.559Z',
  },
];
console.table(defaultPetArr);
// Check Null Breed on LocalStorage Function
function checkNullPetLocalStorage() {
  if (localStorage.getItem('myPetList') === null) {
    petArr = [];
  } else {
    petArr = JSON.parse(localStorage.getItem('myPetList'));
  }
  return petArr;
}
// Load Pet Template Function
loadBtn.addEventListener('click', (e) => {
  e.preventDefault;
  let userAnswer = confirm('Do you want to LOAD a Pet Template?');
  if (userAnswer) {
    if (localStorage.getItem('myPetList') === null) {
      localStorage.setItem('myPetList', JSON.stringify(defaultPetArr));
      petArr = JSON.parse(getFromStorage('myPetList'));
      renderTableData(petArr);
    } else {
      petArr = JSON.parse(getFromStorage('myPetList'));
      renderTableData(petArr);
    }
  } else return;
  console.table(petArr);
  return petArr;
});
// Delete Current Pet Data on Local Storage Function
deleteBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let userAnswer = confirm(
    'Are you sure you want to delete Current Pet Data on your Local Storage'
  );
  if (userAnswer) {
    localStorage.removeItem('myPetList');
    alert('Pet Data DELETED');
    window.location.reload();
  } else return;
});
