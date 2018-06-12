window.onload = () => {

  // get time for countdown from url parameters
  var urlString = window.location.href
  var url = new URL(urlString)
  var timeParam = url.searchParams.get('time')
  var offsetParam = url.searchParams.get('offset')

  var timerTime = parseInt(timeParam, 10)
  var offsetTime = parseInt(offsetParam, 10)

  offsetTime = offsetTime !== null && offsetTime >= 0 ? offsetTime * 1000 : 10 * 1000

  // check
  if(timeParam === null || timerTime <= 0) {
    var error = createWithClass('div', 'error')
    setTextValue(error, 'Invalid url parameter for countdown')
    document.getElementById('container').appendChild(error)
  }

  // create timer
  var timer = createWithClass('div', 'timerContainer')
  var minutes = createWithClass('div', 'minutes')
  var divider = createWithClass('div', 'divider')
  var seconds = createWithClass('div', 'seconds')

  setTextValue(divider, ':')
  setTimerValues(timerTime, minutes, seconds)

  timer.appendChild(minutes)
  timer.appendChild(divider)
  timer.appendChild(seconds)
  document.getElementById('container').appendChild(timer)

  setTimeout(() => {
    var startTime = new Date().getTime()
    var goalTime = startTime + timerTime * 1000

    var interval = setInterval(() => {

      var now = new Date().getTime()
      var diff = goalTime - now

      if(diff < 0) {
        clearInterval(interval)
        return
      }

      var remainingSeconds = Math.floor(diff / 1000)
      setTimerValues(remainingSeconds, minutes, seconds)

    }, 100)
  }, offsetTime)

}

var createWithClass = (type, className) => {
  var el = document.createElement(type)
  el.classList.add(className)
  return el
}

var setTextValue = (el, value) => el.textContent = value

var values = (time) => {
  var minutes = Math.floor(time / 60)
  var seconds = time % 60

  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds

  return {
    minutes: minutes,
    seconds: seconds
  }
}

var setTimerValues = (remainingSeconds, minutes, seconds) => {
  var timerValues = values(remainingSeconds)
  setTextValue(minutes, timerValues.minutes)
  setTextValue(seconds, timerValues.seconds)
}
