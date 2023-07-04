const juzSelect = document.querySelectorAll(".juz");
//listener for juz selection
juzSelect.forEach(btn => btn.addEventListener("click", display))

//listener for highligting
document.addEventListener('mouseup', highlightPhrase);