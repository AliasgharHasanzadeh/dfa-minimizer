let arrState = ['q0', 'q1','q2'];
let arrAlphabet = ["a", "b"];
let startState = "";
let selectedStates;
let arrTrans = [
  "&(q0,a)=q1",
    "&(q0,b)=q2",
    "&(q1,a)=q1",
    "&(q1,b)=q0",
    "&(q2,a)=q1",
    "&(q2,b)=q2"
];
//! transition part
const btnAddTrans = document.getElementById("btn-add-trans");
const tasks = document.getElementById("trans");
const inp = document.getElementById("inpTrans");

const tick = ` 
<div class='flex gap-2'>
  <svg onclick="delTrans(this)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 cursor-pointer hover:text-red-500">
    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
  <svg onclick="editTrans(this)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
  </svg>
</div>`;

function loadTransitions() {
  arrTrans.forEach((item) => {
    const newli = document.createElement("li");
    newli.innerHTML = `<input type='text' class='hidden outline-none border-none w-auto'/><span class="task-text select-none">${item}</span>${tick}`;
    tasks.appendChild(newli);
  });
}
loadTransitions();

function delTrans(e) {
  const item = e.closest("li");
  const task = item.querySelector(".task-text");
  item.classList.add("fall");
  let index = arrTrans.indexOf(task.innerText);
  arrTrans.splice(index, 1);
  console.log("Transition Deleted : " + arrTrans);
  setTimeout(() => {
    item.remove();
  }, 400);
  inp.focus();
}

function editTrans(e) {
  const item = e.closest("li");
  const task = item.querySelector(".task-text");
  const input = item.querySelector("input");
  if (input.style.display !== "inline") {
    task.style.display = "none";
    input.style.display = "inline";
    input.classList.add("animate-pulse");
    item.style.backgroundColor = "#212529";
    e.classList.add("animate-pulse");
    e.style.stroke = "red";
    e.style.fill = "#212529";
    input.focus();
    input.value = task.textContent;
  } else {
    if (input.value !== "") {
      let index = arrTrans.indexOf(task.innerText);
      arrTrans.splice(index, 1, input.value);
      console.log("Transition Edited : " + arrTrans);
      task.textContent = input.value;
      e.classList.remove("animate-pulse");
      e.style.stroke = "white";
      e.style.fill = "#343a40";
    }
    task.style.display = "inline";
    input.style.display = "none";
    item.style.backgroundColor = "#343a40";
  }
}

function addtask() {
  const text = inp.value;
  arrTrans.push(text);
  console.log("Transition Added : " + arrTrans);
  const newli = document.createElement("li");
  newli.innerHTML = ` <input type='text' class='hidden outline-none border-none w-auto'/> <span class="task-text select-none">${text}</span>${tick}`;
  tasks.appendChild(newli);
  inp.value = "";
  inp.focus();
}
btnAddTrans.addEventListener("click", addtask);

//! alphabet part
const btnAddAlphabet = document.getElementById("btn-add-alphabet");
const alphabet = document.getElementById("alphabets");
const inpAlphabet = document.getElementById("inpAlphabets");
const tickAlphabet = ` 
<div class='flex gap-2'>
  <svg onclick="delAlphabet(this)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 cursor-pointer hover:text-red-500">
    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
  <svg onclick="editAlphabet(this)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
  </svg>
</div>`;
function loadAlphabet() {
  arrAlphabet.forEach((item) => {
    const newli = document.createElement("li");
    newli.innerHTML = `<input type='text' class='hidden outline-none border-none w-auto'/><span class="task-text select-none">${item}</span>${tick}`;
    alphabet.appendChild(newli);
  });
}
loadAlphabet();

function delAlphabet(e) {
  const item = e.closest("li");
  const task = item.querySelector(".task-text");
  item.classList.add("fall");
  let index = arrAlphabet.indexOf(task.innerText);
  arrAlphabet.splice(index, 1);
  console.log("Alphabet Deleted : " + arrAlphabet);
  setTimeout(() => {
    item.remove();
  }, 400);
  inpAlphabet.focus();
}

function editAlphabet(e) {
  const item = e.closest("li");
  const task = item.querySelector(".task-text");
  const input = item.querySelector("input");
  if (input.style.display !== "inline") {
    task.style.display = "none";
    input.style.display = "inline";
    input.classList.add("animate-pulse");
    item.style.backgroundColor = "#212529";
    e.classList.add("animate-pulse");
    e.style.stroke = "red";
    e.style.fill = "#212529";
    input.focus();
    input.value = task.textContent;
  } else {
    if (input.value !== "") {
      let index = arrAlphabet.indexOf(task.innerText);
      arrAlphabet.splice(index, 1, input.value);
      console.log("Alphabet Edited : " + arrAlphabet);
      task.textContent = input.value;
      e.classList.remove("animate-pulse");
      e.style.stroke = "white";
      e.style.fill = "#343a40";
    }
    task.style.display = "inline";
    input.style.display = "none";
    item.style.backgroundColor = "#343a40";
  }
}

function addAlphabet() {
  const text = inpAlphabet.value;
  arrAlphabet.push(text);
  console.log("Alphabet Added : " + arrAlphabet);
  const newli = document.createElement("li");
  newli.innerHTML = ` <input type='text' class='hidden outline-none border-none w-auto'/> <span class="task-text select-none">${text}</span>${tickAlphabet}`;
  alphabet.appendChild(newli);
  inpAlphabet.value = "";
  inpAlphabet.focus();
}
btnAddAlphabet.addEventListener("click", addAlphabet);

//! state part
const btnAddState = document.getElementById("btn-add-state");
const state = document.getElementById("states");
const inpState = document.getElementById("inpStates");
const tickState = ` 
<div class='flex gap-2'>
  <svg onclick="delState(this)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 cursor-pointer hover:text-red-500">
    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
  <svg onclick="editState(this)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
  </svg>
</div>`;
function loadState() {
  arrState.forEach((item) => {
    const newli = document.createElement("li");
    newli.innerHTML = `<input type='text' class='hidden outline-none border-none w-auto'/><span class="task-text select-none">${item}</span>${tick}`;
    state.appendChild(newli);
  });
  addOptions();
}

function delState(e) {
  const item = e.closest("li");
  const task = item.querySelector(".task-text");
  item.classList.add("fall");
  let index = arrState.indexOf(task.innerText);
  arrState.splice(index, 1);
  console.log("State Deleted : " + arrState);
  addOptions();
  setTimeout(() => {
    item.remove();
  }, 400);
  inpState.focus();
}

function editState(e) {
  const item = e.closest("li");
  const task = item.querySelector(".task-text");
  const input = item.querySelector("input");
  if (input.style.display !== "inline") {
    task.style.display = "none";
    input.style.display = "inline";
    input.classList.add("animate-pulse");
    item.style.backgroundColor = "#212529";
    e.classList.add("animate-pulse");
    e.style.stroke = "red";
    e.style.fill = "#212529";
    input.focus();
    input.value = task.textContent;
  } else {
    if (input.value !== "") {
      let index = arrState.indexOf(task.innerText);
      arrState.splice(index, 1, input.value);
      console.log("State Edited : " + arrState);
      addOptions();
      task.textContent = input.value;
      e.classList.remove("animate-pulse");
      e.style.stroke = "white";
      e.style.fill = "#343a40";
    }
    task.style.display = "inline";
    input.style.display = "none";
    item.style.backgroundColor = "#343a40";
  }
}

function addState() {
  const text = inpState.value;
  arrState.push(text);
  console.log("State Added : " + arrState);
  const newli = document.createElement("li");
  newli.innerHTML = ` <input type='text' class='hidden outline-none border-none w-auto'/> <span class="task-text select-none">${text}</span>${tickState}`;
  state.appendChild(newli);
  inpState.value = "";
  inpState.focus();
  addOptions();
}
btnAddState.addEventListener("click", addState);
// ! add options to selects
const select = document.getElementById("startState");
const finalStateSelectEl = document.getElementById("finalStates");
function addOptions() {
  select.innerHTML = ` <option value="" disabled selected class="text-[#868e96]">
            select the state
          </option>`;
  finalStateSelectEl.innerHTML = "";
  arrState.forEach((item) => {
    const newOp = document.createElement("option");
    newOp.innerText = item;
    newOp.setAttribute("value", item);
    select.appendChild(newOp);

    // ADD TO FINAL STATES
    const finalOp = document.createElement("option");
    finalOp.innerText = item;
    finalOp.setAttribute("value", item);
    finalStateSelectEl.appendChild(finalOp);
  });
}
select.addEventListener("change", function (event) {
  const newStartState = event.target.value;
  startState = newStartState;
  console.log("Start state set to : ", startState);
});
// ! choose final State
finalStateSelectEl.addEventListener("change", function () {
  selectedStates = Array.from(finalStateSelectEl.selectedOptions).map(
    (opt) => opt.value
  );
  console.log("Final States : " + selectedStates);
});
loadState();
// ! create DFA
const btnCalc = document.getElementById("btn-calc");
btnCalc.addEventListener("click", function () {
  const dfa = {
    alphabet: [...arrAlphabet],
    states: [...arrState],
    startState: startState,
    finalStates: [...selectedStates],
    transitions: parseTransitions(arrTrans),
  };
  console.log(dfa);
  minimizeDFA(dfa);
  // 
  renderDFA(dfa, "inputDFA"); // inputDFA آبجکت DFA ورودی
  renderDFA(minimizeDFA(dfa), "outputDFA"); // outputDFA آبجکت DFA مینیمایز شده
});

// ! show the graph
