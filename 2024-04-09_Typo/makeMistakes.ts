import fs from "fs";

const filePath = process.argv[2];

if (!fs.existsSync(filePath)) {
  console.log("File not found");
  process.exit(1);
}

const proximityContent = fs.readFileSync("./keyboard-proximity.txt", "utf-8");
const proximityMap = new Map<string, string>();
for (const line of proximityContent.split("\n")) {
  const [key, values] = line.split(" ");
  proximityMap.set(key, values);
}

function getCloseLetter(letterTyped: string) {
  let isUpperCase = letterTyped === letterTyped.toUpperCase();

  const possibleLetters = proximityMap.get(letterTyped.toLowerCase());

  if (!possibleLetters) {
    throw new Error(`Letter ${letterTyped} not found in proximity map`);
  }

  const randomIndex = Math.floor(Math.random() * possibleLetters.length);
  const closeLetter = possibleLetters[randomIndex];

  return isUpperCase ? closeLetter.toUpperCase() : closeLetter;
}

const content = fs.readFileSync(filePath, "utf-8");

const dictionary = new Set<string>();

const contentWithMistakes = content.replace(/\b[A-Za-z]{3,}\b/g, (word) => {
  dictionary.add(word.toLowerCase());

  if (Math.random() < 0.9 || word.length < 5) {
    return word;
  }

  // We insert a mistake
  const index = Math.floor(Math.random() * word.length);
  const letter = getCloseLetter(word[index]);

  // Changing a letter of the word
  const wordWithMistake = word.slice(0, index) + letter + word.slice(index + 1);

  return wordWithMistake;
});

fs.writeFileSync('./dictionary.txt', Array.from(dictionary).join('\n'));

console.log(contentWithMistakes);
