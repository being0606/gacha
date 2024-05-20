document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("show-results")
    .addEventListener("click", function () {
      fetchLogs();
      document.getElementById("logs-list").style.display = "block";
      document.getElementById("show-results").style.display = "none";
    });
});

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
