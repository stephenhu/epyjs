# brainstorm

+ focused on blogging
+ simple framework, html, css, and markdown is all that's required
+ markdown files are stored to some service like github, s3, etc
+ download an index file with a list of markdown or other pages
+ download each markdown page
+ render based on local env layout
+ adapters to work with different services, github, s3, etc
+ cli to generate template file?
+ conceptually a way to allow non-coding people to use this
+ focus on styling and look and feel, documentation on how to modify look and feel
+ index page gets forked from github, though the name will be in conflict
+ use github pages to host which allows for dns

## todo

+ since things are not cached, the performance will be bad, it will be a new page load everytime.  cdn's basically will be bypassed, though i guess the contents will be stored to cdn, so it may not be that bad, the page rendering should be quick.

+ call it nonjs
