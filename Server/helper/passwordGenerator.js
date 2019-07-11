import passwordGenerator from 'generate-password';


const generatePassword = () => passwordGenerator.generate({
  length: 35,
  symbols: true,
  numbers: true,
  uppercase: true
});

export default generatePassword;
