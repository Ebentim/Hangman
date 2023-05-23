const word = [
  "TIGER", "GORILLA", "MONKEY", "PANTHER", "ELEPHANT", "CROCODILE",
  "EAGLE", "OWL", "PENGUIN", "PEACOCK", "FLAMINGO", "TOUCAN",
  "DOLPHIN", "SHARK", "OCTOPUS", "JELLYFISH", "SEAHORSE", "LOBSTER",
  "DOG", "CAT", "HORSE", "COW", "SHEEP", "CHICKEN", 
  "SNAKE", "LIZARD", "TURTLE", "CHAMELEON", "ALLIGATOR", "COMODO"
]
// variable declaration and initialization

let marquee = document.getElementById("marquee");
let hint =  document.getElementById("hint")
let userEntry = document.getElementById("userInput");
userEntry.focus()

// hangman details
let hangmanPole = document.getElementById("hanger");
let head = document.getElementById("head");
let body = document.getElementById("body");
let rightHand = document.getElementById("rightHand");
let leftHand = document.getElementById("leftHand");
let RightLeg = document.getElementById("rightLeg");
let LeftLeg = document.getElementById("leftLeg")

let selectedWords = []
// function loops through word and select them one by one
function select(){
  let validInput; 
  do{
    validInput = Math.floor(Math.random() * word.length);
  } while(selectedWords.includes(validInput));

  // Push the selected word into the selectedWords array
  selectedWords.push(validInput)

  choiceWord = word[validInput];
  if(validInput < 6){
    hint.textContent = "Jungle Animal: This animal has back fur with a white belly and is known for its incredible strength";
    console.log(choiceWord)
  } else if(validInput == 6 || validInput <=11){
    hint.textContent = "Bird: This bird has a colorful plumage and can make a loud and distinctive call";
    console.log(choiceWord)
  } else if (validInput == 12 || validInput <= 17){
    hint.textContent = "Sea Creature: This creature is known for its intelligence and is able to communicate with others of its kind through a series of clicks and whistles";
    console.log(choiceWord)
  } else if (validInput==18 || validInput <=23){
    hint.textContent = "Domestic Animal: This animal is often kept as a  pet and is known for its loyalty and friendly nature";
    console.log(choiceWord)
  } else if(validInput>23){
    hint.textContent = `Reptile: This animal is known for its ability to slither and move silently`;
    console.log(choiceWord)
  }
  return choiceWord 
}
select()

let score = 0
let level = 1

let levels = document.getElementById("level");
let scores = document.getElementById("score");
levels.textContent = `Level: ${level}`

const information = document.getElementById("information");
const completed = document.getElementById("completed");

let proceed = document.getElementById("proceed")
function scoreLevelIncreament(){
  score+= 20;
  level += 1;
  if(score <= 80 && level <= 5){
    scores.textContent = `Score: ${score}`;
    levels.textContent = `Level: ${level}`;
  userEntry.value = ""
  } else if (score = 100 && level == 6){
    score-= 1;
    userEntry.value = ""
    completed.style.display = "block"
    completed.textContent = `Congratulations!!! You completed Level 1`;
    score = 100;
    hint.textContent = "Click next to proceed to the next stage"
    scores.textContent = `Score: ${score}`;
    marquee.textContent = "Hangman Level One Completed!";
    information.style.display = "none"
    proceed.style.display = "block"
    submitButton.style.display = "none"
    userEntry.disabled = true
  //   proceed.addEventListener("click", ()=>{
  //     location.replace("html/stagetwo.html")
  //   })
  }
}

const correctWord = document.getElementById("correctWord");

let wrongChoice = 0
let correctWordInterval

function displayPart(){
  switch(wrongChoice){
    case 1:
      hangmanPole.style.display = "none"
      head.style.display = "block"
      break;
    case 2:
      head.style.display = "none"
      body.style.display = "block"
      break;
    case 3:
      body.style.display = "none"
      rightHand.style.display = "block"
      break;
    case 4:
      rightHand.style.display = "none"
      leftHand.style.display = "block"
      break;
    case 5:
      leftHand.style.display = "none"
      RightLeg.style.display = "block"
      break;
    case 6:
      RightLeg.style.display = "none"
      LeftLeg.style.display = "block"
      hint.textContent = "GAME OVER"
      userEntry.disabled = true
      submitButton.removeEventListener("click", checks);
      submitButton.textContent = "Please try Again"
      correctWord.style.display = "block";
      correctWord.textContent = `You can do better, the correct word is ${choiceWord}`;
      submitButton.removeEventListener("click", checks)
      submitButton.addEventListener("click", ()=>{
      location.reload()
      })
      break
  }
}

// function that checks if the input is correct

const checks = () =>{
  if(userEntry.value.trim() === ""){
    correctWord.style.display = "block"
    correctWord.textContent = "The Input Section cannot be empty"
    setInterval(()=>{
      correctWord.style.display = "none"
    }, 3000)
  } else if(userEntry.value.toLowerCase() == choiceWord.toLowerCase()){
    scoreLevelIncreament()
    select()
  }else{
    userEntry.value = ""
    wrongChoice++;
    displayPart()
  }
  userEntry.focus()
}

let submitButton = document.getElementById("submit");
submitButton.addEventListener("click", checks);
