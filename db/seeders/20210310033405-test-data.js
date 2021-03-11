'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const partAs = [
      "Going to",
      "Remembering",
      "Trying to Go to",
      "Just Thinking About",
      "Rethinking",
      "Unpacking",
      "Deconstructing",
      "Living in",
      "Finding",
    ]

    const partBs = [
      "the Moon",
      "the Alamo",
      "the Desert",
      "the Night Sky",
      "the Sun",
      "the South",
      "the Arctic",
      "the Local Library",
      "the Outback",
      "the Black Forest",
      "the Lost Coast",
      "the Dark Side of the Moon",
      "the Happiest Place on Earth",
      "the Laugh Factory",
      "the Mystery Spot",
      "the 60's",
      "the 90's",
      "the Other World",
      "the Center",
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

    const randomTitle = () => {
      const partA = partAs[Math.floor(Math.random() * partAs.length)];
      const partB = partBs[Math.floor(Math.random() * partBs.length)];
      return `${partA} ${partB}`;
    }
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */

   const users = await queryInterface.bulkInsert('Users', [
      { username: 'tombetthauser', hashedPassword: bcrypt.hashSync('password'), createdAt: new Date(), updatedAt: new Date() },
      { username: 'enkaczkowski', hashedPassword: bcrypt.hashSync('password'), createdAt: new Date(), updatedAt: new Date() },
   ], { 
     returning: true 
   });

    return queryInterface.bulkInsert('Posts', [
      { 
        title: randomTitle(), 
        userId: users[Math.floor(Math.random() * users.length)].id,
        url: "http://google.com",
        category: "news",
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        title: randomTitle(), 
        userId: users[Math.floor(Math.random() * users.length)].id,
        url: "http://google.com",
        category: "news",
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        title: randomTitle(), 
        userId: users[Math.floor(Math.random() * users.length)].id,
        url: "http://google.com",
        category: "news",
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        title: randomTitle(), 
        userId: users[Math.floor(Math.random() * users.length)].id,
        url: "http://google.com",
        category: "news",
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        title: randomTitle(), 
        userId: users[Math.floor(Math.random() * users.length)].id,
        url: "http://google.com",
        category: "news",
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        title: randomTitle(), 
        userId: users[Math.floor(Math.random() * users.length)].id,
        url: "http://google.com",
        category: "news",
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        title: randomTitle(), 
        userId: users[Math.floor(Math.random() * users.length)].id,
        url: "http://google.com",
        category: "news",
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        title: randomTitle(), 
        userId: users[Math.floor(Math.random() * users.length)].id,
        url: "http://google.com",
        category: "news",
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        title: randomTitle(), 
        userId: users[Math.floor(Math.random() * users.length)].id,
        url: "http://google.com",
        category: "news",
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        title: randomTitle(), 
        userId: users[Math.floor(Math.random() * users.length)].id,
        url: "http://google.com",
        category: "news",
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        title: randomTitle(), 
        userId: users[Math.floor(Math.random() * users.length)].id,
        url: "http://google.com",
        category: "news",
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
    ])
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
