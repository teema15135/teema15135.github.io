const COUNT_TO = 1632502800000 + ((new Date()).getTimezoneOffset() * 60 * 1000)


function updateText(day, hour, minute, second) {
    document.querySelector(".day.time").textContent = day
    document.querySelector(".day.label").textContent = day > 1 ? "Days" : "Day"
    document.querySelector(".hour.time").textContent = hour
    document.querySelector(".hour.label").textContent = hour > 1 ? "Hours" : "Hour"
    document.querySelector(".minute.time").textContent = minute
    document.querySelector(".minute.label").textContent = minute > 1 ? "Minutes" : "Minute"
    document.querySelector(".second.time").textContent = second
    document.querySelector(".second.label").textContent = second > 1 ? "Seconds" : "Second"
}

function getTimeLeft() {
    let left = Math.floor((COUNT_TO - Date.now()) / 1000)
    let second = left % 60
    let minute = Math.floor(left / 60) % 60
    let hour = Math.floor(left / 3600) % 24
    let day = Math.floor(left / 86400)
    return {
        day,
        hour,
        minute,
        second,
    }
}

function main() {
    let timeLeft = getTimeLeft()
    updateText(timeLeft.day, timeLeft.hour, timeLeft.minute, timeLeft.second)
    setInterval(() => {
        let timeLeft = getTimeLeft()
        updateText(timeLeft.day, timeLeft.hour, timeLeft.minute, timeLeft.second)
    }, 1000)
}

main()