function toggleDetails(button) {
    console.log("Toggling details for:", button);
  
    const houseDetails = button.closest('li').querySelector('.hidden-info');
    console.log("Found element:", houseDetails);
  
    console.log("Element has 'hidden' class:", houseDetails.classList.contains('hidden'));
  
    houseDetails.classList.toggle('hidden');
  
    console.log("Element class after toggle:", houseDetails.classList);
  }
  