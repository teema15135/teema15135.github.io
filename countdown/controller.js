const COUNT_TO = 1634908500000 + ((new Date()).getTimezoneOffset() * 60 * 1000)


function updateText(day, hour, minute, second) {
    showTimeText()
    document.querySelector(".day.time").textContent = day
    document.querySelector(".day.label").textContent = day > 1 ? "Days" : "Day"
    document.querySelector(".hour.time").textContent = hour
    document.querySelector(".hour.label").textContent = hour > 1 ? "Hours" : "Hour"
    document.querySelector(".minute.time").textContent = minute
    document.querySelector(".minute.label").textContent = minute > 1 ? "Minutes" : "Minute"
    document.querySelector(".second.time").textContent = second
    document.querySelector(".second.label").textContent = second > 1 ? "Seconds" : "Second"
}

function showTimeComplete() {
    if (!document.querySelector(".time-text").className.includes("gone"))
        document.querySelector(".time-text").className += " gone"
    document.querySelector(".time-complete").className =
        document.querySelector(".time-complete")
            .className
            .split(" ")
            .filter(className => className != "gone")
            .join(" ")
}

function showTimeText() {
    if (!document.querySelector(".time-complete").className.includes("gone"))
        document.querySelector(".time-complete").className += " gone"
    document.querySelector(".time-text").className =
        document.querySelector(".time-text")
            .className
            .split(" ")
            .filter(className => className != "gone")
            .join(" ")
}

function getTimeLeft() {
    let left = Math.floor((COUNT_TO - Date.now()) / 1000)
    if (left < 0) return false
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

function getTimeAndUpdateText() {
    let timeLeft = getTimeLeft()
    if (timeLeft == false) showTimeComplete()
    else updateText(timeLeft.day, timeLeft.hour, timeLeft.minute, timeLeft.second)   
}

function main() {
    getTimeAndUpdateText()
    setInterval(() => {
        getTimeAndUpdateText()
    }, 1000)
}

main()