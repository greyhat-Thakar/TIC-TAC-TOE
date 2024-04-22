let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let newGameBtn = document.querySelector("#newGame-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");

let turnO = true; /* playerX, playerO*/

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// function to reset game
const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("box was clicked");
    if (turnO) {
      /*if the value of turnO is true*/
      box.innerText = "O";
      turnO = false; /*turnO set false, so that the value does not appear to be true again*/
      // now its playerX's turn
    } else {
      box.innerText = "X";
      turnO = true;
      // now its playerO's turn
    }
    box.disabled = true; /* the box is disabled for any new clicks or values */

    checkWinner(); /* function call for checking the winner when the button(.box) is clicked*/
  });
});

// to disable all the boxes once there is a winner
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// to enable the boxes when RESET-btn is pressed
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations!🎉 Winner is ${winner} 🤖`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

/*function to check for winner*/
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let posit1Value = boxes[pattern[0]].innerText;
    let posit2Value = boxes[pattern[1]].innerText;
    let posit3Value = boxes[pattern[2]].innerText;

    // condition to check that the value on these postion should not be empty
    // inorder to checkWinner
    // the final winning condition
    if (posit1Value != "" && posit2Value != "" && posit3Value != "") {
      if (posit1Value === posit2Value && posit2Value == posit3Value) {
        console.log("winner", posit1Value);
        showWinner(posit1Value); /* calling the showWinner function */
      }
    }
  }
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
