document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.querySelector("#balloonCanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");
  const base = "./images/";
  const balloons = [];

  function openModal() {
    document.getElementById("myModal").style.display = "block";
  }

  function closeModal() {
    document.getElementById("myModal").style.display = "none";
  }

  function submitForm() {
    const inputValue = document.getElementById("username").value;
    document.querySelector(".username").innerHTML = inputValue;
    document.title = "Happy Birthday " + inputValue;
    closeModal();
    return false;
  }

  const generateRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  function Balloon(image, x, y, width) {
    this.image = new Image();
    this.image.src = image;
    this.image.onload = () => {
      this.x = x;
      this.y = y;
      this.speed = generateRandomNumber(2, 5);
      this.width = width;
    };

    this.update = () => {
      this.y -= this.speed;
      if (this.y + this.width < 0) {
        let index = balloons.indexOf(this);
        let randomBalloon = generateRandomNumber(1, 3);

        const randomImage = `${base}flags-0${randomBalloon}.png`;
        const randomX = generateRandomNumber(0, canvas.width);
        const balloonWidth = generateRandomNumber(100, 200);
        balloons[index] = new Balloon(
          randomImage,
          randomX,
          canvas.height,
          balloonWidth
        );
      }
    };

    this.draw = () => {
      if (this.image.complete) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.width);
      }
    };
  }

  function createRandomBalloon() {
    if (balloons.length < 10) {
      let randomBalloon = generateRandomNumber(1, 3);
      const randomImage = `${base}flags-0${randomBalloon}.png`;
      const randomX = generateRandomNumber(0, canvas.width);
      const balloonWidth = generateRandomNumber(100, 200);
      let balloon = new Balloon(
        randomImage,
        randomX,
        canvas.height + 50,
        balloonWidth
      );
      balloons.push(balloon);
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const balloon of balloons) {
      balloon.update();
      balloon.draw();
    }
    requestAnimationFrame(animate);
  }

  let randomCreationTime = generateRandomNumber(3, 10);
  setInterval(createRandomBalloon, randomCreationTime * 1000);

  window.onload = () => {
    createRandomBalloon();
    animate();
    openModal();
  };

  // Add an event listener for the form submission
  document.getElementById("nameForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    submitForm(); // Call the submitForm function
  });
});
