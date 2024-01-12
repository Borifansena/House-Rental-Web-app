
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
  