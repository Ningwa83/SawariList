
let userData = JSON.parse(localStorage.getItem('userData')) || null;
let carData = JSON.parse(localStorage.getItem('carData')) || [];

// Function to create an account
document.getElementById('saveButton').addEventListener('click', function () {
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value.trim().toLowerCase();
    const password = document.getElementById('password').value;

    const usernamePattern = /^[a-zA-Z0-9]{4}$/;
    const passwordPattern = /^[a-zA-Z0-9]{4}$/;

    if (usernamePattern.test(username) && passwordPattern.test(password)) {
        userData = { email, username, password };
        localStorage.setItem('userData', JSON.stringify(userData));
        alert('Account created successfully! Please log in.');
        document.getElementById('accountSection').style.display = 'none';
        document.getElementById('loginSection').style.display = 'block';
    } else {
        alert('Username and Password must be exactly 4 characters (letters or numbers).');
    }
});

// Function to log into the account
document.getElementById('loginButton').addEventListener('click', function () {
    const loginUsername = document.getElementById('loginUsername').value.trim().toLowerCase();
    const loginPassword = document.getElementById('loginPassword').value;

    if (userData && userData.username === loginUsername && userData.password === loginPassword) {
        alert('Login successful!');
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('carInputSection').style.display = 'block';
    } else {
        alert('Invalid username or password. Please try again.');
    }
});

// Function to add or update car details
document.getElementById('addButton').addEventListener('click', function () {
    const carPlate = document.getElementById('carPlate').value.trim().toLowerCase();
    const tower = document.getElementById('tower').value;
    const floor = document.getElementById('floor').value;
    const flat = document.getElementById('flat').value.trim().toLowerCase();

    if (carPlate && tower && floor && flat) {
        const existingEntryIndex = carData.findIndex(entry => 
            entry.carPlate === carPlate && 
            entry.tower === tower && 
            entry.floor === floor && 
            entry.flat === flat
        );

        if (existingEntryIndex !== -1) {
            const updateConfirmation = confirm("This car details or owner's details have been added already. Do you want to update?");
            if (updateConfirmation) {
                carData[existingEntryIndex] = { carPlate, tower, floor, flat };
                localStorage.setItem('carData', JSON.stringify(carData));
                alert('Car details updated successfully!');
                clearAllInputs();
            }
        } else {
            const newEntry = { carPlate, tower, floor, flat };
            carData.push(newEntry);
            localStorage.setItem('carData', JSON.stringify(carData));
            alert('Car details added successfully!');
            clearAllInputs();
        }
    } else {
        alert('Please fill in all fields.');
    }
});

// Function to search by car plate
document.getElementById('searchButtonCarPlate').addEventListener('click', function () {
    const searchPlate = document.getElementById('searchCarPlate').value.trim().toLowerCase();
    const results = carData.filter(entry => entry.carPlate === searchPlate);
    displayResults(results);
});

// Function to search by tower, floor, and flat
document.getElementById('searchButton').addEventListener('click', function () {
    const searchTower = document.getElementById('searchTower').value;
    const searchFloor = document.getElementById('searchFloor').value;
    const searchFlat = document.getElementById('searchFlat').value.trim().toLowerCase();

    const results = carData.filter(entry => 
        entry.tower === searchTower && 
        entry.floor === searchFloor && 
        entry.flat === searchFlat
    );
    displayResults(results);
});

// Function to clear all input fields and results
document.getElementById('clearButton').addEventListener('click', function () {
    clearAllInputs();
    document.getElementById('results').innerHTML = '';
});

// Function to display results
function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (results.length > 0) {
        results.forEach(entry => {
            const resultItem = document.createElement('div');
            resultItem.innerText = `Car Plate: ${entry.carPlate}, Tower: ${entry.tower}, Floor: ${entry.floor}, Flat: ${entry.flat}`;
            resultsDiv.appendChild(resultItem);
        });
    } else {
        resultsDiv.innerHTML = 'No results found.';
    }
}

// Function to clear all input fields
function clearAllInputs() {
    document.getElementById('carPlate').value = '';
    document.getElementById('tower').value = '';
    document.getElementById('floor').value = '';
    document.getElementById('flat').value = '';
    document.getElementById('searchCarPlate').value = '';
    document.getElementById('searchTower').value = '';
    document.getElementById('searchFloor').value = '';
    document.getElementById('searchFlat').value = '';
}

// Check if user is already registered and prompt for login
window.onload = function () {
    if (userData) {
        document.getElementById('accountSection').style.display = 'none';
        document.getElementById('loginSection').style.display = 'block';
    } else {
        document.getElementById('carInputSection').style.display = 'none';
    }
};