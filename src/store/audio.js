
let defaultSrc = 'http://localhost:8080/music/theSoundofSilence.mp3'
let defaultCoverImg = 'http://p2.music.126.net/ifFe6G6O9SS0mPeZXJDsrA==/109951163860953356.jpg?param=130y130'
let defaultTitle = 'The Sound of Silence'
let defaultSinger = 'Pentatonix'
try {
  if (localStorage.getItem) {
    defaultSrc = localStorage.getItem('audioSrc')
    defaultCoverImg = localStorage.getItem('coverImg')
    defaultTitle = localStorage.getItem('title')
    defaultSinger = localStorage.getItem('singer')
  }
} catch (e) {}

export default {
  src: defaultSrc,
  coverImg: defaultCoverImg,
  title: defaultTitle,
  singer: defaultSinger
}
