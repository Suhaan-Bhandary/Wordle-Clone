import data from "../assets/words.json";

const getRandomWord = () => {
  // Getting the data from the words.jason file and randomly selecting a word from it
  let word = data.Words[Math.floor(Math.random() * data.Words.length)];
  return word.toLowerCase();
};

export default getRandomWord;
