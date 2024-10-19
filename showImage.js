var imageContainer = document.getElementById("imageContainer");

imageContainer.addEventListener("touchstart", function(e) {
  e.preventDefault(); // запрещаем скролл внутри div
}, { passive: false });

imageContainer.addEventListener("touchmove", function(e) {
  e.preventDefault(); // запрещаем скролл внутри div
}, { passive: false });

let currentScale = 1.0;
let currentRotation = 0;
function showImage() {

  
  const uploadInput = document.getElementById('upload');
  const imageContainer = document.getElementById('imageContainer');

  imageContainer.style.backgroundImage = "none";

  if (uploadInput.files && uploadInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = new Image();
      img.src = e.target.result;

      img.onload = function() {
        const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    let width = img.width;
    let height = img.height;

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(img, 0, 0, width, height);

    canvas.setAttribute('draggable', true);
    canvas.style.position = 'absolute';

    // Calculate the center position of the canvas
    let centerX = (imageContainer.offsetWidth - width) / 2;
    let centerY = (imageContainer.offsetHeight - height) / 2;

    // Set the position to center the canvas in the imageContainer
    canvas.style.left = `${centerX}px`;
    canvas.style.top = `${centerY}px`;

    // Store the initial position of the canvas
    canvas.setAttribute('data-x', centerX);
    canvas.setAttribute('data-y', centerY);

    imageContainer.innerHTML = '';
    imageContainer.appendChild(canvas);
    imageContainer.style.display = 'block';

	// Сбрасываем масштаб и поворот после загрузки нового изображения (начало)
    currentScale = 1.0;
    currentRotation = 0;
    resetSliders(); // Вызываем функцию для сброса ползунков
    canvas.style.transform = `scale(${currentScale}) rotate(${currentRotation}deg)`;
	// Применяем сброс трансформации к канвасу (конец)

        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        canvas.onmousedown = dragMouseDown;
        //canvas.ontouchstart = dragTouchStart; // добавлено
		canvas.addEventListener('touchstart', dragTouchStart, {passive: true}); // изменено


        function dragMouseDown(e) {
          e = e || window.event;
          e.preventDefault();
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmousemove = elementDrag;
          document.onmouseup = closeDragElement;
        }

        function dragTouchStart(e) { // добавлено
          e = e || window.event;
          //e.preventDefault();
          pos3 = e.touches[0].clientX;
          pos4 = e.touches[0].clientY;
          document.ontouchmove = elementDrag;
          document.ontouchend = closeDragElement;
        }

        function elementDrag(e) {
          e = e || window.event;
          
          const canvas = document.querySelector("#imageContainer canvas");
          const offsetX = canvas.offsetLeft - pos1;
          const offsetY = canvas.offsetTop - pos2;

          pos1 = pos3 - (e.clientX || e.touches[0].clientX); // изменено
          pos2 = pos4 - (e.clientY || e.touches[0].clientY); // изменено
          pos3 = e.clientX || e.touches[0].clientX; // изменено
          pos4 = e.clientY || e.touches[0].clientY; // изменено
	
          canvas.style.top = (offsetY) + 'px';
          canvas.style.left = (offsetX) + 'px';

          // Update the data-x and data-y attributes with the new position
          canvas.setAttribute('data-x', offsetX);
          canvas.setAttribute('data-y', offsetY);
        }

        function closeDragElement() {
          document.onmousemove = null;
          document.onmouseup = null;
          document.ontouchmove = null; // добавлено
          document.ontouchend = null; // добавлено
        }
      };
    };
    
    reader.readAsDataURL(uploadInput.files[0]);
  }
}

function changeScale(value) {
  const canvas = document.querySelector("#imageContainer canvas");
  currentScale = value / 100;
  // Обновляем масштаб, сохраняя текущий поворот
  canvas.style.transform = `scale(${currentScale}) rotate(${currentRotation}deg)`;
}

function rotateImage(angle) {
  const canvas = document.querySelector("#imageContainer canvas");
  currentRotation = angle;
  // Обновляем поворот, сохраняя текущий масштаб
  canvas.style.transform = `scale(${currentScale}) rotate(${currentRotation}deg)`;
}

function resetSliders() {
  // Получаем элементы ползунков и устанавливаем начальные значения
  const scaleSlider = document.getElementById('scaleSlider');
  const rotateSlider = document.getElementById('rotateSlider');

  // Сбрасываем значения ползунков
  scaleSlider.value = 100; // 100% масштаб
  rotateSlider.value = 0; // 0 градусов поворот

  // Обновляем отображаемые значения, если вы используете какие-либо лейблы или динамические подписи для отображения значений
  // (Этот код - пример, зависит от того, как у вас реализовано отображение значений ползунков)
  // document.getElementById('scaleValue').textContent = '100%';
  // document.getElementById('rotateValue').textContent = '0°';
}