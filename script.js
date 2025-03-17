
let carData = JSON.parse(localStorage.getItem('carData')) || [];

document.getElementById('addButton').addEventListener('click', function() {
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

document.getElementById('searchButtonCarPlate').addEventListener('click', function() {
    const searchPlate = document.getElementById('searchCarPlate').value.trim().toLowerCase();
    const results = carData.filter(entry => entry.carPlate === searchPlate);
    displayResults(results);
});

document.getElementById('searchButton').addEventListener('click', function() {
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

document.getElementById('clearButton').addEventListener('click', function() {
    clearAllInputs();
    document.getElementById('results').innerHTML = '';
});

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

// Load data from localStorage upon loading the page
window.onload = function() {
    const savedData = JSON.parse(localStorage.getItem('carData'));
    if (savedData) {
        carData = savedData;
    }
};

