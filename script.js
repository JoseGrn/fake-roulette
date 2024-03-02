let options = [];

function addOption() {
  const optionInput = document.getElementById('optionInput');
  const option = optionInput.value.trim();
  
  if (option !== '') {
    options.push(option);
    optionInput.value = '';
    displayOptions();
  }
}

function displayOptions() {
  const optionsList = document.getElementById('optionsList');
  optionsList.innerHTML = '';
  options.forEach((option, index) => {
    const optionItem = document.createElement('div');
    optionItem.classList.add('option-item');
    const optionText = document.createElement('span');
    optionText.classList.add('option-text');
    optionText.textContent = option;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = () => deleteOption(index);
    optionItem.appendChild(optionText);
    optionItem.appendChild(deleteButton);
    optionsList.appendChild(optionItem);
  });
}

function deleteOption(index) {
  options.splice(index, 1);
  displayOptions();
}

function spinWheel() {
  const resultElement = document.getElementById('result');
  const spinButton = document.querySelector('.spin-button button');
  
  if (options.length >= 2) { // Verificamos que haya al menos tres opciones ingresadas
    resultElement.textContent = 'Girando...';
    spinButton.disabled = true; // Desactivamos el botón mientras se realiza la animación
    
    // Simulamos una pausa antes de mostrar el resultado
    setTimeout(() => {
      let i = 0;
      let repetitions = 5; // Aumentamos la cantidad de repeticiones
      const intervalId = setInterval(() => {
        if (i < options.length * repetitions) {
          const currentIndex = i % options.length;
          resultElement.textContent = options[currentIndex];
          i++;
        } else {
          clearInterval(intervalId);
          const selectedOption = options[1]; // Siempre seleccionamos el tercer valor ingresado
          resultElement.textContent = `Opción seleccionada: ${selectedOption}`;
          spinButton.disabled = false; // Reactivamos el botón después de mostrar el resultado
        }
      }, 100); // Reducimos el intervalo de tiempo entre cada nombre a 100 milisegundos
    }, 1000); // Pausa de 1 segundo antes de iniciar la animación
  } else {
    resultElement.textContent = 'Agrega al menos dos opciones antes de girar la ruleta';
  }
}

// Event listener para la tecla "Enter"
document.getElementById('optionInput').addEventListener('keydown', function(event) {
  if (event.keyCode === 13) { // Si la tecla presionada es "Enter" (código de tecla 13)
    addOption(); // Llamar a la función addOption
  }
});
