const background = document.getElementById('background')
const thumbnail = document.getElementById('thumbnail')

const song = document.getElementById('song') // audio object

const songArtist = document.getElementsByClassName('song-artist')[0]
const songTitle = document.getElementsByClassName('song-title')[0]
const progressBar = document.getElementById('progress-bar')
const pPause = document.getElementById('play-pause')
const nextBtn = document.getElementById('next-song')
const prevBtn = document.getElementById('previous-song')



let artists = [
    'Shawn Mendes, Camila Cabello',
    'Bích Phương',
    'Âm Khuyết Thi Thính',
    'AMEE'
]

let titles = [
    'Señorita',
    'Một cú lừa',
    'Mang chủng',
    'Yêu thì yêu không yêu thì yêu'
]

let songs = [
    './assets/music/Senorita - Shawn Mendes_ Camila Cabello.mp3',
    './assets/music/Mot Cu Lua - Bich Phuong.mp3',
    './assets/music/Mang Chung - Am Khuyet Thi Thinh_ Trieu.mp3',
    './assets/music/Yeu Thi Yeu Khong Yeu Thi Yeu - AMEE.mp3'
]

let covers = [
    './assets/cover/106207.jpg',
    './assets/cover/121626.jpg',
    './assets/cover/105542.jpg',
    './assets/cover/122486.jpg'
]

// Indicate whether the player is playing or paused
let playing = true

function playPause() {
    if (playing) {
        pPause.src = './assets/icon/icons8-pause-64.png'

        song.play()
    } else {
        pPause.src = './assets/icon/icons8-play-64.png'

        song.pause()
    }
    playing = !playing
}

let songIndex = 0

nextBtn.onclick = nextSong
prevBtn.onclick = previousSong

function nextSong() {
    songIndex++;
    // if the current index goes beyond the songs array
    // reset to the first position
    if (songIndex >= songs.length) {
        songIndex = 0;
    }
    song.src = songs[songIndex]
    thumbnail.src = covers[songIndex]
    background.src = covers[songIndex]

    songArtist.innerText = artists[songIndex]
    songTitle.innerText = titles[songIndex]

    // play imediately after changing song
    playing = true
    playPause()
}

function previousSong() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }

    song.src = songs[songIndex]
    thumbnail.src = covers[songIndex]
    background.src = covers[songIndex]

    songArtist.innerText = artists[songIndex]
    songTitle.innerText = titles[songIndex]

    // play imediately after changing song
    playing = true
    playPause()
}

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60)
    // let seconds = seconds % 60
    seconds = Math.floor(seconds - minutes * 60)
    if (seconds < 10) {
        seconds = `0${seconds}`
    }
    return `${minutes}:${seconds}`
}

function updateProgressValue() {
    progressBar.max = song.duration
    progressBar.value = song.currentTime

    document.querySelector('.currentTime').innerHTML = formatTime(Math.floor(song.currentTime))

    if (document.querySelector('.durationTime').innerHTML === 'NaN:NaN') {
        document.querySelector('.durationTime').innerHTML = '0:00'
    } else {
        document.querySelector('.durationTime').innerHTML = formatTime(Math.floor(song.duration))
    }
}

setInterval(updateProgressValue, 500);

function changeProgressBar() {
    song.currentTime = progressBar.value
}

progressBar.onchange = changeProgressBar
