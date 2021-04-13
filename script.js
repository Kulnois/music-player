const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const auido = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')
const volumentBtn = document.querySelector('#volument')
const muteBtn = document.querySelector('#mute')

const progressContainerVolume = document.querySelector('.progress-container-volume')
const progressVolume = document.querySelector('.progress-volume')

const songs = [{name: 'goodbye', title: 'Linko - Goodbye'}, {name:'distodd', title:'DISTO & Todd Helder - DISTODD'}, 
                {name:'freaky', title:'Hush - Freaky'}, {name:'higher', title:'Hoober - Higher'}]

let songIndex = 2

let volument = 1

loadSong(songs[songIndex])

function loadSong(song) {
    title.innerHTML = song.title
    auido.src = `music/${song.name}.mp3`
    cover.src = `images/${song.name}.jpg`
    document.title = `Music Player - ${song.title}`

}

function playSong() {
    musicContainer.classList.add('play')
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')


    auido.play()
    auido.volume = volument
    hideMenuVolument()
}

function puaseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    
    auido.pause()
    hideMenuVolument()
}

function prevSong() {
    songIndex--

    if(songIndex < 0) {
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex])
    playSong()
}

function nextSong() {
    songIndex++

    if(songIndex > songs.length - 1) {
        songIndex = 0
    }

    loadSong(songs[songIndex])
    playSong()
}

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPrecent = (currentTime / duration) * 100
    progress.style.width = `${progressPrecent}%`

}

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

function setVolument(e) {
    const clickX = e.offsetY
    const progressPrecent = (clickX / 72) * 100
    progressVolume.style.height = `${progressPrecent}%` 
    volument = progressPrecent  / 100
    muteBtn.querySelector('i.fas').classList.remove('fa-volume-off')
    muteBtn.querySelector('i.fas').classList.add('fa-volume-up')
    if (audio) audio.volume = progressPrecent / 100
}


playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')

    if (isPlaying) {
        puaseSong()
    } else {
        playSong()
    }
})

volumentBtn.addEventListener('click', () => {
    const isVolumentShow = musicContainer.classList.contains('volume')

    if (isVolumentShow) {
        musicContainer.classList.remove('volume')
    } else {
        musicContainer.classList.add('volume')
    }
})

muteBtn.addEventListener('click', () => {
    const isMute = muteBtn.querySelector('i.fas').classList.contains('fa-volume-up')
    if (isMute) {
        auido.volume = 0
        muteBtn.querySelector('i.fas').classList.remove('fa-volume-up')
        muteBtn.querySelector('i.fas').classList.add('fa-volume-off')
    } else {
        auido.volume = volument
        muteBtn.querySelector('i.fas').classList.remove('fa-volume-off')
        muteBtn.querySelector('i.fas').classList.add('fa-volume-up')
    }

})

function hideMenuVolument() {
    const isVolumentShow = musicContainer.classList.contains('volume')
    if (isVolumentShow) {
        musicContainer.classList.remove('volume')
    }
}

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)

progressContainerVolume.addEventListener('click', setVolument)