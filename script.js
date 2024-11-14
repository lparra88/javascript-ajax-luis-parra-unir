// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Al cargar la página, el cuadro de texto muestra la URL actual
    document.getElementById('url-input').value = window.location.href;
});

// Punto 1: Detectar si la cadena es un palíndromo
function checkPalindrome() {
    const input = document.getElementById('palindrome-input').value;
    const cleanedInput = input.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    const isPalindrome = cleanedInput === cleanedInput.split('').reverse().join('');
    document.getElementById('palindrome-result').textContent = isPalindrome ? 'Es un palíndromo' : 'No es un palíndromo';
}

// Punto 2: Encontrar el número mayor
function findGreater() {
    const number1 = parseFloat(document.getElementById('number1').value);
    const number2 = parseFloat(document.getElementById('number2').value);
    if (!isNaN(number1) && !isNaN(number2)) {
        document.getElementById('greater-result').textContent = number1 > number2 ? `El mayor es: ${number1}` : number1 < number2 ? `El mayor es: ${number2}` : 'Ambos números son iguales';
    } else {
        document.getElementById('greater-result').textContent = 'Por favor ingresa dos números válidos';
    }
}

// Punto 3: Mostrar las vocales de una frase
function showVowels() {
    const phrase = document.getElementById('phrase-input').value;
    const vowels = phrase.match(/[aeiouáéíóúü]/gi);
    document.getElementById('vowels-result').textContent = vowels ? `Vocales encontradas: ${vowels.join(', ')}` : 'No se encontraron vocales';
}

// Punto 4: Contar las vocales de una frase
function countVowels() {
    const phrase = document.getElementById('phrase-input').value;
    const vowelsCount = { a: 0, e: 0, i: 0, o: 0, u: 0 };
    for (let char of phrase.toLowerCase()) {
        if (vowelsCount.hasOwnProperty(char)) {
            vowelsCount[char]++;
        }
    }
    const result = Object.entries(vowelsCount)
        .map(([vowel, count]) => `${vowel.toUpperCase()}: ${count}`)
        .join(', ');
    document.getElementById('vowel-count-result').textContent = `Conteo de vocales: ${result}`;
}

// AJAX: Mostrar contenido de la URL ingresada
function fetchContent() {
    const url = document.getElementById('url-input').value;
    const requestStatus = document.getElementById('request-status');
    const content = document.getElementById('content');
    const headers = document.getElementById('headers');
    const statusCode = document.getElementById('status-code');

    const xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
        switch (xhr.readyState) {
            case 0:
                requestStatus.textContent = 'Petición no iniciada';
                break;
            case 1:
                requestStatus.textContent = 'Conexión establecida';
                break;
            case 2:
                requestStatus.textContent = 'Petición recibida';
                break;
            case 3:
                requestStatus.textContent = 'Procesando petición';
                break;
            case 4:
                if (xhr.status >= 200 && xhr.status < 300) {
                    requestStatus.textContent = 'Petición completada';
                    content.innerHTML = xhr.responseText;
                    headers.textContent = xhr.getAllResponseHeaders();
                    statusCode.textContent = `Código de estado: ${xhr.status} - ${xhr.statusText}`;
                } else {
                    requestStatus.textContent = 'Error en la petición';
                    content.textContent = '';
                    headers.textContent = '';
                    statusCode.textContent = `Código de estado: ${xhr.status} - ${xhr.statusText}`;
                }
                break;
        }
    };
    
    xhr.open('GET', url, true);
    xhr.send();
}
