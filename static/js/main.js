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



// Quantitative results: compact carousel with side arrows and swipe/drag support.
document.querySelectorAll('[data-quant-carousel]').forEach((carousel)=>{
  const panels=[...carousel.querySelectorAll('[data-quant-panel]')];
  const prev=carousel.querySelector('.quant-nav-prev');
  const next=carousel.querySelector('.quant-nav-next');
  const stage=carousel.querySelector('.quant-stage');
  let active=0;
  let startX=null;

  const show=(index)=>{
    active=(index+panels.length)%panels.length;
    panels.forEach((panel,i)=>panel.classList.toggle('active',i===active));
  };

  prev.addEventListener('click',()=>show(active-1));
  next.addEventListener('click',()=>show(active+1));

  stage.addEventListener('pointerdown',(e)=>{
    startX=e.clientX;
  });
  stage.addEventListener('pointerup',(e)=>{
    if(startX===null)return;
    const dx=e.clientX-startX;
    startX=null;
    if(Math.abs(dx)>55){
      show(active+(dx<0?1:-1));
    }
  });
  stage.addEventListener('pointercancel',()=>{startX=null;});

  carousel.addEventListener('keydown',(e)=>{
    if(e.key==='ArrowLeft')show(active-1);
    if(e.key==='ArrowRight')show(active+1);
  });

  show(0);
});

// Citation copy button.
const copyBibtex=document.getElementById('copyBibtex');
const bibtex=document.getElementById('bibtex');
if(copyBibtex && bibtex){
  copyBibtex.addEventListener('click',async()=>{
    try{
      await navigator.clipboard.writeText(bibtex.textContent.trim());
      const original=copyBibtex.textContent;
      copyBibtex.textContent='Copied';
      setTimeout(()=>{copyBibtex.textContent=original;},1400);
    }catch(_err){
      const selection=window.getSelection();
      const range=document.createRange();
      range.selectNodeContents(bibtex);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  });
}
