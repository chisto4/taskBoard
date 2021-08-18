const bcrypt  = require('bcryptjs');
const pass = 'password';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
      name: 'ilon',
      surname: 'mask',
      login: 'ilon',
      email: 'ilon@mail.com',
      password: bcrypt.hashSync(pass, 5),
      dob: '27.07.1991',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'jon',
      surname: 'lenon',
      login: 'Jon',
      email: 'Jon@mail.com',
      password: bcrypt.hashSync(pass, 5),
      dob: '27.07.1991',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'obama',
      surname: 'president',
      login: 'dunky',
      email: 'usa@mail.com',
      password: bcrypt.hashSync(pass, 5),
      dob: '27.07.1991',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'delete',
      surname: 'delete',
      login: 'delete',
      email: 'delete@mail.com',
      password: bcrypt.hashSync(pass, 5),
      dob: '27.07.1991',
      createdAt: new Date(),
      updatedAt: new Date()
    }

  ]);
  },
  down: async (queryInterface, Sequelize) => {
   await queryInterface.bulkDelete('users', null, {});
  }
};
