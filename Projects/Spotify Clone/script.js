const slider = document.getElementById("sliderjs");
const artistSlider = document.getElementById("artistSlider");

function smoothScroll(element, distance, duration) {
  let start = element.scrollLeft;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    let timeElapsed = currentTime - startTime;

    let progress = Math.min(timeElapsed / duration, 1);

    element.scrollLeft = start + distance * easeInOut(progress);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  function easeInOut(t) {
    return t < 0.5
      ? 2 * t * t
      : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  requestAnimationFrame(animation);
}

function scrollSliderRight() {
  smoothScroll(slider, 300, 500);
}

function scrollSliderLeft() {
  smoothScroll(slider, -300, 500);
}

function scrollArtistsLeft() {
  smoothScroll(artistSlider, -300, 500);
}

function scrollArtistsRight() {
  smoothScroll(artistSlider, 300, 500);
}

const audio = document.getElementById("audioPlayer");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  const percent = (audio.currentTime / audio.duration) * 100;
  progress.value = percent;  currentTimeEl.innerText = formatTime(audio.currentTime);
  durationEl.innerText = formatTime(audio.duration);
});

progress.addEventListener("input", () => {
    if (!audio.duration) return;

    const newTime = (progress.value / 100) * audio.duration;
    audio.currentTime = newTime;
});

function formatTime(time) {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60)
        .toString()
        .padStart(2, "0");
    return `${mins}:${secs}`;
}