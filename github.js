class Github {
    constructor() {
        this.url = "https://api.github.com/users/";
    }

    async getGithubData(username) {
        const responseuser = await fetch(this.url + username);
        const responsrepo = await fetch(this.url + username + "/repos");


        const userdata = await responseuser.json();
        const repodata = await responsrepo.json();

        return {
            user: userdata,
            repo: repodata
        }
    }
}