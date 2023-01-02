/* non.js */


export const GITHUB_API              = "https://api.github.com";
export const GITHUB_API_REPOS        = "/repos";
export const GITHUB_API_CONTENTS     = "/contents";

export const EXT_MD                  = ".md";
export const EXT_MKD                 = ".mkd";


export default class Github {

  private user: string;
  private repo: string;

  constructor(user: string, repo: string) {

    this.user = user;
    this.repo = repo;
  
  } // constructor


  render() {

  } // render


  articles() {

    fetch(GITHUB_API + GITHUB_API_REPOS + "/" + this.user + "/" + this.repo + GITHUB_API_CONTENTS)
    .then((res) => res.json())
    .then((data) => {

      console.log(data);
      console.log(data.length);

      var main = document.getElementById("main");

      data.forEach(function(item: any) {
        
        if(item.name.includes(EXT_MD) || item.name.includes(EXT_MKD)) {
          console.log(item.name);

          var p = document.createElement("p");

          p.innerText = item.name;

          if(main !== null) {
            main.appendChild(p);
          }

        }

      });

    })
    .catch((error) => console.log(error));

  } // articles

} // Github
