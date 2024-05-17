document
  .getElementById("set-parameters")
  .addEventListener("click", function () {
    const SCount = parseInt(document.getElementById("S-count").value);
    const RSRatio = parseFloat(document.getElementById("R-S-ratio").value);
    const iterations = parseInt(document.getElementById("iterations").value);

    localStorage.setItem("SCount", SCount);
    localStorage.setItem("RSRatio", RSRatio);
    localStorage.setItem("Iterations", iterations);

    alert("Parameters set successfully!");
  });

document.getElementById("gacha-button").addEventListener("click", function () {
  const SCount = parseInt(localStorage.getItem("SCount")) || 5;
  const RSRatio = parseFloat(localStorage.getItem("RSRatio")) || 1;
  const iterations = parseInt(localStorage.getItem("Iterations")) || 1;

  const results = [];
  for (let i = 0; i < iterations; i++) {
    const items1 = pullGacha(SCount, RSRatio);
    const items2 = pullGacha(SCount, RSRatio);
    results.push({ items1, items2 });
    displayResults(items1, "result-container1");
    displayResults(items2, "result-container2");
  }

  displaySummary(results);
  logGachaTime();
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

function displaySummary(results) {
  const tableBody = document
    .getElementById("results-table")
    .getElementsByTagName("tbody")[0];
  tableBody.innerHTML = ""; // Clear previous results

  results.forEach((result, index) => {
    const sCount1 = result.items1.filter((item) => item === "S").length;
    const rCount1 = result.items1.filter((item) => item === "R").length;
    const cCount1 = result.items1.filter((item) => item === "C").length;

    const sCount2 = result.items2.filter((item) => item === "S").length;
    const rCount2 = result.items2.filter((item) => item === "R").length;
    const cCount2 = result.items2.filter((item) => item === "C").length;

    const row1 = tableBody.insertRow();
    row1.insertCell(0).innerText = `Iteration ${index + 1}`;
    row1.insertCell(1).innerText = "Set 1";
    row1.insertCell(2).innerText = sCount1;
    row1.insertCell(3).innerText = rCount1;
    row1.insertCell(4).innerText = cCount1;

    const row2 = tableBody.insertRow();
    row2.insertCell(0).innerText = `Iteration ${index + 1}`;
    row2.insertCell(1).innerText = "Set 2";
    row2.insertCell(2).innerText = sCount2;
    row2.insertCell(3).innerText = rCount2;
    row2.insertCell(4).innerText = cCount2;
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
