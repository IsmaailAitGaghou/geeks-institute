const inputField = document.getElementById("lettersOnly");

inputField.addEventListener("input", function (e) {
  let value = e.target.value;

  let filteredValue = value.replace(/[^A-Za-z]/g, "");

  if (value !== filteredValue) {
    e.target.value = filteredValue;
  }
});
