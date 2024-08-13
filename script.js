window.onload = function () {
  const element = document.querySelector(".your-element");
  const rect = element.getBoundingClientRect();

  console.log("Width:", rect.width);
  console.log("Height:", rect.height);
  console.log("Top:", rect.top);
  console.log("Left:", rect.left);
  console.log("Bottom:", rect.bottom);
  console.log("Right:", rect.right);

  // Example of positioning another element based on the measured element
  const targetElement = document.querySelector(".your-div");
  targetElement.style.position = "absolute";
  targetElement.style.left = `${rect.right + 20}px`;
  targetElement.style.top = `${rect.top}px`;
};
