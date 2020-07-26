(function () {
  const docEl = document.documentElement
  let DPR = window.devicePixelRatio
  let viewEl = document.querySelector('meat[name="viewport"]')

  DPR = DPR > 3 ? 3 : DPR > 2 ? 2 : 1

  docEl.setAttribute('data-dpr', DPR)

  var scale = 1 / DPR
  var content = 'width=device-width,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale + ',user-scalable=no'

  if (viewEl) {
    viewEl.setAttribute('content', content)
  } else {
    viewEl = document.createElement('meta')
    viewEl.setAttribute('name', 'viewport')
    viewEl.setAttribute('content', content)
    document.head.appendChild(viewEl)
  }
  function setRem () {
    const RATIO = 37.5
    const WIDTH = docEl.clientWidth

    docEl.style.fontSize = WIDTH / RATIO + 'px'
  }

  setRem()

  window.addEventListener('resize', function () {
    setRem()
  })
})()
