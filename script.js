// Your script here.
// Initialize speech synthesis
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('#voices');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

// Populate voices dropdown
function populateVoices() {
  voices = speechSynthesis.getVoices();
  voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

// Set selected voice
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  restartSpeech();
}

// Update rate and pitch dynamically
function setOption() {
  msg[this.name] = this.value;
  restartSpeech();
}

// Restart speech with new settings
function restartSpeech() {
  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}

// Start speech
function speak() {
  msg.text = document.querySelector('[name="text"]').value;
  speechSynthesis.speak(msg);
}

// Stop speech
function stop() {
  speechSynthesis.cancel();
}

// Event listeners
speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('input', setOption));
speakButton.addEventListener('click', speak);
stopButton.addEventListener('click', stop);
