
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
