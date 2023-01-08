# brainstorm

+ focused on blogging
+ simple framework, html, css, and markdown is all that's required
+ markdown files are stored in some service like github, s3, etc
+ download an index file with a list of markdown or other pages or get a directory of files
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
+ ~~call it nonjs~~
+ ~~exclude certain markdown files like README.md, customizable, user can pass, or should it be fixed?~~
+ observability, bytes downloaded, progress bar


## github api

github api has a couple of issues, first it's rate limited so if you're creating a popular site then this could cause some issues, second github api makes it difficult to collect information about creation dates for git objects, this is needed when you are trying to get a the date of an article.

a workaround for this is to keep an index of all the articles, meta information about the articles, and this needs to be kept in a public place
like github.  access to this file can be accessed through raw.githubusercontent.com service, but this is blocked in china since it's s3 on the backend.  it seems that there's another link that allows access in china at the moment which is through https://github.com/user/repo/raw/main/filename, but this essentially redirects to raw.githubusecontent.com

in order for this to scale, there needs to be a solution that does not require usage of the github api.

### option 1

if an index file could be stored in a public location, this index file could keep all meta information along with exact download links to the files.  the challenge with this solution is that everytime a new file is added or modified, there needs to be an update of the index.  this conceptually could happen, but complicates the workflow slightly.  originally users would write markdown files, commit to a github repo, and everything else would work automatically.  now users would have to run some command line tool to update this state and also commit to github.

### option 2

screen scrape from the github project page, this would be subject to changes to the project page layout or meta information, you also wouldn't gain any meta information like modification or creation dates.  though this would make the entire process more automated.

### option 3

create a tool for static generation.  this would entirely be the hugo methodology except that you would write content in markdown, store this to git, and run this tool which would generate static content.

### option 4

a new markdown extension, markdown does not have a very fine grained way of managing the layout, most of this is done through css and js.  what if an extended version of markdown had the ability to more easily adjust the look and feel of markdown from within the markdown syntax?  this would completely avoid the need to use css/js, but then you forego leveraging all the good work done out there for css/js, etc.  this would be a large undertaking.

### option 5

github action to handle all this, but the main issue for this is that each repo would need its own action with control privileges, token setup which is very annoying, not to mention the tokens expire.  this method is nice though when it works because all you have to do is commit files, everything else is taken care of automatically by github action.

#### exploring option 1

before each checkin, a tool would need to be run that would update the index.  this index would need to be committed along with all the changes.  the benefit is that the meta creation/modification times would be known
saving from having to use the github api to collect this information.  if users forget to use this tool and just commit changes, this would cause unsynchronized files to be unavailable.  this tool would scan all the .md/.mkd files in the directory, get the creation and modification times, file name, size, etc.  though i think windows doesn't allow for collection of the creation date, or linux, not sure which one.  or perhaps one could explicitly add this file to the command line, saving from having to scan, users could also add things like tags or other meta data specific to this file.

the whole premise of using this system is that you leverage the version control of git, the web service of github pages, and the simplicity of being able to write content in markdown.  since markdown is focused on content mostly with only a little bit of layout, this provides a way to take the content from markdown and play with the layout in css/js which are more adept to creating excellent layouts.

this tool would be analogous to the hugo cli which stores everything locally in a small database file, but generates all the static files.