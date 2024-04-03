const imageContainer = document.getElementById('imageContainer');
const resetButton = document.getElementById('reset');
const verifyButton = document.getElementById('verify');
const para = document.getElementById('para');
let clickedImages = [];

// Function to shuffle array elements
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
 
// Function to create and append image elements
function createImageElement(src, className) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Image';
    img.classList.add('tile', className);
    img.addEventListener('click', handleImageClick);
    return img;
  }

  // Function to reset the game
  function reset() {
    clickedImages = [];
    resetButton.style.display = 'none';
    verifyButton.style.display = 'none';
    para.style.display = 'none';
    para.innerHTML = '';
    imageContainer.innerHTML = '';
    const classNames = ['img1', 'img2', 'img3', 'img4', 'img5','img4'];
    shuffle(classNames);
    classNames.forEach(className => {
      const img = createImageElement(`image${Math.floor(Math.random() * 6) + 1}.jpg`, className);
      imageContainer.appendChild(img);
    });
  }
   
    // Function to handle image clicks
    function handleImageClick(event) {
        const clickedImg = event.target;
        if (!clickedImages.includes(clickedImg) && clickedImages.length < 2) {
          clickedImages.push(clickedImg);
          clickedImg.classList.add('selected');
        }
        if (clickedImages.length === 2) {
          verifyButton.style.display = 'inline-block';
        }
        if (clickedImages.length > 2) {
          para.style.display = 'block';
          para.textContent = 'You can select a maximum of two images.';
        }
      }

    // Function to handle verify button click
    function handleVerifyClick() {
    verifyButton.innerHTML = 'Verifying';
    setTimeout(() => {
        console.log(clickedImages[0].classList.value)
        console.log(clickedImages[1].classList.value)

      if (clickedImages[0].classList.value == clickedImages[1].classList.value) {
        // console.log(1)
        alert("You are Human , Congratulations")
      } else {
        // console.log(2)
        alert("We cant verify you as an Human , you selected non-identical tiles");
      }
      verifyButton.style.display = 'none';
      verifyButton.innerHTML = 'Verify';
    }, 2000);
  }
  // Attach event listeners
  resetButton.addEventListener('click', reset);
  verifyButton.addEventListener('click', handleVerifyClick);

  // Initial game setup
  reset();