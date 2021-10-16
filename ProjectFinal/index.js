function imgSlider(anything){
    document.querySelector('.Food').src=anything;
}
let el=document.querySelectorAll('.thumb li');
for(let i=0;i<el.length;i++){
    el[i].onclick=function(){
        var c=0;
        while(c<el.length){
            el[c++].className='check';
        }
        el[i].className='check active';
    }
}
function changebackground(color){
    const bg=document.querySelector('section');
    bg.style.background=color;
}