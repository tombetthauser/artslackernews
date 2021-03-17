# Slacker News Arts Forum

An art forum that's actually an art forum but has no affiliation whatsoever with art forum. A loving and pointless clone of the actual website <a target="new" href="http://hackernews.org">Hacker News</a>. Open to all but designed mainly with BFA and MFA graduates working in the visual / non-commercial arts in mind. Use it however you like or don't.

Still super broken, please create new issues if you find something not working!

<!-- 

# Express Project Skeleton

Use this project skeleton as a starting point for structuring your app. Things to note

* Sequelize configuration has not yet been added -- you will need to set that up yourself
* You may find yourself wanting to use javascript -- js files can be added in `public/javascripts` and should be appended to the Pug templates as needed
* CSS files can go in `public/stylesheets` and also will need to be added to Pug templates 

---

TOM's NOTES:

REMEMBER TO USE DOTENV with SEQUELIZE-CLI (ie...)
$ npx dotenv sequelize-cli db:create

$ npx sequelize-cli model:generate --name User --attributes username:string,passwordHash:string
$ npx sequelize-cli model:generate --name Post --attributes title:string,url:string,category:string,userId:integer
$ npx sequelize-cli model:generate --name Comment --attributes text:string,postId:integer,commentId:integer

TO RESET THE DATABASE
$ npx dotenv sequelize-cli db:drop
$ npx dotenv sequelize-cli db:create
$ npx dotenv sequelize-cli db:migrate
$ npx dotenv sequelize-cli db:seed:all

WORK LOG
* After initial build sprint during December 2020 cohort express project week (March 16th 2021)
* Got comments fetching and rendering 3 levels deep, planned to extend to 10 levels deep, should be a trivial copy/paste thing to do
* Got login block / redirect working when trying to leave comment or make post while not logged in but didn't make the redirect take you back to where you were or retain comment / post text, could manage through url props maybe? Seemed tricky
* Same issue on leaving sub-comments, they redirect to root after submission rather than their parent comment page, could maybe fix by making new posts route that can accept a comment id and do a look up? Seemed tricky also but possible
* Needed to figure out making a functional 'more' button at the bottom of posts index page - seemed like it would be pretty straight forward with url props for page number and some in-line css on the ordered list to give it a starting number - could be lazy and just filter a fetchAll on the back-end but could probably write a dynamic where for sequelize to translate into sql
* Needed to add some seed data for different sections or just add a random section picker in the existing seed file
* Need to add optional text for new posts - had the textarea field on the new post form but realized it wasn't actually a column on the Posts table so hid the input for now - need to add it to migrations or maybe add an additive migration - regardless add to database, then make some coin-flip random text in the seed file, then uncomment the input field on new post form and then work on how it renders in the post view
* after the ability to show more posts and split posts up into different pages is built the lazy url-props-based search feature will break and will have to actually get built out on the back end with some sequelize where magic - can still probably work through url props though

-->
