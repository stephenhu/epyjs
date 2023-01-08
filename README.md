# mkdown
 
library provides the ability to download markdown files from different sources like github or s3, these markdown files can then be used in client side rendering libraries which can then be used to change the layout or look and feel.

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
  
  const Github = window.default;
  const gh = new Github("username", "repo", ["README.md"]);

  // callback function invoked as markdown is downloaded

  function addArticle(name) {

    // create html elements and set the article title and content

  } // addArticle

  gh.getArticles(addArticle);

  </script>
</body>
```

