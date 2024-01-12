
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
      .catch(error => console.log(error)); }