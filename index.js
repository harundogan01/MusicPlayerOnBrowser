const music = document.querySelector('audio')
const musicControl = document.querySelector('.playerDiv')
const image = document.querySelector('img')
const songField = document.getElementById('song')
const singer = document.getElementById('singer')
const progressDiv = document.getElementById('progressDiv')
const progress = document.getElementById('progress')
const current = document.getElementById('currentTime')
const totalTime = document.getElementById('totalTime')
let isPlaying = false;
let songIndex = 0

const objInfo = [
    {
        song: 'Hush Hush',
        singer: 'Alexandra Stan',
        file: 'alexandra'
    },
    {
        song: 'Left Right',
        singer: 'Inna',
        file: 'inna'
    }
]

function loadSong(song) {
    music.src = `music/${song.file}.mp3`
    image.src = `img/${song.file}.jpg`
    songField.textContent = `${song.song}`
    singer.textContent = `${song.singer}`
}
loadSong(objInfo[songIndex])

function playSong() {
    isPlaying = true
    musicControl.children[1].children[0].classList.replace('fa-play', 'fa-pause')
    music.play()
}

function pauseSong() {
    isPlaying = false
    musicControl.children[1].children[0].classList.replace('fa-pause', 'fa-play')
    music.pause()
}

function playPrev() {
    if (songIndex === 0)
        songIndex++
    else
        songIndex--
    loadSong(objInfo[songIndex])
    playSong()
}

function playNext() {
    if (songIndex === 1)
        songIndex--
    else
        songIndex++
    loadSong(objInfo[songIndex])
    playSong()
}

function setProgressBar(e) {
    const width = e.srcElement.clientWidth
    const { duration } = music
    const clickX = e.offsetX
    music.currentTime = (clickX / width) * duration
}

function updateProgressBar(e) {
    if (isPlaying) {
        const { currentTime, duration } = e.srcElement
        const progressPercent = Math.floor((currentTime / duration) * 100)
        progress.style.width = `${progressPercent}%`
        const durationMinutes = Math.floor(duration / 60)
        let durationSeconds = Math.floor(duration % 60)
    
        if (durationSeconds < 10)
            durationSeconds = `0${durationSeconds}`
        if (durationSeconds)
            totalTime.textContent = `${durationMinutes}:${durationSeconds}`

        const currentMinutes = Math.floor(currentTime / 60)
        let currentSeconds = Math.floor(currentTime % 60)

        if (currentSeconds < 10)
            currentSeconds = `0${currentSeconds}`
        if (currentSeconds) {
            current.textContent = `${currentMinutes}:${currentSeconds}`
        }
    }
}

musicControl.children[0].children[0].addEventListener('click', playPrev)
musicControl.children[1].children[0].addEventListener('click', () => isPlaying ? pauseSong() : playSong())
musicControl.children[2].children[0].addEventListener('click', playNext)
music.addEventListener('ended', playNext)
music.addEventListener('timeupdate', updateProgressBar)
progressDiv.addEventListener('click', setProgressBar)