# mkdown
 
mkdown is part of a fundamentally new static site architecture that focuses more directly on content creation and less on technical work surrounding the generation of static sites.  Typical static site architectures require some amount of coding, use of a command line tool, or learning about some obscure template language, with mkdown, users can just write content in markdown, save this to a github repository or s3 bucket, and focus on css/html to modify the look and feel.  This provides true separation of content and layout.

## build

1. `npm install`
1. `npm run build`
1. `npm run test`
1. `npm start` # Serve locally

_output files are stored to the `dist` directory._

## usage

mkdown can be added via cdn, there's also an npm package, but it's not tested.  add this javascript file to your html.

```
<script src="https://unpkg.com/mkdown@latest/dist/bundle.js">
```

to leverage this from your html file, add the following in your body

```
<body>
  <script>

  // assign export Github module from the window object
  
  var gh = new Github(
    "https://stephenhu.github.io/blog-www", "meta.json");

  gh.getIndex(addArticles);

  // callback function invoked as markdown is downloaded

  function addArticle(name) {

    // create html elements and set the article title and content

  } // addArticle

  </script>
</body>
```

