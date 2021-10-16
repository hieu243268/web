const menuBar=document.querySelector(".menu-bar")
menuBar.addEventListener("click",function(){
    menuBar.classList.toggle("active")
    document.querySelector('.menu-items').classList.toggle("active")
})
window.addEventListener("scroll",function(){
    // console.log(this.pageYOffset)
    if(this.pageYOffset > 60){
        document.querySelector(".top").classList.add("active");
    }
    else {
        document.querySelector(".top").classList.remove("active")
    }
})
const menuTabs = document.querySelector(".menu-tittle") ;
menuTabs.addEventListener("click",function(e){
    if(e.target.classList.contains("menu-button")&& !e.target.classList.contains("active"))
    {
        const target = e.target.getAttribute("data-target");
        // console.log(target);
        menuTabs.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        const menuSection = document.querySelector(".menu-section");
        menuSection.querySelector(".row.active").classList.remove("active");
        menuSection.querySelector(target).classList.add("active");

     }
})
var boughtCourseNumber = 0;
let addToCard = function(event) {
    event.target.style.display = "none";
    document.getElementById('bought-number').innerHTML = ++boughtCourseNumber;
};