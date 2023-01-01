/* epy.js */

const EXT_MARKDOWN        = ".md"

const ADAPTER_GITHUB      = 1
const ADAPTER_S3          = 2


class Non {

  constructor(adapter) {
    this.adapter = adapter;
  } // constructor
  
} // Non

/* github, s3 */
function register_adapter() {

} // register_adapter


function render_articles() {

} // render_articles


function read_index() {

  console.log("reading index");

  fetch("https://api.github.com/repos/stephenhu/blog-www/contents")
    .then((res) => res.json())
    .then((data) => {

      console.log(data);
      console.log(data.length);

      var main = document.getElementById("main");

      data.forEach(function(item) {
        
        if(item.name.includes(".md")) {
          console.log(item.name);

          var p = document.createElement("p");

          p.innerText = item.name;

          main.appendChild(p);

        }

      });

    })
    .catch((error) => console.log(error));

} // read_index
