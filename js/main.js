let description = document.querySelector("div.description");
let previousButton = document.querySelector("#prev");
let nextButton = document.querySelector("#next");
let playPauseButton = document.querySelector("#play-pause");
let myImage = document.querySelector("#diaporama img");
let currentIndex = 0;
let isPlaying = false;
let intervalId;
let dots = document.querySelectorAll("span.dot");
let buttonsAnimation = document.querySelectorAll("button.control");


let imagesList = [
  { src: "./img/1.jpg", alt: "Forêt verdoyante" },
  { src: "./img/2.jpg", alt: "Montagne ensoleillée" },
  { src: "./img/3.jpg", alt: "Campagne sepia" },
  { src: "./img/4.jpg", alt: "Plage de galets" }
];

function startSlideshow() {
  if (!isPlaying) {
    playPauseButton.innerHTML = "Pause";
    intervalId = setInterval(() => {
      currentIndex++;
      if (currentIndex >= imagesList.length) {
        currentIndex = 0;
      }
      myImage.src = imagesList[currentIndex].src;
      description.innerHTML = imagesList[currentIndex].alt;
      myImage.style = "opacity: 0;";
      setTimeout(() => {
        myImage.style.transition = "opacity 1s ease-in-out";
        myImage.style.opacity = 1;
      }, 1000);
      updateDots();
    }, 3000);
    isPlaying = true;
  }
}

function stopSlideshow() {
  if (isPlaying) {
    clearInterval(intervalId);
    playPauseButton.innerHTML = "Play";
    isPlaying = false;
  }
}

playPauseButton.onclick = () => {
  if (isPlaying) {
    stopSlideshow();
  } else {
    startSlideshow();
  }
};

nextButton.onclick = () => {
  if (isPlaying) {
    stopSlideshow();
  }
  currentIndex++;
  if (currentIndex >= imagesList.length) {
    currentIndex = 0;
  }
  myImage.src = imagesList[currentIndex].src;
  description.innerHTML = imagesList[currentIndex].alt;
  updateDots();
};

previousButton.onclick = () => {
  if (isPlaying) {
    stopSlideshow();
  }
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = imagesList.length - 1;
  }
  myImage.src = imagesList[currentIndex].src;
  description.innerHTML = imagesList[currentIndex].alt;
  updateDots();
};

function updateDots() {
  dots.forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function dotClick(event) {
  if (isPlaying) {
    stopSlideshow();
  }
  let dotIndex = Array.from(dots).indexOf(event.target);
  if (dotIndex !== -1) {
    currentIndex = dotIndex;
    myImage.src = imagesList[currentIndex].src;
    description.innerHTML = imagesList[currentIndex].alt;
    updateDots();
  }
}

dots.forEach((dot) => {
  dot.onclick = dotClick;
  dot.style = "cursor: pointer;";
});


buttonsAnimation.forEach((v)=>{
  v.onmouseover = ()=>{
    v.style = "background-color: black; color: white; transform: scale(1.2);";
  }
  v.onmouseout = ()=>{
    v.style = "";
  }
});

dots[0].classList.add("active");
