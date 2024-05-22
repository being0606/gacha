// wait.js
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.getElementById("next-gacha-button").style.display = "block";
  }, 5000);

  document.getElementById("next-gacha-button").addEventListener("click", () => {
    window.location.href = "gacha.html";
  });
});
