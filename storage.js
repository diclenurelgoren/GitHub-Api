class Storage {

    static getAllsearchformstorage() {
        let users;

        if (localStorage.getItem("search") == null) {
            users = [];
        }
        else {
            users = JSON.parse(localStorage.getItem("search"));
        }
        return users;
    }

    static addsearchformstorage(username) {

        let users = this.getAllsearchformstorage();

        if (users.indexOf(username) === -1) {
            users.push(username);
        }

        localStorage.setItem("search", JSON.stringify(users))
    }

    static clearallStorge() {
        localStorage.removeItem("search");
    }

    static deletetodostorage(deletetodo) {
        let delusers = this.getAllsearchformstorage();

        delusers.forEach(function (user, index) {
            if (user === deletetodo) {
                delusers.splice(index, 1);
            }
        });

        localStorage.setItem("search", JSON.stringify(delusers));
    }

}