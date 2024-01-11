
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
  