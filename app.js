const gitform = document.getElementById("github-form");
const nameinput = document.getElementById("githubname");
const lastusers = document.getElementById("last-users");
const clearlastusers = document.getElementById("clear-last-users");
const lastsearch = document.getElementById("lastSearch");

const github = new Github();
const ui = new UI();

addeventlistener();

function addeventlistener() {

    gitform.addEventListener("submit", getdata);
    clearlastusers.addEventListener("click", clearallsearch);
    document.addEventListener("DOMContentLoaded", getallsearch);
    lastsearch.addEventListener("click", deletetodo);

}
function getdata(e) {
    username = nameinput.value.trim();
    if (username === "") {
        alert("Lütfen kullanıcı adını giriniz");
    }
    else {
        github.getGithubData(username)
            .then(response => {
                if (response.user.message === "Not Found") {
                    ui.showeror("danger", "Kullanıcı Bulunamadı");
                }
                else {
                    ui.addsearchuserui(username);
                    Storage.addsearchformstorage(username);
                    ui.showinfouser(response.user);
                    ui.showrepos(response.repo);
                    getallsearch();
                }
            })
            .catch(err => ui.showeror(err));
    }

    ui.clearinput();


    e.preventDefault();
}

function clearallsearch() {
    //Tüm kullanıcıları sil

    if (confirm("Son arananlar silinsin mi?")) {
        Storage.clearallStorge();
        ui.clearallSearchedui();
    }

}

function getallsearch() {
    //aramaları searchten al uiye ekle

    let users = Storage.getAllsearchformstorage();

    let result = "";
    users.forEach(user => {
        result += ` <li class="list-group-item d-flex justify-content-between"><a href = "#" class ="get-user">${user} </a>
        <a href = "#" class =""><i class="gg-close-o"></i></a>
       </li> `;
    });

    lastusers.innerHTML = result;


}

function deletetodo(e) {

    if (e.target.className === "gg-close-o") {
        e.target.parentElement.parentElement.remove();
        ui.showeror("success", "Başarıyla silindi...");
        Storage.deletetodostorage(e.target.parentElement.parentElement.textContent.trim());
        ui.infodelete();
    }
    if (e.target.className === "get-user") {
        console.log(e.target.textContent.trim());
        github.getGithubData(e.target.textContent.trim())
            .then(response => {
                ui.showinfouser(response.user);
                ui.showrepos(response.repo);
            })
            .catch(err => ui.showeror(err));
    }

}

