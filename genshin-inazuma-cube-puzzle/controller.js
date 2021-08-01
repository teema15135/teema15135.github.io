const SQUARE_SIZE = 5
const NODE_VALUE_MAX = 3

const START_NODE_DESCRIPTION = `Please click "Link" button on hit node`
const AFFECT_NODE_DESCRIPTION = `Please click "Link" button on second node`

var linkMode = false
var toLinkTo = null

function createTable() {
    let table = document.createElement("table")
    for (let i = 0; i < SQUARE_SIZE; i++) {
        table.appendChild(createRow())
    }
    return table
}

function createRow() {
    let row = document.createElement("tr")
    for (let i = 0; i < SQUARE_SIZE; i++) {
        row.appendChild(createCell())
    }
    return row
}

function createCell() {
    let td = document.createElement("td")
    td.className = "node"

    let valueSpan = document.createElement("span")
    valueSpan.innerHTML = "&nbsp;"

    let hitButton = document.createElement("button")
    hitButton.className = "hit-button"
    hitButton.textContent = "Hit!"
    hitButton.onclick = () => {
        onClickNode(td)
    }

    let addButton = document.createElement("button")
    addButton.className = "add-button"
    addButton.textContent = "Add"
    addButton.onclick = () => {
        addPuzzleValueToCell(td)
    }

    let linkButton = document.createElement("button")
    linkButton.className = "link-button"
    linkButton.textContent = "Link!"
    linkButton.onclick = () => {
        linkNode(td)
    }

    td.appendChild(addButton)
    td.appendChild(hitButton)
    td.appendChild(valueSpan)
    td.appendChild(linkButton)
    td.puzzleValue = null
    td.affectCells = []

    return td
}

function updateUI() {
    document.querySelectorAll(".node").forEach(cell => {
        if (cell.puzzleValue != null) {
            cell.querySelector("span").innerHTML = cell.puzzleValue + 1
        }
    })
}

function onClickNode(cell) {
    increaseValue(cell)
    cell.affectCells.forEach(affectCell => {
        increaseValue(affectCell)
    })
    updateUI()
}

function addPuzzleValueToCell(cell) {
    cell.puzzleValue = 0
    cell.className += " active"
    updateUI()
}

function linkNode(cell) {
    if (toLinkTo == cell) return

    if (toLinkTo)
        setLinkTo(cell)
    else
        setLinkStart(cell)

    updateLinkBorderColor()
    updateLinkDescription()
}

function setLinkStart(cell) {
    toLinkTo = cell
}

function setLinkTo(cell) {
    if (toLinkTo.affectCells.includes(cell))
        toLinkTo.affectCells = toLinkTo.affectCells.filter(affectCell => {
            console.log(cell, affectCell, cell != affectCell)
            return cell != affectCell
        })
    else
        toLinkTo.affectCells.push(cell)
}

function updateLinkBorderColor() {
    resetLinkBorderColor()
    if (!toLinkTo) return
    toLinkTo.className = "node active start-border"
    toLinkTo.affectCells.forEach(cell => {
        cell.className = "node active affect-border"
    })
}

function resetLinkBorderColor() {
    document.querySelectorAll(".node.active").forEach(cell => {
        cell.className = "node active"
    })
}

function increaseValue(cell) {
    let increasedValue = getIncreasedValue(cell.puzzleValue)
    cell.puzzleValue = increasedValue
}

function getIncreasedValue(value) {
    return (value + 1) % NODE_VALUE_MAX
}

function newTable() {
    document.querySelector(".table-container").innerHTML = ""
    document.querySelector(".table-container").appendChild(createTable())
}

function updateLinkDescription() {
    if (linkMode)
        document.querySelector(".link-description span").textContent = toLinkTo ? AFFECT_NODE_DESCRIPTION : START_NODE_DESCRIPTION
    else
        document.querySelector(".link-description span").textContent = ""
}

function addListeners() {
    document.querySelector("#link-mode").addEventListener("change", event => {
        linkMode = event.target.checked
        updateLinkDescription()
        if (linkMode) {
            document.querySelector("section").className = "link-active"
        } else {
            document.querySelector("section").className = ""
            toLinkTo = null
        }
    })
    document.querySelector("#reset-link-button").addEventListener("click", () => {
        toLinkTo = null
        updateLinkDescription()
        updateLinkBorderColor()
    })
}

document.onreadystatechange = () => {
    newTable()
    addListeners()
}