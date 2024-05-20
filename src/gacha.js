let pullCount = 0;
const totalIterations = parseInt(localStorage.getItem("Iterations")) || 1;
const results = [];
let shuffledResults = [];
const shuffle = JSON.parse(localStorage.getItem("Shuffle"));

document.getElementById("gacha-button").addEventListener("click", function () {
  const SCount = parseInt(localStorage.getItem("SCount")) || 5;
  const RSRatio = parseFloat(localStorage.getItem("RSRatio")) || 1;

  if (pullCount === 0) {
    pullGachaAndUpdate(SCount, RSRatio);
    document.getElementById("gacha-button").style.display = "none";

    document
      .getElementById("result-container1")
      .addEventListener("click", function () {
        handleResultSelection(1, SCount, RSRatio);
      });

    document
      .getElementById("result-container2")
      .addEventListener("click", function () {
        handleResultSelection(2, SCount, RSRatio);
      });
  }
});

function pullGachaAndUpdate(SCount, RSRatio) {
  const items1 = pullGacha(SCount, RSRatio);
  const items2 = pullGacha(SCount, RSRatio);
  results.push({ items1, items2 });

  displayResults(items1, "result-container1");
  displayResults(items2, "result-container2");

  if (shuffle) {
    shuffleResults();
  } else {
    shuffledResults = results;
  }

  pullCount++;
  updateProgressBar();

  if (pullCount >= totalIterations) {
    localStorage.setItem("gachaResults", JSON.stringify(results));
    localStorage.setItem(
      "selectedGachaResult",
      JSON.stringify(items1.length >= items2.length ? items1 : items2)
    );
    setTimeout(() => {
      window.location.href = "2.html";
    }, 500); // Add a slight delay to ensure the last iteration is visible
  }
}

function getGachaItems(SCount, RSRatio) {
  const totalItems = 50;
  const RCount = Math.round(SCount * RSRatio);
  const CCount = totalItems - SCount - RCount;

  const items = [];
  for (let i = 0; i < SCount; i++) {
    items.push("S");
  }
  for (let i = 0; i < RCount; i++) {
    items.push("R");
  }
  for (let i = 0; i < CCount; i++) {
    items.push("C");
  }

  // Shuffle items
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

function pullGacha(SCount, RSRatio) {
  return getGachaItems(SCount, RSRatio);
}

function displayResults(items, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // Clear previous results

  items.forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.className = `gacha-item gacha-${item.toLowerCase()}`;
    // Determine image path
    const imgNumber = String((index % 3) + 1).padStart(3, "0"); // 001, 002, 003
    const imgPath = `../DATA/rank_${item}/img_${imgNumber}.webp`;

    const imgElement = document.createElement("img");
    imgElement.src = imgPath;
    imgElement.alt = `${item} rank image`;

    itemElement.appendChild(imgElement);
    container.appendChild(itemElement);

    // Add animation effect for S rank items
    if (item === "S") {
      itemElement.classList.add("gacha-animation");
    }
  });
}

function shuffleResults() {
  if (results.length === 0) return;

  const shuffled = [...results].sort(() => 0.5 - Math.random());
  shuffledResults = shuffled.map(({ items1, items2 }) => ({
    items1: shuffleArray(items1),
    items2: shuffleArray(items2),
  }));

  displayResults(shuffledResults[0].items1, "result-container1");
  displayResults(shuffledResults[0].items2, "result-container2");
}

function shuffleArray(array) {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function handleResultSelection(containerNumber, SCount, RSRatio) {
  const selectedContainer = document.getElementById(
    `result-container${containerNumber}`
  );
  const otherContainer = document.getElementById(
    `result-container${containerNumber === 1 ? 2 : 1}`
  );
  const selectedItems =
    containerNumber === 1
      ? shuffledResults[0].items1
      : shuffledResults[0].items2;
  const otherItems =
    containerNumber === 1
      ? shuffledResults[0].items2
      : shuffledResults[0].items1;
  const selectedSCount = selectedItems.filter((item) => item === "S").length;
  const otherSCount = otherItems.filter((item) => item === "S").length;

  if (selectedSCount >= otherSCount) {
    selectedContainer.classList.add("correct");
    otherContainer.classList.remove("incorrect");
  } else {
    selectedContainer.classList.add("incorrect");
    otherContainer.classList.remove("correct");
  }

  logGachaTime(containerNumber, SCount, RSRatio, selectedSCount, otherSCount);
  pullCount++;
  updateProgressBar();

  setTimeout(() => {
    selectedContainer.classList.remove("correct", "incorrect");
    otherContainer.classList.remove("correct", "incorrect");

    if (pullCount >= totalIterations) {
      localStorage.setItem("gachaResults", JSON.stringify(results));
      localStorage.setItem(
        "selectedGachaResult",
        JSON.stringify(selectedItems)
      );
      localStorage.setItem("selectedContainer", containerNumber);
      setTimeout(() => {
        window.location.href = "2.html";
      }, 500); // Add a slight delay to ensure the last iteration is visible
    } else {
      if (shuffle) {
        shuffleResults();
      } else {
        displayResults(results[0].items1, "result-container1");
        displayResults(results[0].items2, "result-container2");
      }
    }
  }, 500); // Ensure the feedback is visible for 0.5 seconds
}

function showFeedback(success) {
  const feedback = document.getElementById("feedback");
  feedback.style.display = "block";
  feedback.textContent = success ? "O" : "X";
  feedback.className = success ? "success" : "error";
  setTimeout(() => {
    feedback.style.display = "none";
  }, 200);
}

function logGachaTime(
  containerNumber,
  SCount,
  RSRatio,
  selectedSCount,
  otherSCount
) {
  const timestamp = new Date().toISOString();
  const logData = {
    container: containerNumber,
    SCount: SCount,
    RSRatio: RSRatio,
    timestamp: timestamp,
    selectedItems:
      containerNumber === 1
        ? shuffledResults[0].items1
        : shuffledResults[0].items2,
    otherItems:
      containerNumber === 1
        ? shuffledResults[0].items2
        : shuffledResults[0].items1,
    selectedSCount: selectedSCount,
    otherSCount: otherSCount,
  };

  // Save logs to local storage
  let logs = JSON.parse(localStorage.getItem("gachaLogs")) || [];
  logs.push(logData);
  localStorage.setItem("gachaLogs", JSON.stringify(logs));
}

function fetchLogs() {
  let logs = JSON.parse(localStorage.getItem("gachaLogs")) || [];
  const logsList = document.getElementById("logs-list");
  logsList.innerHTML = "";
  logs.forEach((log) => {
    const logItem = document.createElement("li");
    logItem.textContent = `Time: ${log.timestamp}, Container: ${
      log.container
    }, SCount: ${log.SCount}, RSRatio: ${
      log.RSRatio
    }, Selected Items: ${log.selectedItems.join(", ")}, Other Items: ${
      log.otherItems ? log.otherItems.join(", ") : "N/A"
    }, Selected S Count: ${log.selectedSCount}, Other S Count: ${
      log.otherSCount
    }`;
    logsList.appendChild(logItem);
  });
}

function updateProgressBar() {
  const progressBar = document.getElementById("progress-bar");
  const progress = (pullCount / totalIterations) * 100;
  progressBar.value = progress;
}

// Fetch logs on page load
fetchLogs();
