'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const users = await queryInterface.bulkInsert('Users', [
      { username: 'tombetthauser', hashedPassword: bcrypt.hashSync('password'), createdAt: new Date(), updatedAt: new Date() },
      { username: 'enkaczkowski', hashedPassword: bcrypt.hashSync('password'), createdAt: new Date(), updatedAt: new Date() },
      { username: 'dannybetthauser', hashedPassword: bcrypt.hashSync('password'), createdAt: new Date(), updatedAt: new Date() },
      { username: 'jonbetthauser', hashedPassword: bcrypt.hashSync('password'), createdAt: new Date(), updatedAt: new Date() },
      { username: 'alexbrown', hashedPassword: bcrypt.hashSync('password'), createdAt: new Date(), updatedAt: new Date() },
      { username: 'codyharris', hashedPassword: bcrypt.hashSync('password'), createdAt: new Date(), updatedAt: new Date() },
    ], {
      returning: true
    });
    
    const partAs = [
      "Living with",
      "Working with",
      "Working for",
      "Remembering",
      "Trying to Find",
      "Rediscovering",
      "Thinking About",
      "Rethinking",
      "Unpacking",
      "Deconstructing",
      "Studying with",
      "Finding",
      "Channeling",
      "Discovering",
      "Avoiding",
      "Forgetting",
      "Sustaining",
      "Seeing Through",
      "Getting More from",
      "In the Studio with",
      "Moving Past",
      "Building on",
      "Going Back to",
      "Redefining",
      "Ascending to",
      "Descending to",
      "Getting Lost with",
    ]

    const partBs = [
      "Roger Brown",
      "Rob Storr",
      "Vija Celmins",
      "Francis Bacon",
      "Albert Pinkham Ryder",
      "Wayne Thiebaud",
      "William T. Wiley",
      "Joan Brown",
      "Carlos Villa",
      "Robert Crumb",
      "David Zwirner",
      "Robert Bechtle",
      "Robert Arneson",
      "David Park",
      "Mel Ramos",
      "Forest Bess",
      "Georgia O'Keeffe",
      "Judy Chicago",
      "Jay Defao",
      "Victor Arnautoff",
      "Barry McGee",
      "Margaret Kilgallen",
      "Clare Rojas",
      "The Mission School",
      "Minimalism",
      "Bay Area Abstraction",
      "Los Angeles Abstraction",
      "East Coast Abstraction",
      "Installation",
      "Oil Painting",
      "Greek Sculpture",
      "Oil Clay",
      "Lascaux Acrylics",
      "the Chauvet Cave Paintings",
      "California Petroglyphs",
      "South American Petroglyphs",
      "the Bay Area Figurative Movement",
      "California Pop Art",
      "Pop Art",
      "Commercialism",
      "Hermitage",
      "Santa Monica",
      "Los Angeles",
      "Davis",
      "Sacramento",
      "Oakland",
      "Queens",
      "Brooklyn",
      "Portland",
      "California",
      "Oregon",
      "Texas",
      "New York",
      "Chicago",
      "San Francisco",
      "Milwaukee",
      "Austin",
      "Chile",
      "Hong Kong",
      "Taiwan",
    ]

    const partCs = [
      "but not",
      "and",
      "before",
      "after",
      "in connection to",
      "without",
      "in the face of",
      "outside the context of",
      "buried under",
    ]

    const seedPosts = [];
    const seedComments = [];

    const sentencesArr = "Make it pop you might wanna give it another shot im not sure, try something else there is too much white space and something summery; colourful. Can you rework to make the pizza look more delicious can you make it look like this clipart i found nor can you make it stand out more?. We need to make the new version clean and sexy there is too much white space or we are your relatives, but this was not according to brief. Can you make it faster? we don't need a contract, do we for I really like the colour but can you change it. Concept is bang on, but can we look at a better execution im not sure, try something else can my website be in english? but make it original, and can we try some other colours maybe, yet the target audience is makes and females aged zero and up that's going to be a chunk of change. I think this should be fairly easy so if you just want to have a look i love it, but can you invert all colors? what is a hamburger menu yet we have big contacts we will promote you. Can you rework to make the pizza look more delicious make the font bigger can you rework to make the pizza look more delicious, yet this looks perfect. Just Photoshop out the dog, add a baby, and make the curtains blue try making it a bit less blah can you please send me the design specs again?. Can it handle a million in one go could you rotate the picture to show the other side of the room?, what you've given us is texty, we want sexy yet I think we need to start from scratch, but use a kpop logo that's not a kpop logo! ugh just do what you think. I trust you concept is bang on, but can we look at a better execution. Start on it today and we will talk about what i want next time could you move it a tad to the left or I want you to take it to the next level we have big contacts we will promote you, for you are lucky to even be doing this for us make it sexy there is too much white space. Can you make the font bigger? pass the mayo, appeal to the client, sue the vice president so it's great, can you add a beard though , for we are a big name to have in your portfolio, what you've given us is texty, we want sexy can you make it pop. Im not sure, try something else theres all this spanish text on my site make it sexy try making it a bit less blah. The hair is just too polarizing I got your invoice. it seems really high, why did you charge so much theres all this spanish text on my site make it look like Apple. In an ideal world jazz it up a little. We don't need a backup, it never goes down! pass the mayo, appeal to the client, sue the vice president can you lower the price for the website? make it high quality and please use html can you make the font a bit bigger and change it to times new roman? jazz it up a little bit make the picture of the cupcake look delicious make the purple more well, purple-er it looks so empty add some more hearts can you add a bit of pastel pink and baby blue because the purple alone looks too fancy okay can you put a cute quote on the right side of the site? oh no it looks messed up! i think we need to start from scratch nor I have an awesome idea for a startup, i need you to build it for me and make it look like Apple could you rotate the picture to show the other side of the room? so this was not according to brief. We try your eye, but can you change everything? I have an awesome idea for a startup, i need you to build it for me for this is just a 5 minutes job could you do an actual logo instead of a font, for thanks for taking the time to make the website, but i already made it in wix but we are a big name to have in your portfolio this turned out different that i decscribed. There is too much white space remember, everything is the same or better i cant pay you you can get my logo from facebook, yet that will be a conversation piece so this red is too red or there is too much white space. This looks perfect. Just Photoshop out the dog, add a baby, and make the curtains blue we don't need a contract, do we and we don't need a backup, it never goes down! can you use a high definition screenshot. Low resolution? It looks ok on my screen can you make it look like this clipart i found make it original, or we are your relatives what you've given us is texty, we want sexy. I need a website. How much will it cost i'll know it when i see it i know you've made thirty iterations but can we go back to the first one that was the best version and can you make it look like this clipart i found remember, everything is the same or better you might wanna give it another shot, nor thanks for taking the time to make the website, but i already made it in wix. Use a kpop logo that's not a kpop logo! ugh. This is just a 5 minutes job can you please send me the design specs again? nor it looks a bit empty, try to make everything bigger. Can you make it look like this clipart i found this looks perfect. Just Photoshop out the dog, add a baby, and make the curtains blue, yet I have an awesome idea for a startup, i need you to build it for me I got your invoice. It seems really high, why did you charge so much, but the website doesn't have the theme i was going for. Can you use a high definition screenshot i'll know it when i see it but that's great, but we need to add this 2000 line essay and could you do an actual logo instead of a font are you busy this weekend? I have a new project with a tight deadline, for i cant pay you the target audience is makes and famles aged zero and up. Low resolution? It looks ok on my screen we don't need a backup, it never goes down!. Can you help me out? you will get a lot of free exposure doing this give us a complimentary logo along with the website, for will royalties in the company do instead of cash I have an awesome idea for a startup, i need you to build it for me, but can we barter services? so can't you just take a picture from the internet?. Jazz it up a little could you do an actual logo instead of a font. Can you make it faster? can you make it look more designed. Can it handle a million in one go are you busy this weekend? I have a new project with a tight deadline. Make the font bigger can you make it stand out more?. Can you lower the price for the website? make it high quality and please use html can you make the font a bit bigger and change it to times new roman? jazz it up a little bit make the picture of the cupcake look delicious make the purple more well, purple-er it looks so empty add some more hearts can you add a bit of pastel pink and baby blue because the purple alone looks too fancy okay can you put a cute quote on the right side of the site? oh no it looks messed up! i think we need to start from scratch. Could you solutionize that for me you can get my logo from facebook yet we need more images of groups of people having non-specific types of fun this looks perfect. Just Photoshop out the dog, add a baby, and make the curtains blue, nor can we barter services?. Can't you just take a picture from the internet? i love it, but can you invert all colors? so that's great, but can you make it work for ie 2 please can we barter services? but can you make it stand out more? we don't need a backup, it never goes down!. Make it pop. We don't need a contract, do we is there a way we can make the page feel more introductory without being cheesy yet can you make it pop we are a non-profit organization can you lower the price for the website? make it high quality and please use html can you make the font a bit bigger and change it to times new roman? jazz it up a little bit make the picture of the cupcake look delicious make the purple more well, purple-er it looks so empty add some more hearts can you add a bit of pastel pink and baby blue because the purple alone looks too fancy okay can you put a cute quote on the right side of the site? oh no it looks messed up! i think we need to start from scratch can we barter services?. Can you lower the price for the website? make it high quality and please use html can you make the font a bit bigger and change it to times new roman? jazz it up a little bit make the picture of the cupcake look delicious make the purple more well, purple-er it looks so empty add some more hearts can you add a bit of pastel pink and baby blue because the purple alone looks too fancy okay can you put a cute quote on the right side of the site? oh no it looks messed up! i think we need to start from scratch something summery; colourful, yet are you busy this weekend? I have a new project with a tight deadline, for start on it today and we will talk about what i want next time. You might wanna give it another shot the flier should feel like a warm handshake, but is there a way we can make the page feel more introductory without being cheesy".split(". ")

    const randomTitle = () => {
      const partA = partAs[Math.floor(Math.random() * partAs.length)];
      const partB = partBs[Math.floor(Math.random() * partBs.length)];
      const partC = partCs[Math.floor(Math.random() * partCs.length)];
      const partD = partBs[Math.floor(Math.random() * partBs.length)];
      return {
        part: partB,
        title : [partA, partB, partC, partD].join(" ")
      };
    }

    const randomCommentText = () => {
      const newSentenceArr = []
      const sentenceLength = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < sentenceLength; i++) {
        const randomIdx = Math.floor(Math.random() * sentencesArr.length);
        newSentenceArr.push(sentencesArr[randomIdx]);
      }
      return newSentenceArr.join(". ") + ".";
    }

    const newPost = () => {
      const titleObj = randomTitle();
      const title = titleObj.title
      const url = `https://en.wikipedia.org/wiki/${titleObj.part}`;
      const id = users[Math.floor(Math.random() * users.length)].id;
      const date = new Date()
      const time = Math.floor(Math.random() * date.getTime())

      return {
        title: title,
        userId: id,
        url: url,
        type: `news`,
        createdAt: new Date(time),
        updatedAt: new Date(time)
      }
    }

    const newComment = () => {
      // const containsPostId = seedComments.length === 0 ? true : Math.random() < .5;
      let containsPostId = Math.random() < .5;
      if (seedComments.length === 0) containsPostId = true;
      let containsCommentId = !containsPostId;

      const text = randomCommentText();
      const userId = users[Math.floor(Math.random() * users.length)].id;
      // const postId = containsPostId ? seedPosts[Math.floor(Math.random() * seedPosts.length)].id : null;
      // const commentId = containsCommentId ? seedComments[Math.floor(Math.random() * seedComments.length)].id : null;
      const postId = containsPostId ? Math.floor(Math.random() * seedPosts.length) + 1 : null;
      const commentId = containsCommentId ? Math.floor(Math.random() * seedComments.length) + 1 : null;

      let originTime;
      if (postId) {
        originTime = seedPosts[postId - 1].createdAt.getTime();
      } else {
        originTime = seedComments[commentId - 1].createdAt.getTime();
      }

      const randomTimePassage = Math.floor(Math.random() * 86400)

      return { 
        text, 
        userId, 
        postId, 
        commentId,
        createdAt: new Date(originTime + randomTimePassage),
        updatedAt: new Date(originTime + randomTimePassage)
      };
    }

    for (let i = 0; i < 100; i++) {
      const post = newPost()
      seedPosts.push(post);
    }

    for (let i = 0; i < 750; i++) {
      const comment = newComment()
      seedComments.push(comment);
    }

    await queryInterface.bulkInsert('Posts', seedPosts)
    return queryInterface.bulkInsert('Comments', seedComments)
  },


  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   await queryInterface.bulkDelete('Posts', null, {});
   return queryInterface.bulkDelete('Users', null, {});
  }
};
