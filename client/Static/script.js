const path = "http://localhost:9020/"; // Путь к  серверу
//Константа для сортировки
const sortAsc = "asc"
const sortDesc = "desc"

// Получение текущего пути
let currentPath = document.getElementById('current-path').innerHTML

// Кнопка "Назад"
const goBackButton = document.getElementById('goback');
// Флаг для управления сортировкой
let flag = true
//История путей
let pathHistory = [currentPath];


//upload - загрузка данных при загрузке страницы
async function upload(currentPath,sortFlag) {
    let sort = sortAsc

    if (!sortFlag) {
        sort = sortDesc
    }


    await fetch(path + 'path?root=/home/' + currentPath.slice(1, -1)+ '&sort=' + sort, {
        method: "GET",
    })
        .then(response => response.json())
        .then(data => {
            let file_list = document.getElementById("new")
            file_list.innerHTML = ""
            data.forEach(element => {
                if (element["Type"] === "directory") {
                    console.log(element["Name"]);
                    file_list.innerHTML += ` <div class="file-block"><div class="dir">
                                                </div><div class="file-name"><a href="#" onclick="navigateToDirectory(event)">${element["Name"]}</a></div><div 
                                                class="size-num">${element["Size"]}</div></div>`
                }
                if (element["Type"] === "file") {
                    console.log(element["Name"]);
                    file_list.innerHTML += ` <div class="file-block"><div class="file"></div><div class="file-name">
                                                <a href="#">${element["Name"]}</a></div><div class="size-num-file">${element["Size"]}
                                                </div></div>`
                }
            });
        })
        .catch(error => console.error('Ошибка:', error));

}
//Вызов функции
upload(currentPath,flag)
//navigateToDirectory - для прохода вглубь директории при нажатии на неё
function navigateToDirectory(event) {
    let clickedElement = event.target;

    let currentPath = document.getElementById('current-path').textContent +"/"+ clickedElement.textContent + "/"

    document.getElementById('current-path').innerHTML = currentPath

    upload(currentPath,flag)
    JSON.parse()
    console.log(currentPath)
}
//backBut - Для возвращения назад по директории при нажатии кнопки назад
function backBut() {
    let currentPath = document.getElementById('current-path').textContent

    if (currentPath === "/") {
        alert("Это предел")
        return
    }

    let pathArray = currentPath.split('/');

    pathArray.pop();
    pathArray.pop();

    let newPath = pathArray.join('/') + "/";

    document.getElementById('current-path').innerHTML = newPath

    upload(newPath, flag)
}
//sort - для выбора сортировки asc/desc
function sort() {
    let currentPath = document.getElementById('current-path').textContent;
    flag = !flag; // Переключаем флаг при каждом вызове функции

    let buttonSort = document.querySelector(".button-sort");

    if (flag) {
        buttonSort.textContent = "asc"; // Устанавливаем текст на кнопке в зависимости от состояния сортировки
    } else {
        buttonSort.textContent = "desc"; // Устанавливаем текст на кнопке в зависимости от состояния сортировки
    }

    upload(currentPath, flag);
}