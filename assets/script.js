const imgList = document.querySelector(".topic-img-list");

let isDragging = false;

const dragStart = () => {
    isDragging = true;
    imgList.classList.add("dragging");
}

const dragging = (e) => {
    if (!isDragging) return;
    imgList.scrollRight = e.pageX;
}

imgList.addEventListener("mousedown", dragStart);
imgList.addEventListener("mousemove", dragging);