document.addEventListener("DOMContentLoaded", function () {
  const results = JSON.parse(localStorage.getItem("gachaResults")) || [];
  displaySummary(results);

  document
    .getElementById("restart-button")
    .addEventListener("click", function () {
      localStorage.removeItem("gachaResults");
      localStorage.removeItem("SCount");
      localStorage.removeItem("RSRatio");
      localStorage.removeItem("Iterations");
      window.location.href = "index.html";
    });
});

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
