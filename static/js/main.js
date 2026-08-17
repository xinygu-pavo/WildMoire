document.querySelectorAll('[data-compare]').forEach((el)=>{
  const range=el.querySelector('.compare-range');
  const overlay=el.querySelector('.compare-overlay');
  const handle=el.querySelector('.compare-handle');
  const overlayImg=overlay.querySelector('img');

  const update=()=>{
    const value=range.value;
    overlay.style.width=value+'%';
    handle.style.left=value+'%';
    overlayImg.style.width=el.clientWidth+'px';
  };

  range.addEventListener('input',update);
  window.addEventListener('resize',update);
  overlayImg.addEventListener('load',update);
  requestAnimationFrame(update);
});

const lightbox=document.getElementById('lightbox');
const lightboxImage=document.getElementById('lightboxImage');
const lightboxClose=document.getElementById('lightboxClose');

document.querySelectorAll('.zoomable').forEach(img=>img.addEventListener('click',()=>{
  lightboxImage.src=img.src;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden','false');
}));

function closeLightbox(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden','true');
  lightboxImage.src='';
}

lightboxClose.addEventListener('click',closeLightbox);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox();});
