const player = document.querySelector('.player')
const video = document.querySelector('.player__video')
const videoOverlay = document.querySelector('.player__overlay')
const progress = document.querySelector('.progress_player')
const progressBar = progress.querySelector('.progress__filled')
const volume = document.querySelector('.progress_volume')
const volumeBar = volume.querySelector('.progress__filled')
const btnToggle = document.querySelector('.player__btn.toggle')
const btnMute = document.querySelector('.player__btn.mute')
const btnFullScreen = document.querySelector('.player__btn.fullscreen')

const iconPlay  = `<svg xmlns="http://www.w3.org/2000/svg" width="23" height="31" viewBox="0 0 23 31">
                    <path fill="currentColor" d="M22.35 15.2417L0 0C0 22.971 0 11.6973 0 30.473L22.35 15.2417Z"/>
                  </svg>`
const iconPause = `<svg xmlns="http://www.w3.org/2000/svg" width="23" height="31" viewBox="0 0 23 31">
                    <path fill="currentColor" d="M13.143,31V0H23V31ZM0,31V0H9.857V31Z"/>
                  </svg>`
const iconSpeackerOff = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 31">
                          <g fill="#b3b3b3">
                            <path d="M17.86 0L3.63 10.767v8.938l14.23 10.768c-.03-22.973 0-11.697 0-30.473z"/>
                            <path d="M0 22.65h7.47V7.812H0zM29 17.621l-4.6 4.6-2.118-2.125 4.6-4.6-4.6-4.6 2.121-2.114 4.6 4.6 4.6-4.6 2.121 2.121-4.6 4.6 4.6 4.6-2.121 2.121z"/>
                          </g>
                        </svg>`
const iconSpeackerOn = `<svg xmlns="http://www.w3.org/2000/svg" width="38" height="31" viewBox="0 0 38 31">
                          <path fill="currentColor" d="M17.8599 0L3.62988 10.7673V19.7057L17.8599 30.473C17.8299 7.502 17.8599 18.7757 17.8599 0Z"/>
                          <path fill="currentColor" d="M0 22.6502H7.47V7.81152H0V22.6502Z"/>
                          <path fill="currentColor" d="M27.0001 30.1114C26.656 30.1122 26.3194 30.0077 26.0329 29.8108C25.7463 29.6141 25.5226 29.3338 25.3901 29.0058C25.2994 28.786 25.2515 28.5497 25.2491 28.3108C25.2468 28.0718 25.29 27.8348 25.3764 27.613C25.4628 27.3914 25.5906 27.1895 25.7525 27.0189C25.9144 26.8483 26.1073 26.7123 26.3201 26.6187C27.7345 25.9992 29.0185 25.1006 30.1001 23.9734C32.3329 21.6528 33.5874 18.5141 33.5901 15.2417C33.5794 11.9649 32.3139 8.82568 30.0701 6.51006C28.9864 5.38276 27.7032 4.48118 26.2901 3.8544C25.8628 3.66542 25.5252 3.30945 25.351 2.86417C25.1767 2.41891 25.18 1.9205 25.3601 1.47773C25.4464 1.25676 25.5747 1.05598 25.7376 0.887299C25.9004 0.718622 26.0944 0.585501 26.3081 0.49585C26.5217 0.406199 26.7506 0.361849 26.9812 0.365436C27.2117 0.369024 27.4392 0.420474 27.6501 0.51673C31.342 2.14459 34.2783 5.18981 35.8401 9.01073C36.6453 10.9718 37.0602 13.0804 37.0601 15.2108C37.0591 17.3399 36.6478 19.4475 35.8501 21.4107C35.0771 23.3086 33.9527 25.0321 32.5401 26.4844C31.1476 27.9661 29.4859 29.1495 27.6501 29.9668C27.4454 30.0606 27.2241 30.1099 27.0001 30.1114Z"/>
                          <path fill="currentColor" d="M23.6901 22.8162C23.3095 22.8156 22.9408 22.6792 22.6464 22.43C22.352 22.1808 22.15 21.8341 22.0747 21.4485C21.9993 21.063 22.0553 20.6625 22.2331 20.3148C22.4108 19.9671 22.6995 19.6934 23.0501 19.5405C23.8657 19.1823 24.5607 18.5833 25.0482 17.8187C25.5356 17.0539 25.7937 16.1575 25.7901 15.2418C25.7936 14.6207 25.6745 14.0053 25.4401 13.4335C25.2032 12.8782 24.8635 12.3762 24.4401 11.9558C24.0313 11.5206 23.5459 11.1699 23.0101 10.9225C22.6565 10.7185 22.3884 10.3866 22.2575 9.99059C22.1265 9.5946 22.142 9.16256 22.301 8.77766C22.4599 8.39277 22.751 8.08224 23.1182 7.90589C23.4855 7.72953 23.9029 7.69982 24.2901 7.82248C25.4626 8.34102 26.4951 9.14734 27.2978 10.1715C28.1006 11.1956 28.6494 12.4067 28.8967 13.6997C29.144 14.9926 29.0823 16.3284 28.7169 17.591C28.3516 18.8537 27.6936 20.0053 26.8001 20.9458C26.0943 21.6829 25.255 22.2692 24.3301 22.6715C24.1283 22.7637 23.9107 22.8129 23.6901 22.8162Z"/>
                        </svg>`

const skipTimeSec = 5
const increaseVolumeStep = 0.1
const playBackSpeedStep = 0.1
sessionStorage.setItem('videoVolume', 1)


const togglePlay = (e) => {
  e.preventDefault()
  let toggle
  if (video.paused) {
    toggle = 'play'
    videoOverlay.style.display = 'none'
  } else {
    toggle = 'pause'
    videoOverlay.style.display = 'flex'
  }
  video[toggle]()
}

const updateBtn = () => {
  btnToggle.innerHTML = video.paused ? iconPlay : iconPause
}

const handleProgress = () => {
  const percent = (video.currentTime / video.duration) * 100
  progressBar.style.width = `${percent}%`
}

const handleVolume = () => {
  volumeBar.style.width = `${video.volume * 100}%`
}

const scrub = (e) => {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = scrubTime
}

const skipTime = (value) => {
  video.currentTime += parseFloat(value)
}

const setVolume = (e) => {
  video.volume = e.offsetX / volume.offsetWidth
  sessionStorage.setItem('videoVolume', video.volume)
}

const increaseVolume = (e, value) => {
  e.preventDefault()
  let vol = video.volume + value
  if (vol < 0) vol = 0
  if (vol > 1) vol = 1
  video.volume = vol
  sessionStorage.setItem('videoVolume', video.volume)
}

const toggleFullScreen = () => {
  document.fullscreenElement === null ? video.requestFullscreen() : document.exitFullscreen()
}

const toggleMute = () => {
  video.muted = video.muted ? false : true
  video.muted ? video.volume = 0 : video.volume = sessionStorage.getItem('videoVolume')
  btnMute.innerHTML = video.muted ? iconSpeackerOff : iconSpeackerOn
}

const setPlayBackSpeed = (value) => {
  let speed = video.playbackRate + value
  if (speed < 0.5) speed = 0.5
  if (speed > 2) speed = 2
  video.playbackRate = speed
}

const seekNum = (e) => {
  const num = +e.code.match(/\d+$/)[0] * 10
  video.currentTime = num * video.duration / 100
}

const keyController = (e) => {
  switch (e.code) {
    case 'Space':
      togglePlay(e)
      break
    case 'KeyK':
      togglePlay(e)
      break
    case 'KeyM':
      toggleMute()
      break
    case 'KeyF':
      toggleFullScreen()
      break
    case 'Comma':
      setPlayBackSpeed(-playBackSpeedStep)
      break
    case 'Period':
      setPlayBackSpeed(playBackSpeedStep)
      break
    case 'ArrowLeft':
      skipTime(-skipTimeSec)
      break
    case 'ArrowRight':
      skipTime(skipTimeSec)
      break
    case 'ArrowDown':
      increaseVolume(e, -increaseVolumeStep)
      break
    case 'ArrowUp':
      increaseVolume(e, increaseVolumeStep)
      break
    case 'Digit1':
      seekNum(e)
      break
    case 'Digit2':
      seekNum(e)
      break
    case 'Digit3':
      seekNum(e)
      break
    case 'Digit4':
      seekNum(e)
      break
    case 'Digit5':
      seekNum(e)
      break
    case 'Digit6':
      seekNum(e)
      break
    case 'Digit7':
      seekNum(e)
      break
    case 'Digit8':
      seekNum(e)
      break
    case 'Digit9':
      seekNum(e)
      break
  }
}


videoOverlay.addEventListener('click', togglePlay)
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateBtn)
video.addEventListener('pause', updateBtn)
video.addEventListener('timeupdate', handleProgress)
video.addEventListener('volumechange', handleVolume)

btnToggle.addEventListener('click', togglePlay)

let mousedown = false
document.body.addEventListener('mouseup', () => mousedown = false)

progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
progress.addEventListener('mousedown', () => mousedown = true)

volume.addEventListener('click', setVolume)
volume.addEventListener('mousemove', (e) => mousedown && setVolume(e))
volume.addEventListener('mousedown', () => mousedown = true)

btnFullScreen.addEventListener('click', toggleFullScreen)

btnMute.addEventListener('click', toggleMute)

document.addEventListener('keydown', (e) => keyController(e))

console.log('%cСамопроверка задания:', 'color: green; font-size: 20px')
console.log('- [x] Первый этап. Повторить исходный проект (10/10)')
console.log('- [x] Второй этап. Обязательный дополнительный фукционал (shortkuts: Space, M, >, <, F) (10/10)')
console.log('- [x] Третий этап. Дополнительный фукционал (2) (10/10)')
console.log('   - [x] More shortkuts: K, ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Digit1-Digit9')
console.log('   - [x] мобильная версия')
console.log('%cИтого: ', 'color: green;', '30/30 👌😉')
