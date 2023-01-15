# design

+ import mkdown to html
+ html and css are stored to github pages repository
+ markdown pages can be stored in the same github page repository or different, but raw pages need to be accessible
+ page designers have full control of modifying the look and feel
+ all page data stored in memory on the client side, view can be manipulated, this allows for different skins for web page content
+ a separate library can be used to manipulate this content
+ there will be limitations with this approach since this uses github api's which are rate limited !Update, this has been resolved by using a meta.json file which essentially indexes all the files

## interface

+ github repo, gets all markdown files, stores contents to an array.


## flow

+ user adds or updates markdown files and commits into repo
+ repo has a github action upon commit to create index file (meta.json)
+ this repo must have github pages enabled
+ mkdown will download meta index file which contains names of files and meta information like creation date
+ mkdown should download all articles and store in client browser memory
+ mkdown has a callback to update page view with articles
* meta.json is updated by a github action, since this happens automatically on the remote repo, users will have to `git pull` or else will have conflicts with checkins as their repo is out of date

## background

* content creators can focus solely on creating content with simple to use markdown syntax, this content can be shared and downloaded easily
