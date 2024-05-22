let currentExperimentIndex = 0;
let experimentSequence = [];
let gachaResults = [];
let logData = [];
let pullsRemaining = 10;

const experimentParameters = [
  "10S-1.0R",
  "10S-1.5R",
  "10S-2.0R",
  "20S-1.0R",
  "20S-1.5R",
  "20S-2.0R",
  "30S-1.0R",
  "30S-1.5R",
  "30S-2.0R",
];

function startManualExperiment() {
  const sequence = document.getElementById("sequence").value;
  experimentSequence = sequence.split(",").map(Number);
  currentExperimentIndex = 0;
  pullsRemaining = 10;
  localStorage.setItem(
    "experimentSequence",
    JSON.stringify(experimentSequence)
  );
  localStorage.setItem("currentExperimentIndex", currentExperimentIndex);
  localStorage.setItem("pullsRemaining", pullsRemaining);
  location.href = "gacha.html";
}

function startRandomExperiment() {
  experimentSequence = Array.from({ length: 9 }, (_, i) => i).sort(
    () => Math.random() - 0.5
  );
  currentExperimentIndex = 0;
  pullsRemaining = 10;
  localStorage.setItem(
    "experimentSequence",
    JSON.stringify(experimentSequence)
  );
  localStorage.setItem("currentExperimentIndex", currentExperimentIndex);
  localStorage.setItem("pullsRemaining", pullsRemaining);
  localStorage.setItem("logData", JSON.stringify([]));
  location.href = "gacha.html";
}

function loadExperimentData() {
  experimentSequence = JSON.parse(localStorage.getItem("experimentSequence"));
  currentExperimentIndex = parseInt(
    localStorage.getItem("currentExperimentIndex"),
    10
  );
  pullsRemaining = parseInt(localStorage.getItem("pullsRemaining"), 10);
  logData = JSON.parse(localStorage.getItem("logData")) || [];
  updatePullCounter();
}

function pullGacha() {
  loadExperimentData();
  const pullButton = document.getElementById("pullButton");
  pullButton.disabled = true;

  const currentData =
    experimentData[experimentSequence[currentExperimentIndex]];
  const items = generateItems(currentData.S, currentData.R, currentData.C);
  const pulledItems = [];

  for (let i = 0; i < 10; i++) {
    const index = Math.floor(Math.random() * items.length);
    pulledItems.push(items[index]);
    items.splice(index, 1);
  }

  gachaResults.push(pulledItems);
  displayResults(pulledItems);

  pullsRemaining--;
  localStorage.setItem("pullsRemaining", pullsRemaining);
  updatePullCounter();

  if (pullsRemaining === 0) {
    pullButton.textContent = "Wait";
    setTimeout(() => {
      localStorage.setItem("gachaResults", JSON.stringify(gachaResults));
      location.href = "evaluation.html";
    }, 2000);
  } else {
    pullButton.textContent = "Pull";
    pullButton.disabled = false;
  }
}

function displayResults(items) {
  const gachaResultsDiv = document.getElementById("gachaResults");
  gachaResultsDiv.innerHTML = "";
  items.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.textContent = item;
    itemDiv.id = `item${item}`;
    gachaResultsDiv.appendChild(itemDiv);
  });
}

function generateItems(S, R, C) {
  const items = [];
  for (let i = 0; i < S; i++) items.push("S");
  for (let i = 0; i < R; i++) items.push("R");
  for (let i = 0; i < C; i++) items.push("C");
  return items;
}

function submitEvaluation() {
  loadExperimentData();
  const likertScale = document.getElementById("likertScale").value;
  gachaResults = JSON.parse(localStorage.getItem("gachaResults"));

  logData.push({
    experimentIndex: currentExperimentIndex,
    sequence: experimentSequence[currentExperimentIndex],
    parameter: experimentParameters[experimentSequence[currentExperimentIndex]],
    gachaResults: gachaResults,
    evaluation: likertScale,
  });

  localStorage.setItem("logData", JSON.stringify(logData));
  gachaResults = [];
  currentExperimentIndex++;
  localStorage.setItem("currentExperimentIndex", currentExperimentIndex);

  if (currentExperimentIndex < experimentSequence.length) {
    pullsRemaining = 10;
    localStorage.setItem("pullsRemaining", pullsRemaining);
    location.href = "gacha.html";
  } else {
    alert("모든 설문을 완료하였습니다. 감사합니다.");
    location.href = "dashboard.html";
  }
}

function loadDashboard() {
  logData = JSON.parse(localStorage.getItem("logData")) || [];
  const logDiv = document.getElementById("log");
  logDiv.innerHTML = "";

  logData.forEach((log, index) => {
    const logEntry = document.createElement("div");
    logEntry.innerHTML = `<strong>Experiment ${
      index + 1
    }</strong><br>Parameter: ${log.parameter}<br>Evaluation: ${
      log.evaluation
    }<br>`;
    logDiv.appendChild(logEntry);
  });
}

function resetExperiment() {
  localStorage.clear();
  location.href = "index.html";
}

function updatePullCounter() {
  const pullCounter = document.getElementById("pullCounter");
  if (pullCounter) {
    pullCounter.textContent = `Remaining Pulls: ${pullsRemaining}`;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (location.pathname.endsWith("dashboard.html")) {
    loadDashboard();
  }
  if (location.pathname.endsWith("gacha.html")) {
    updatePullCounter();
    const pullButton = document.getElementById("pullButton");
    if (pullsRemaining === 10) {
      pullButton.textContent = "Start";
    }
  }
});
