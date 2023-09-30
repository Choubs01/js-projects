let saveEl = document.getElementById("save-el")
let countEl = document.getElementById("count-el")
let count = 0
let countSaveCalls = 0

function increment() {
    count += 1
    countEl.textContent = count
}

function save() {
    let countStr = countSaveCalls == 0 ? " " + count + "." : " - " + count + "."
    saveEl.textContent = saveEl.textContent.slice(0, -1)
    saveEl.textContent += countStr
    countEl.textContent = 0
    count = 0
    countSaveCalls++
}

function reset(){
    saveEl.textContent = "Previous entries: "
    countEl.textContent = 0
    count = 0
    countSaveCalls = 0
}
