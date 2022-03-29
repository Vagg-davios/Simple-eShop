'use strict';
var choice;


function buttonStyle(element) {

  // Animation for first container buttons, works only on computer width

  if (element === containerButtons[0]) {
    setTimeout(() => { containerButtons[0].style.display = 'none'; }, 1300);
    setTimeout(() => { firstBox.style.display = 'none'; }, 1300);

    containerButtons[0].style.position = 'absolute';
    containerButtons[0].style.top = '0';
    containerButtons[0].style.left = '0';
    containerButtons[0].style.width = '100%';
    containerButtons[1].style.display = 'none';

    firstBox.style.marginTop = '-5px';
    firstBox.style.backgroundColor = '#fcf951';

    secondBox.style.display = 'none';
    secondBox.style.backgroundColor = '#fcf951';

    firstContainer.style.position = 'relative';
    firstContainer.style.backgroundColor = '#fcf951';
    firstContainer.style.borderStyle = 'solid';
    firstContainer.style.borderWidth = '5px';

    choice = 0;
  }

  if (element === containerButtons[1]) {
    setTimeout(() => { containerButtons[1].style.display = 'none'; }, 1300);
    setTimeout(() => { secondBox.style.display = 'none'; }, 1300);

    containerButtons[1].style.position = 'absolute';
    containerButtons[1].style.top = '0';
    containerButtons[1].style.right = '0';
    containerButtons[1].style.width = '100%';
    containerButtons[0].style.display = 'none';

    secondBox.style.marginTop = '-5px';
    secondBox.style.backgroundColor = '#fcf951';

    firstBox.style.display = 'none';
    firstBox.style.backgroundColor = '#fcf951';

    firstContainer.style.position = 'relative';
    firstContainer.style.backgroundColor = '#fcf951';
    firstContainer.style.borderStyle = 'solid';
    firstContainer.style.borderWidth = '5px';

    choice = 1;
  }

  landingPageElements(choice);

  setTimeout(() => { firstContainer.classList.add('hide'); }, 1500);
  setTimeout(() => { secondContainer.classList.remove('hide'); }, 1500);

}


function buttonChoice(element, array) {

  const index = element.getAttribute('id');
  const selectedClass = element.getAttribute('class');
  const parentElement = element.parentElement.firstElementChild;

  // Selected element's parent (span) gets the name of the element
  switch (selectedClass) {
    case 'chip':
      parentElement.innerHTML = options[choice].chip[index - 1];
      break;
    case 'storage':
      parentElement.innerHTML = options[choice].storage[index - 1];
      break;
    case 'color':
      parentElement.innerHTML = options[choice].color[index - 1];
      changeImage(choice, index);
      break;
  }

  // Color the button that the user presses and de-color(?) the other one
  element.style.borderColor = '#D2232A';

  switch (index) {
    case '1':
      array[1].style.borderColor = '#808080';
      break;
    case '2':
      array[0].style.borderColor = '#808080';
      break;
  }
}


function landingPageElements(choice) {

  // Change the displayed name, image and button text according to user input
  const macbookImgElement = document.getElementById('macbook-image');
  const h1Element = document.querySelector('.second-container h1');

  switch (choice) {

    case 0:
      for (let i = 0; i < chipSelection.length; i++) {
        chipSelection[i].innerHTML = buttonTags[choice].chip[i];
        storageSelection[i].innerHTML = buttonTags[choice].storage[i];
      }
      h1Element.innerHTML = names[choice];
      macbookImgElement.setAttribute('src', './pngs/MacbookPro13Silver.png');
      break;

    case 1:
      for (let i = 0; i < chipSelection.length; i++) {
        chipSelection[i].innerHTML = buttonTags[choice].chip[i];
        storageSelection[i].innerHTML = buttonTags[choice].storage[i];
      }
      h1Element.innerHTML = names[choice];
      macbookImgElement.setAttribute('src', './pngs/MacbookPro16Silver.png');
      break;
  }
}


function changeImage(choice, _index) {

  const macbookImgElement = document.getElementById('macbook-image');

  if (choice == 0 && _index == 1) macbookImgElement.setAttribute('src', './pngs/MacbookPro13Silver.png');
  if (choice == 0 && _index == 2) macbookImgElement.setAttribute('src', './pngs/MacbookPro13SpaceGray.png');

  if (choice == 1 && _index == 1) macbookImgElement.setAttribute('src', './pngs/MacbookPro16Silver.png');
  if (choice == 1 && _index == 2) macbookImgElement.setAttribute('src', './pngs/MacbookPro16SpaceGray.png');
}


function dropdownSpecs(element) {

  const windowWidth = window.matchMedia("(max-width: 600px)");

  let currElement = element.style;
  let indicator = element.firstElementChild;
  let mainText = element.nextElementSibling;
  let timeout = windowWidth.matches ? 0 : 400;
  let heightTransform = windowWidth.matches ? 'translateY(0)' : 'translateY(-310px)';

  switch (indicator.innerText) {

    case '+':
      indicator.innerText = '-';
      currElement.transform = heightTransform;
      setTimeout(() => { mainText.classList.toggle('active'); }, timeout);
      if (windowWidth.matches) secondContainer.style.height = '105rem';
      break;

    case '-':
      indicator.innerText = '+';
      mainText.classList.toggle('active');
      currElement.transform = 'translateY(0)';
      if (windowWidth.matches) secondContainer.style.height = '85rem';
      break;

  }
}


function buyButton() {

  const priceField = document.querySelector('.cost span');

  let totalCost = 0;
  let chipField = chipSelection[0].parentElement.firstElementChild.innerHTML;
  let storageField = storageSelection[0].parentElement.firstElementChild.innerHTML;
  let colorField = colorSelection[0].parentElement.firstElementChild.innerHTML;


  if (chipField === '' && storageField === '' && colorField === '') return alert('Please make your desired selections.');

  if (chipField === '') return alert('Please select a chip.');

  if (storageField === '') return alert('Please select a storage option.');

  if (colorField === '') return alert('Please select a color.');


  if (chipField === options[choice].chip[0]) (totalCost += parseInt(prices[choice].chip[0]));
  if (chipField !== options[choice].chip[0]) (totalCost += parseInt(prices[choice].chip[1]));

  if (storageField === options[choice].storage[0]) (totalCost += parseInt(prices[choice].storage[0]));
  if (storageField !== options[choice].storage[0]) (totalCost += parseInt(prices[choice].storage[1]));


  switch (choice) {
    case 0:
      totalCost += 1100;
      break;
    case 1:
      totalCost += 1800;
      break;
  }

  priceField.innerHTML = totalCost + ' &euro;';

}


const names = ['Macbook Pro 13"', 'Macbook Pro 16"'];

const buttonTags = [
  {
    chip: ['M1', 'i5'],
    storage: ['256GB', '512GB'],
  },
  {
    chip: ['i7', 'i9'],
    storage: ['512GB', '1TB'],
  },
];

const options = [
  {
    chip: ['M1 Chip', '10th gen i5'],
    storage: ['256GB', '512GB'],
    color: ['Silver', 'Space Gray'],
  },
  {
    chip: ['10th gen i7', '10th gen i9'],
    storage: ['512GB', '1TB'],
    color: ['Silver', 'Space Gray'],
  },
];

const prices = [
  {
    chip: ['270', '320'],
    storage: ['255', '310'],
  },
  {
    chip: ['340', '430'],
    storage: ['310', '450'],
  },
];

// Containers
const firstContainer = document.querySelector('.first-container');
const secondContainer = document.querySelector('.second-container');

// First container
const firstBox = document.querySelector('.box-1');
const secondBox = document.querySelector('.box-2');
const containerButtons = document.querySelectorAll('.container-button');

// Second container
const chipSelection = document.querySelectorAll('.chip');
const storageSelection = document.querySelectorAll('.storage');
const colorSelection = document.querySelectorAll('.color');

const specsButton = document.querySelector('.full-specs');
const purchaseButton = document.querySelector('.buy-button');

// ------ First container button events ------
containerButtons.forEach((button) => {
  button.addEventListener('click', () => {
    buttonStyle(button);
  });
});

// ------ Second container button events ------
chipSelection.forEach((button) => {
  button.addEventListener('click', () => {
    buttonChoice(button, chipSelection);
  });
});

storageSelection.forEach((button) => {
  button.addEventListener('click', () => {
    buttonChoice(button, storageSelection);
  });
});

colorSelection.forEach((button) => {
  button.addEventListener('click', () => {
    buttonChoice(button, colorSelection);
  });
});

specsButton.addEventListener('click', () => {
  dropdownSpecs(specsButton);
});

purchaseButton.addEventListener('click', () => {
  buyButton();
});
