function showImage2() {
	
	var element = document.getElementById("step2"); // Скролл к step2
	element.scrollIntoView({ behavior: "smooth", block: "start" }); // Скролл к step2
	
    const canvas = document.querySelector("#imageContainer canvas");
    const imageContainer2 = document.getElementById('imageContainer2');
    imageContainer2.style.backgroundImage = "none";

	
    const newCanvas = document.createElement('canvas');
    const newCtx = newCanvas.getContext('2d');

  newCanvas.width = imageContainer2.offsetWidth;
  newCanvas.height = imageContainer2.offsetHeight;

	// Заливка холста белым цветом
    newCtx.fillStyle = "white";
    newCtx.fillRect(0, 0, newCanvas.width, newCanvas.height);
	
    newCtx.save();
    newCtx.translate(canvas.width / 2 + parseInt(canvas.getAttribute('data-x') || 0), canvas.height / 2 + parseInt(canvas.getAttribute('data-y') || 0));
    newCtx.scale(currentScale, currentScale);
    newCtx.rotate(Math.PI / 180 * document.getElementById('rotateSlider').value);
    newCtx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);
    newCtx.restore();



    // Создаем элемент img и устанавливаем атрибут src равным URL изображения
    const img = new Image();
    img.src = newCanvas.toDataURL('image/jpeg', 1.0);
    img.alt = 'Cropped and grayscaled image';

    // Очищаем контейнер и добавляем в него изображение
    imageContainer2.innerHTML = '';
    imageContainer2.appendChild(img);
    imageContainer2.style.display = 'block';
}