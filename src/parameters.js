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

    // Redirect to the gacha pull page
    window.location.href = "1.html";
  });
