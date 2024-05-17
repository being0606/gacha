let pullCount = 0;
const totalIterations = parseInt(localStorage.getItem("Iterations")) || 1;
const results = [];

document.getElementById("gacha-button").addEventListener("click", function () {
  const SCount = parseInt(localStorage.getItem("SCount")) || 5;
  const RSRatio = parseFloat(localStorage.getItem("RSRatio")) || 1;

  if (pullCount < totalIterations) {
    const items1 = pullGacha(SCount, RSRatio);
    const items2 = pullGacha(SCount, RSRatio);
    results.push({ items1, items2 });
    displayResults(items1, "result-container1");
    displayResults(items2, "result-container2");

    pullCount++;

    if (pullCount >= totalIterations) {
      localStorage.setItem("gachaResults", JSON.stringify(results));
      logGachaTime();
      // Redirect to the results dashboard page
      window.location.href = "2.html";
    }
  }
});

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

  items.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className = `gacha-item gacha-${item.toLowerCase()}`;
    itemElement.textContent = item;
    container.appendChild(itemElement);

    // Add animation effect for S rank items
    if (item === "S") {
      itemElement.classList.add("gacha-animation");
    }
  });
}

function logGachaTime() {
  fetch("/gacha", {
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
      fetchLogs();
    });
}

function fetchLogs() {
  fetch("/logs")
    .then((response) => response.json())
    .then((data) => {
      const logsList = document.getElementById("logs-list");
      logsList.innerHTML = "";
      data.forEach((log) => {
        const logItem = document.createElement("li");
        logItem.textContent = `ID: ${log[0]}, Time: ${log[1]}`;
        logsList.appendChild(logItem);
      });
    });
}

// Fetch logs on page load
fetchLogs();
