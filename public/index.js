window.addEventListener('load', () => {

  // References
  const screen = document.getElementById('display');
  const addRef = document.querySelectorAll('.add');
  const inputRef = document.querySelector('input');

  // Event listeners
  screen.addEventListener('click', () => {

    inputRef.value = screen.innerText;
    // console.log(inputRef.value);

    inputRef.style.display = 'unset';
    inputRef.style.visibility = 'visible';

    inputRef.select();
    inputRef.setSelectionRange(0, 99999);
    document.execCommand("copy");

    inputRef.style.display = 'none';
    inputRef.style.visibility = 'hidden';
    swal("Success", "Result copied to clipboard", "success");

  });

  document.getElementById('clear').addEventListener('click', () => {
    screen.innerText = "0";
  });

  document.getElementById('backspace').addEventListener('click', () => {

    if (screen.innerText.length == 1 || screen.innerText === "Error!") {
      screen.innerText = "0";
      return;
    }

    screen.innerText = screen.innerText.slice(0, screen.innerText.length - 1);

  });

  document.getElementById('equal').addEventListener('click', () => {

    let result = null;

    try {

      result = eval(screen.innerText);
      if(String(result).search(/\./g) !== -1)
        result = parseFloat(result).toFixed(2);

      if (result.length > 10)
        throw new Error("Out of display bounds!");

    }
    catch (err) {
      swal("Error", err.message, "error");
      result = "Error!";
    }

    screen.innerText = result;

  });

  addRef.forEach(node => {
    node.addEventListener('click', (evt) => {

      if (screen.innerText.length >= 10) {
        screen.innerText = "0";
        swal("Warning", "Out of display bounds!", "warning");
        return;
      }

      if (screen.innerText === '0' || screen.innerText === 'Error!') {
        screen.innerText = evt.target.innerText;
        return;
      }

      screen.innerText += evt.target.innerText;

    });
  });
});