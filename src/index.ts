/* non.js */

//import { builtinModules } from "module";

const GITHUB_API              = "https://api.github.com/repos";
const GITHUB_API_REPOS        = "/repos";
const GITHUB_API_CONTENTS     = "/contents";

const EXT_MD                  = ".md";
const EXT_MKD                 = ".mkd";


module.exports.GitHub = function (user: string, repo: string) {

  this.user = user;
  this.repo = repo;

  this.render = function() {

  } // render


  this.articles = function() {

    console.log(`$(GITHUB_API)$(GITHUB_API_REPOS)/$(this.user)/$(this.repo)$(GITHUB_API_CONTENTS)`);

    fetch(`$(GITHUB_API)$(GITHUB_API_REPOS)/$(this.user)/$(this.repo)$(GITHUB_API_CONTENTS)`)
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

          main.appendChild(p);

        }

      });

    })
    .catch((error) => console.log(error));

  } // articles

} // GitHub
