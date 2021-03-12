'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const users = await queryInterface.bulkInsert('Users', [
      { username: 'tombetthauser', hashedPassword: bcrypt.hashSync('password'), createdAt: new Date(), updatedAt: new Date() },
      { username: 'enkaczkowski', hashedPassword: bcrypt.hashSync('password'), createdAt: new Date(), updatedAt: new Date() },
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

    const seedPosts = [];
    for (let i = 0; i < 500; i++) {
      const post = newPost()
      seedPosts.push(post);
    }

    return queryInterface.bulkInsert('Posts', seedPosts)
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
