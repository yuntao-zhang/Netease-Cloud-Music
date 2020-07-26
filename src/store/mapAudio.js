export default function (state, data) {
  if (state.audio.src !== data.audioSrc || Boolean(state.audioPause) === true) {
    state.audio.coverImg = data.coverImg
    state.audio.src = state.currentAudiosrc = data.audioSrc
    state.audio.title = data.title
    state.audio.singer = data.singer
    state.audioToogle = !state.audioToogle
    try {
      for (const key in data) {
        localStorage.setItem(key, data[key])
      }
    } catch (error) {}
    // state.audioPlay = !state.audioPlay
  }
}
