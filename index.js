document.querySelector('.name').addEventListener('focus', deleteNameValue);

function deleteNameValue() {
  document.querySelector('.name').value = '';
}

function getUserName() {
  let userName = document.querySelector('.name').value;
  return userName;
}

function setMaxDate() {
  datePickerId.max = new Date().toISOString().split('T')[0];
}

setMaxDate();

document.querySelector('.input-group').addEventListener('submit', submitForm);

function submitForm(event) {
  event.preventDefault();
  deleteInput();
  let userAge = calculateAge();
  showAge(userAge);
  let daysTillBd = calculateDaysToBirthday();
  showDaysToBirthday(daysTillBd);
}

function calculateAge() {
  let enteredDate = document.querySelector('.dateofbirth').value;
  let enteredDateArray = enteredDate.split('-');

  let userBirthDate = new Date(
    enteredDateArray[0],
    enteredDateArray[1] - 1,
    enteredDateArray[2]
  ).getTime();

  let today = new Date();

  let userFullYears = String(
    Math.floor((today.getTime() - userBirthDate) / 31557600000)
  );
  return userFullYears;
}

function showAge(userAge) {
  let yearAlert = document.querySelector('.yearsAlert');
  let spanYearsAlert = document.createElement('span');
  spanYearsAlert.innerHTML = `${getUserName()}, your age is ${userAge} years!`;
  yearAlert.prepend(spanYearsAlert);
  spanYearsAlert.classList.add('spanYearsAlert');
}

function deleteInput() {
  document.querySelector('.yearsAlert').innerHTML = '';
  document.querySelector('.daysToBirthdayAlert').innerHTML = '';
}

function calculateDaysToBirthday() {
  let today = new Date();
  let enteredDate = document.querySelector('.dateofbirth').value;
  let enteredDateArray = enteredDate.split('-');

  let userNextBirthdayThisYear = new Date(
    today.getFullYear(),
    enteredDateArray[1] - 1,
    enteredDateArray[2]
  );
  let userNextBirthdayNextYear = new Date(
    today.getFullYear() + 1,
    enteredDateArray[1] - 1,
    enteredDateArray[2]
  );
  let diffDays = 0;
  if (enteredDateArray[1] - 1 > today.getMonth()) {
    diffDays = Math.floor(
      (userNextBirthdayThisYear.getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24)
    );
  } else if (
    enteredDateArray[1] - 1 < today.getMonth() ||
    (enteredDateArray[1] - 1 == today.getMonth() &&
      enteredDateArray[2] <= today.getDate())
  ) {
    diffDays = Math.floor(
      (userNextBirthdayNextYear.getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24)
    );
  }
  return diffDays;
}
function showDaysToBirthday(daysTillBd) {
  let daysToBirthdayAlert = document.querySelector('.daysToBirthdayAlert');
  let spanDaysToBirthdayAlert = document.createElement('span');
  spanDaysToBirthdayAlert.innerHTML = `Your next Birthday is in ${
    daysTillBd + 1
  } days.`;
  daysToBirthdayAlert.prepend(spanDaysToBirthdayAlert);
  spanDaysToBirthdayAlert.classList.add('spanDaysToBirthdayAlert');
}
