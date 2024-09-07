let history = [];

function calculate() {
    let firstNumber = parseFloat(document.querySelector('#FirstNumber').value);
    let secondNumber = parseFloat(document.querySelector('#SecondNumber').value);
    let operator = document.getElementById('operator').value;
    let result;

    if (isNaN(firstNumber) || isNaN(secondNumber)) {
        alert('Please enter valid numbers.');
        return;
    }

    switch (operator) {
        case '+':
            result = firstNumber + secondNumber;
            break;
        case '-':
            result = firstNumber - secondNumber;
            break;
        case '*':
            result = firstNumber * secondNumber;
            break;
        case '/':
            result = firstNumber / secondNumber;
            break;
        case '%':
            result = firstNumber % secondNumber;
            break;
        default:
            alert('Please select a valid operator.');
            return;
    }

    document.getElementById('result').innerText = `Result: ${result}`;
    
    // Save history
    saveHistory(firstNumber, secondNumber, operator, result);
}

function saveHistory(firstNumber, secondNumber, operator, result) {
    history.push(`${firstNumber} ${operator} ${secondNumber} = ${result}`);
    showHistory();
}

function showHistory() {
    const historyList = document.getElementById('history');
    historyList.innerHTML = ''; // Clear the current list
    history.forEach((entry) => {
        const li = document.createElement('li');
        li.innerText = entry;
        historyList.appendChild(li);
    });
}

function clearHistory() {
    history = [];
    showHistory();
}
