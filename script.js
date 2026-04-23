var currentScreen = 1;

// ── Navigate to a screen ──
function goTo(n) {
  var prev = document.getElementById('screen' + currentScreen);
  var next = document.getElementById('screen' + n);

  prev.classList.remove('active');
  prev.classList.add('hidden');

  setTimeout(function () {
    next.classList.remove('hidden');
    next.classList.add('active');
    if (n === 2) burstConfetti();
  }, 100);

  currentScreen = n;
}

// ── Generate twinkling stars ──
function makeStars() {
  var s = document.getElementById('stars');
  for (var i = 0; i < 60; i++) {
    var d = document.createElement('div');
    d.className = 'star';
    var sz = Math.random() * 2.5 + 0.5;
    d.style.cssText =
      'width:' + sz + 'px;' +
      'height:' + sz + 'px;' +
      'top:' + Math.random() * 100 + '%;' +
      'left:' + Math.random() * 100 + '%;' +
      'animation-delay:' + Math.random() * 3 + 's;' +
      'animation-duration:' + (1.5 + Math.random() * 2) + 's;';
    s.appendChild(d);
  }
}

// ── Generate falling rose petals ──
function makePetals() {
  var c = document.getElementById('petals');
  var colors = ['#e8739a', '#d4527e', '#f0a0be', '#c97a8a', '#f5c0d0'];
  for (var i = 0; i < 18; i++) {
    var d = document.createElement('div');
    d.className = 'petal';
    d.style.cssText =
      'left:' + Math.random() * 100 + '%;' +
      'top:-20px;' +
      'background:' + colors[Math.floor(Math.random() * colors.length)] + ';' +
      'animation-delay:' + Math.random() * 8 + 's;' +
      'animation-duration:' + (4 + Math.random() * 5) + 's;' +
      'transform:rotate(' + Math.random() * 360 + 'deg);';
    c.appendChild(d);
  }
}

// ── Confetti burst on cake screen ──
function burstConfetti() {
  var colors = ['#f0a0be', '#e8739a', '#c97a8a', '#d4527e', '#f5c0d0', '#a070c0', '#80a0f0'];
  var origin = document.getElementById('confetti-origin');

  for (var i = 0; i < 30; i++) {
    var d = document.createElement('div');
    d.className = 'confetti-piece';
    var angle = Math.random() * 360;
    var dist = 80 + Math.random() * 120;
    var dx = Math.cos(angle * Math.PI / 180) * dist + 'px';
    var dy = (Math.sin(angle * Math.PI / 180) * dist - 80) + 'px';
    d.style.cssText =
      'background:' + colors[Math.floor(Math.random() * colors.length)] + ';' +
      'border-radius:' + (Math.random() > 0.5 ? '50%' : '2px') + ';' +
      'top:50%;left:50%;' +
      '--dx:' + dx + ';' +
      '--dy:' + dy + ';' +
      'animation-delay:' + Math.random() * 0.3 + 's;';
    origin.appendChild(d);
    setTimeout(function (el) { el.classList.add('burst'); }, 50, d);
  }
}

// ── Swipe / click / tap detection ──
var startY = 0;
var startX = 0;
var app = document.getElementById('bday-app');

// Touch: swipe up OR tap
app.addEventListener('touchstart', function (e) {
  startY = e.touches[0].clientY;
  startX = e.touches[0].clientX;
}, { passive: true });

app.addEventListener('touchend', function (e) {
  var dy = startY - e.changedTouches[0].clientY;
  var dx = Math.abs(startX - e.changedTouches[0].clientX);
  if (currentScreen === 1 && dx < 30) {
    // swipe up OR simple tap
    goTo(2);
  }
}, false);

// Mouse: click anywhere on screen 1
app.addEventListener('click', function (e) {
  if (currentScreen === 1) goTo(2);
}, false);

// ── Init ──
makeStars();
makePetals();

// ── Photo Modal Functions ──
function openPhotoModal(imageSrc) {
  var modal = document.getElementById('photo-modal');
  var modalImage = document.getElementById('modal-image');
  modalImage.src = imageSrc;
  modal.classList.add('active');
}

function closePhotoModal() {
  var modal = document.getElementById('photo-modal');
  modal.classList.remove('active');
}

// Attach click handlers to all photos
document.addEventListener('DOMContentLoaded', function () {
  var photoInners = document.querySelectorAll('.photo-inner');
  photoInners.forEach(function (photoInner) {
    photoInner.addEventListener('click', function (e) {
      e.stopPropagation();
      var img = photoInner.querySelector('img');
      if (img) {
        openPhotoModal(img.src);
      }
    });
  });
});

// Close modal when clicking outside the image
var modal = document.getElementById('photo-modal');
if (modal) {
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      closePhotoModal();
    }
  });
}