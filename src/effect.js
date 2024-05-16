document.getElementById("gacha-button").addEventListener("click", function () {
  const items = [];
  for (let i = 0; i < 10; i++) {
    items.push(getGachaItem());
  }
  displayResults(items);
  logGachaTime();
});

function getGachaItem() {
  const randomNumber = Math.random() * 100;
  if (randomNumber < 10) {
    return "A";
  } else if (randomNumber < 30) {
    return "B";
  } else {
    return "C";
  }
}

function displayResults(items) {
  const container = document.getElementById("result-container");
  container.innerHTML = ""; // Clear previous results

  items.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className = "gacha-item";
    itemElement.textContent = item;
    container.appendChild(itemElement);

    // Add animation effect
    itemElement.classList.add("gacha-animation");
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
