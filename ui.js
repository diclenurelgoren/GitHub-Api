class UI {
    constructor() {
        this.profilediv = document.getElementById("profile");
        this.reposdiv = document.getElementById("repos");
        this.lastuser = document.getElementById("last-users");
        this.input = document.getElementById("githubname");
        this.cardboyd = document.querySelector(".card-body");
    }

    clearinput() {
        this.input.value = "";
    }

    infodelete() {
        this.profilediv.innerHTML = "";
        this.reposdiv.innerHTML = "";
    }

    showinfouser(username) {
        this.profilediv.innerHTML = `<div class="card card-body mb-3">
        <div class="row">
          <div class="col-md-4">
            <a href="${username.html_url}" target = "_blank">
             <img class="img-fluid mb-2" src="${username.avatar_url}"> </a>
             <hr>
             <div id="fullName"><strong>${username.name}</strong></div>
             <hr>
             <div id="bio">${username.bio}</div>
            </div>
          <div class="col-md-8">
                <button class="btn btn-secondary">Takipçi
                 <span class="badge badge-light">${username.followers}</span> 
                </button>
                <button class="btn btn-info">Takip Edilen
                 <span class="badge badge-light">${username.following}</span> 
                  </button>
                <button class="btn btn-danger">Repolar<span class="badge badge-light">${username.public_repos}</span>
                </button>
                <hr>
                <li class="list-group">
                    <li class="list-group-item borderzero">
                        <img src="images/company.png" width="30px"> <span id="company">${username.company}</span>
                        
                    </li>
                    <li class="list-group-item borderzero">
                        <img src="images/location.png" width="30px"> <span id = "location">${username.location}</a>
                        
                    </li>
                    <li class="list-group-item borderzero">
                        <img src="images/mail.png" width="30px"> <span id="mail">${username.email}</span>
                        
                    </li>
                </div>
          </div>
    </div>
           
           `;
    }
    showeror(type, message) {

        const div = document.createElement("div");

        div.className = `alert alert-${type}`;
        div.textContent = message;

        this.cardboyd.appendChild(div);

        setTimeout(function () {
            div.remove();
        }, 2000)
    };

    showrepos(repo) {
        this.reposdiv.innerHTML = "";

        repo.forEach(repos => {
            this.reposdiv.innerHTML += `
            <div class="mb-2 card-body">
                      <div class="row">
                          <div class="col-md-2">
                          <a href="${repos.html_url}" target = "_blank" id = "repoName">${repos.name}</a>
                          </div>
                          <div class="col-md-6">
                              <button class="btn btn-secondary">
                                  Starlar  <span class="badge badge-light" id="repoStar">${repos.stargazers_count}</span>
                              </button>
  
                              <button class="btn btn-info">
                                  Forklar  <span class="badge badge-light" id ="repoFork">${repos.fork}</span>
                              </button>
                      
                          </div>
                  </div>
  
                  </div>
            
            `;
        });


    }
    addsearchuserui(username) {
        let users = Storage.getAllsearchformstorage();

        if (users.indexOf(username) === -1) {
            const li = document.createElement("li");

            li.className = "list-group-item";
            li.textContent = username;

            this.lastuser.appendChild(li);

        }

    }

    clearallSearchedui() {
        while (this.lastuser.firstElementChild !== null) {
            this.lastuser.removeChild(this.lastuser.firstElementChild);
        }
    }

}