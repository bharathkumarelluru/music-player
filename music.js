const songs = [
    
    { title: "Hey Minnale", src: "Hey Minnale Amaran Tamil 128 Kbps.mp3", img: "Hey Minnale.jpg" },
    { title: "Merise Merise", src: "Merise Merise.mp3", img: "pellichupulu.jpg" },
    { title: "Evarevaro", src: "Evarevaro.mp3", img: "Animal.jpg" },
    { title: "Adigaa", src: "Adigaa.mp3", img: "Hi nanna.jpg" },
    
];

let currentSongIndex = 0;
let isDragging = false;  // Prevent updates while dragging the progress bar
const audioPlayer = document.getElementById("audio-player");
const playPauseBtn = document.getElementById("play-pause-btn").querySelector('i'); // Select the icon element inside the button
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const songTitle = document.getElementById("song-title");
const progressBar = document.getElementById("progress-bar");
const albumArt = document.getElementById("album-art");

// Load initial song
function loadSong(songIndex) {
    audioPlayer.src = songs[songIndex].src;
    songTitle.innerText = songs[songIndex].title;
    albumArt.src = songs[songIndex].img;
    progressBar.value = 0;
}

// Play or Pause functionality
playPauseBtn.addEventListener("click", () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.classList.remove('bi-play-circle-fill');
        playPauseBtn.classList.add('bi-pause-circle-fill');
    } else {
        audioPlayer.pause();
        playPauseBtn.classList.remove('bi-pause-circle-fill');
        playPauseBtn.classList.add('bi-play-circle-fill');
    }
});

// Next song functionality
nextBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playPauseBtn.classList.remove('bi-play-circle-fill');
    playPauseBtn.classList.add('bi-pause-circle-fill');
});

// Previous song functionality
prevBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playPauseBtn.classList.remove('bi-play-circle-fill');
    playPauseBtn.classList.add('bi-pause-circle-fill');
});

// Update progress bar every 250ms
setInterval(() => {
    if (!isDragging && !audioPlayer.paused) {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = progress;
    }
}, 250);

// Seek functionality
progressBar.addEventListener("input", (e) => {
    isDragging = true;
    const seekTime = (e.target.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
});

progressBar.addEventListener("change", () => {
    isDragging = false;
});

// Automatically load the first song
loadSong(currentSongIndex);

// Update play/pause button when the song ends
audioPlayer.addEventListener("ended", () => {
    playPauseBtn.classList.remove('bi-pause-circle-fill');
    playPauseBtn.classList.add('bi-play-circle-fill');
});
