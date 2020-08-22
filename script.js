const characterAmountNumber = document.querySelector("#characterAmountNumber");
const form = document.querySelector("#passwordGeneratorForm");
const includeUppercaseElement = document.querySelector("#includeUppercase");
const includeNumbersElement = document.querySelector("#includeNumbers");
const includeSymbolsElement = document.querySelector("#includeSymbols");
const passwordElement = document.querySelector("#result");

const arrayFromLowToHigh = (low, high) => {
  array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}

const UPPER_CHAR_CODES = arrayFromLowToHigh(65,90);
const LOWER_CHAR_CODES = arrayFromLowToHigh(97,122);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48,57);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33,47).concat(arrayFromLowToHigh(58,64)).concat(arrayFromLowToHigh(91,96)).concat(arrayFromLowToHigh(123,126));

const generatePassword = (characterAmount, includeUppercase, includeNumbers, includeSymbols) => {
  let charCodes = LOWER_CHAR_CODES;
  if (includeUppercase) {
    charCodes = charCodes.concat(UPPER_CHAR_CODES);
  }
  if (includeNumbers) {
    charCodes = charCodes.concat(NUMBER_CHAR_CODES);
  }
  if (includeSymbols) {
    charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
  }

  const passwordCharacters = [];
  for (let i = 0; i < characterAmount; i++) {
    let characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
    passwordCharacters.push(String.fromCharCode(characterCode))
  }
  return passwordCharacters.join('')
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const characterAmount = characterAmountNumber.value;
  const includeUppercase = includeUppercaseElement.checked;
  const includeNumbers = includeNumbersElement.checked;
  const includeSymbols = includeSymbolsElement.checked;
  const password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols)
  passwordElement.innerText = password;
})

// Password copy snackbar
const copyPassword = () => {
  password = passwordElement.innerText;
  if (password.length > 0) {

    let x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

    
    const textarea = document.createElement("textarea");
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    
  }
}

const clipboard = document.querySelector("#clipboard")
clipboard.addEventListener('click', copyPassword)