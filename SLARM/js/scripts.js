document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('copy-bib');
    const bibPre = document.getElementById('bibtex-text');
    const msg = document.getElementById('copy-msg');
  
    btn.addEventListener('click', async () => {
      const text = bibPre.innerText;
      try {
        await navigator.clipboard.writeText(text);
        msg.style.display = 'inline';
        setTimeout(() => {
          msg.style.display = 'none';
        }, 2000);
      } catch (err) {
        alert('failed：\\n' + text);
      }
    });
  });


document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('.auto-play-video');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        
        if (entry.isIntersecting) {
          video.play().then(() => {
            console.log('play:', video.querySelector('source').src);
          }).catch(error => {
            console.log('failed:', error);
            video.setAttribute('controls', 'true');
          });
        } else {
          video.pause();
          video.currentTime = 0;
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '100px 0px 100px 0px'
    });
    

    videos.forEach(video => {
      video.load();
      
      video.addEventListener('loadedmetadata', function() {
        observer.observe(video);
      });
      
      video.addEventListener('error', function(e) {
        console.error('load error:', e);
        video.setAttribute('controls', 'true');
      });
    });
  });
  

document.addEventListener("DOMContentLoaded", function () {
  const videoPlayer = document.getElementById("demo-video-player");
  const selectorItems = document.querySelectorAll(".selector-item");

  selectorItems.forEach(button => {
    button.addEventListener("click", function () {

      selectorItems.forEach(btn => btn.classList.remove("active"));

      this.classList.add("active");

      const newSrc = this.getAttribute("data-src");
      videoPlayer.src = newSrc;

      videoPlayer.load();

      videoPlayer.onloadedmetadata = function () {
        videoPlayer.muted = false;

        videoPlayer.play().catch(err => {
          console.warn("paly error：", err);
        });
      };
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const sliderSections = document.querySelectorAll('.section-card');  
  sliderSections.forEach((section, index) => {
    const slider = section.querySelector('.video-slider');
    const slides = section.querySelectorAll('.slide');
    const dots = section.querySelectorAll('.dot');
    const prevBtn = section.querySelector('.prev-btn');
    const nextBtn = section.querySelector('.next-btn');
    
    if (slider && slides.length > 0) {
      initSlider(slider, slides, dots, prevBtn, nextBtn, `slider-${index}`);
    }
  });
});

function initSlider(slider, slides, dots, prevBtn, nextBtn, sliderId) {
  let currentSlide = 0;
  function updateSlider() {
    const slideWidth = slides[0].getBoundingClientRect().width + 10;
    slider.scrollTo({
      left: currentSlide * slideWidth,
      behavior: "smooth"
    });
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      updateSlider();
    });
  });

  prevBtn.addEventListener("click", () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlider();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentSlide < slides.length - 1) {
      currentSlide++;
      updateSlider();
    }
  });

  setTimeout(() => {
    updateSlider();
  }, 100);

  window.addEventListener("resize", () => {
    updateSlider();
  });

  slider.addEventListener("scroll", () => {
    const slideWidth = slider.clientWidth;
    const scrollPos = slider.scrollLeft;
    const newSlide = Math.round(scrollPos / slideWidth);
    if (newSlide !== currentSlide) {
      currentSlide = newSlide;
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide);
      });
    }
  });
}