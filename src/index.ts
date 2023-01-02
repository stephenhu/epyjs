/* non.js */


export const GITHUB_API              = "https://api.github.com";
export const GITHUB_API_REPOS        = "/repos";
export const GITHUB_API_CONTENTS     = "/contents";

export const EXT_MD                  = ".md";
export const EXT_MKD                 = ".mkd";


export default class Github {

  private user:         string;
  private repo:         string;
  private articles:     string[];

  constructor(user: string, repo: string) {

    this.user = user;
    this.repo = repo;

    this.articles = [];
  
  } // constructor


  apiList(): string {
    return GITHUB_API + GITHUB_API_REPOS + "/" + this.user + "/" + this.repo + GITHUB_API_CONTENTS; 
  } // apiList


  apiContent(a: string): string {
    return GITHUB_API + GITHUB_API_REPOS + "/" + this.user + "/" + this.repo + GITHUB_API_CONTENTS + a;
  } // apiContent


  render(a: any) {

    fetch(this.apiContent(a))
      .then((res) => res.json())
      .then((data) => {
        console.log(atob(data.content));
      })
      .catch((err) => {
        console.log(err);
      });

  } // render


  getArticles() {

    fetch(this.apiList())
    .then((res) => res.json())
    .then((data) => {

      this.articles = data;

      var main = document.getElementById("main");

      for(let i = 0; i < this.articles.length; i++) {
        
        if(data[i].name.includes(EXT_MD) || data[i].name.includes(EXT_MKD)) {

          console.log(data[i].name);

          var p = document.createElement("p");

          p.innerText = data[i].name;

          this.render(data[i].name);

          if(main !== null) {
            main.appendChild(p);
          }

        }

      }

    })
    .catch((err) => console.log(err));

  } // getArticles

} // Github
