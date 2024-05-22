let currentExperimentIndex = 0;
let experimentSequence = [];
let gachaResults = [];
let logData = [];

function startExperiment() {
  const sequence = document.getElementById("sequence").value;
  experimentSequence = sequence.split(",").map(Number);
  currentExperimentIndex = 0;
  localStorage.setItem(
    "experimentSequence",
    JSON.stringify(experimentSequence)
  );
  localStorage.setItem("currentExperimentIndex", currentExperimentIndex);
  location.href = "gacha.html";
}

function loadExperimentData() {
  experimentSequence = JSON.parse(localStorage.getItem("experimentSequence"));
  currentExperimentIndex = parseInt(
    localStorage.getItem("currentExperimentIndex"),
    10
  );
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

  if (gachaResults.length >= 10) {
    setTimeout(() => {
      localStorage.setItem("gachaResults", JSON.stringify(gachaResults));
      location.href = "evaluation.html";
    }, 2000);
  } else {
    pullButton.disabled = false;
  }
}

function displayResults(items) {
  const gachaResultsDiv = document.getElementById("gachaResults");
  gachaResultsDiv.innerHTML = "";
  items.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.textContent = item;
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
    gachaResults: gachaResults,
    evaluation: likertScale,
  });

  gachaResults = [];
  localStorage.setItem("logData", JSON.stringify(logData));
  currentExperimentIndex++;
  localStorage.setItem("currentExperimentIndex", currentExperimentIndex);

  if (currentExperimentIndex < experimentSequence.length) {
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
    }</strong><br>Sequence: ${log.sequence}<br>Evaluation: ${
      log.evaluation
    }<br>`;
    logDiv.appendChild(logEntry);
  });
}

function resetExperiment() {
  localStorage.clear();
  location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", function () {
  if (location.pathname.endsWith("dashboard.html")) {
    loadDashboard();
  }
});
