const imgList = document.querySelector(".topic-img-list");
const arrowBtn = document.querySelectorAll(".topic-list i");
const firstImgWidth = imgList.querySelector(".img-item").offsetWidth;
const imgListChildrens =[...imgList.children];

let isDragging = false, startX, startScrollLeft;

let imgPerView = Math.round(imgList.offsetWidth / firstImgWidth);

imgListChildrens.slice(-imgPerView).reverse().forEach(img => {
    imgList.insertAdjacentHTML("afterbegin", img.outerHTML);
});

imgListChildrens.slice(0, imgPerView).forEach(img => {
    imgList.insertAdjacentHTML("beforeend", img.outerHTML);
});

arrowBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        imgList.scrollLeft += btn.id === "left" ? - firstImgWidth : firstImgWidth;
    })
})

const dragStart = (e) => {
    isDragging = true;
    imgList.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = imgList.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return;
    imgList.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    imgList.classList.remove("dragging");
}

const infiniteScroll = () => {
    if (imgList.scrollLeft === 0) {
        imgList.classList.add("no-transition");
        imgList.scrollLeft = imgList.scrollWidth - (2 * imgList.offsetWidth);
        imgList.classList.remove("no-transition");
    } else if(Math.ceil(imgList.scrollLeft) === imgList.scrollWidth - imgList.offsetWidth) {
        imgList.classList.add("no-transition");
        imgList.scrollLeft = imgList.offsetWidth;
        imgList.classList.remove("no-transition");
    }
}

imgList.addEventListener("mousedown", dragStart);
imgList.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
imgList.addEventListener("scroll", infiniteScroll);


// Header bar 

const toggleBtn = document.querySelector('.header-bar-btn');
const toggleBtnIcon = document.querySelector('.header-bar-btn i');
const dropDownMenu = document.querySelector('.dropdown-menu');

toggleBtn.onclick = function(){
    dropDownMenu.classList.toggle("open");
    const isOpen = dropDownMenu.classList.contains("open"); 

    toggleBtnIcon.classList = isOpen
    ? 'fa-solid fa-xmark'
    : 'fa-solid fa-bars'
}
document.onclick = function(e){
    if (!toggleBtnIcon.contains(e.target) && (!dropDownMenu.contains(e.target))){
        dropDownMenu.classList.remove("open");}
    }