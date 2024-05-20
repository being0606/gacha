document
  .getElementById("set-parameters")
  .addEventListener("click", function () {
    const SCount = parseInt(document.getElementById("S-count").value) || 5;
    const RSRatio = parseFloat(document.getElementById("R-S-ratio").value) || 1;
    let iterations = parseInt(document.getElementById("iterations").value) || 1;
    const shuffle = document.getElementById("shuffle").checked;

    if (shuffle) {
      iterations *= 5;
      const additionalIterations = Math.floor(Math.random() * iterations);
      iterations += additionalIterations;
    }

    localStorage.setItem("SCount", SCount);
    localStorage.setItem("RSRatio", RSRatio);
    localStorage.setItem("Iterations", iterations);
    localStorage.setItem("Shuffle", shuffle);

    window.location.href = "1.html";
  });
