import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appConfig = {
    databaseURL: "https://mobile-app-9b311-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appConfig)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    clearInputFieldEl()

    push(shoppingListInDB, inputValue)
})

onValue(shoppingListInDB, function(snapshot){  // Triggered whenever the database is modified
    if (snapshot.exists()){
        clearShoppingListEl()
        let itemsArray = Object.entries(snapshot.val())

        for(let item of itemsArray){
            appendItemToShoppingList(item)
        }
    }else {
        shoppingListEl.innerHTML = ""
    }
})

function appendItemToShoppingList(item){
    let itemId = item[0]
    let itemValue = item[1]

    let listElement = document.createElement("li")
    listElement.textContent = itemValue
    shoppingListEl.append(listElement)

    listElement.addEventListener("click", function(){
        let locationOfItemInDB = ref(database, `shoppingList/${itemId}`)
        remove(locationOfItemInDB)
    })
}

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}
function clearInputFieldEl() {
    inputFieldEl.value = ""
}