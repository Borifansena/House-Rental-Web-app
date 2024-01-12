
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