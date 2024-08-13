window.onload = function () {
  // Get the .destinations element
  const destinationsElement = document.querySelector(".destinations");

  // Get the bounding box of the .destinations element
  const destinationsPosition = destinationsElement.getBoundingClientRect();

  // Get the .destinations-header element
  const headerElement = document.querySelector(".destinations-header");

  // Set the position to match .destinations
  headerElement.style.position = "absolute";
  headerElement.style.top = `${destinationsPosition.top + window.scrollY}px`;
  headerElement.style.left = `${destinationsPosition.left + window.scrollX}px`;
};
