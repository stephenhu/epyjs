# design

+ import mkdown to html
+ html and css are stored to github pages repository
+ markdown pages are stored to the same github page repository as html and css
+ page designers have full control of modifying the look and feel
+ all page data stored in memory on the client side
+ a separate library can be used to manipulate this content
+ there will be limitations with this approach since this uses github api's which are rate limited

## interface

+ github repo, gets all markdown files, stores contents to an array.
+  


## flow

+ user adds or updates markdown files and commits into repo
+ repo has a github action upon commit to create index file (meta.json)
+ this repo must have github pages enabled
+ mkdown will download meta index file which contains names of files and meta information like creation date
+ mkdown should download all articles and store in memory
+ mkdown has a callback to update page view with articles