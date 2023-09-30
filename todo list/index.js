let data = []
const ulEl = document.getElementById("ul-el")
const clearBtn = document.getElementById("clear-btn")
const dataFromLocalStorage = JSON.parse(localStorage.getItem("myData"))
const tabBtn = document.getElementById("tab-btn")

if (dataFromLocalStorage) {
    data = dataFromLocalStorage
    render(data)
}

tabBtn.addEventListener("click", function(){    
    browser.tabs.query({active: true, currentWindow: true}, function(tabs){
        data.push(tabs[0].url)
        localStorage.setItem("myData", JSON.stringify(data) )
        render(data)
    })
})

function render(data) {
    let listItems = ""
    for (let i = 0; i < data.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${data[i]}'>
                    ${data[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

clearBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    data = []
    render(data)
})