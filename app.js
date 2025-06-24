const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");
let list = JSON.parse(localStorage.getItem("list")) || [];

list.forEach(task => {
    toDoList(task);
});

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    toDoList();
});

function toDoList(task) {
    let newTask = inputEl.value;
    if (task) {
        newTask = task.name;
    }

    if (newTask === "") return;

    const liEl = document.createElement("li");
    if (task && task.checked) {
        liEl.classList.add("checked");
    }

    const spanEl = document.createElement("span");
    spanEl.innerText = newTask;
    liEl.appendChild(spanEl);

    const checkBtnEl = document.createElement("div");
    checkBtnEl.innerHTML = `<i class="fa-solid fa-check-square"></i>`;
    liEl.appendChild(checkBtnEl);

    const trashBtnEl = document.createElement("div");
    trashBtnEl.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    liEl.appendChild(trashBtnEl);

    ulEl.appendChild(liEl);
    inputEl.value = "";

    checkBtnEl.addEventListener("click", () => {
        liEl.classList.toggle("checked");
        updateLocalStorage();
    });

    trashBtnEl.addEventListener("click", () => {
        liEl.remove();
        updateLocalStorage();
    });

    updateLocalStorage();
}

function updateLocalStorage() {
    const liEls = document.querySelectorAll("li");
    list = [];

    liEls.forEach(liEl => {
        const taskName = liEl.querySelector("span").innerText;
        list.push({
            name: taskName,
            checked: liEl.classList.contains("checked")
        });
    });

    localStorage.setItem("list", JSON.stringify(list));
}
