const apiUrl = 'https://example.com/api/houses';

// Fetch all houses
function fetchHouses() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(houses => {
      const houseList = document.getElementById('houseList');
      houseList.innerHTML = '';
      
      houses.forEach(house => {
        const li = document.createElement('li');
        li.innerText = `ID: ${house.id}, Address: ${house.address}`;
        houseList.appendChild(li);
      });
    })
    .catch(error => console.log(error));
}

// Create a new house
function createHouse() {
  const addressInput = document.getElementById('address');
  const address = addressInput.value;
  
  if (address) {
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ address })
    })
      .then(response => response.json())
      .then(data => {
        console.log('House created:', data);
        addressInput.value = '';
        fetchHouses();
      })
      .catch(error => console.log(error));
  }
}

// Update a house
function updateHouse() {
  const houseIdInput = document.getElementById('houseId');
  const addressInput = document.getElementById('address');
  const houseId = houseIdInput.value;
  const address = addressInput.value;
  
  if (houseId && address) {
    fetch(`${apiUrl}/${houseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ address })
    })
      .then(response => response.json())
      .then(data => {
        console.log('House updated:', data);
        houseIdInput.value = '';
        addressInput.value = '';
        fetchHouses();
      })
      .catch(error => console.log(error));
  }
}

// Delete a house
function deleteHouse() {
  const houseId = document.getElementById('houseId').value;
  
  if (houseId) {
    fetch(`${apiUrl}/${houseId}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        console.log('House deleted:', data);
        document.getElementById('houseId').value = '';
        fetchHouses();
      })
      .catch(error => console.log(error));
  }
}

// Fetch a house by ID
function fetchHouseById() {
  const houseId = document.getElementById('houseId').value;
  
  if (houseId) {
    fetch(`${apiUrl}/${houseId}`)
      .then(response => response.json())
      .then(house => {
        if (house) {
          document.getElementById('address').value = house.address;
        } else {
          console.log('House not found');
        }
      })
      .catch(error => console.log(error));
  }
}

// Event listeners for buttons
document.getElementById('fetchBtn').addEventListener('click', fetchHouseById);
document.getElementById('createBtn').addEventListener('click', createHouse);
document.getElementById('updateBtn').addEventListener('click', updateHouse);
document.getElementById('deleteBtn').addEventListener('click', deleteHouse);

// Fetch all houses initially
fetchHouses();

const rentButtons = document.querySelectorAll(".rent-button");
rentButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    // Get the house ID from the button's closest row
    const houseId = event.target.closest("tr").dataset.houseId;

    // Send a request to the backend API to mark the house as rented
    fetch(`/api/houses/rent/${houseId}`, {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          // Update UI to reflect rented status (e.g., disable button, change text)
          // Display a success message
        } else {
          // Handle error
        }
      })
      .catch((error) => console.error(error));
  });
});
