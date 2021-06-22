const moment = require('moment');

module.exports = {
  async up(db, client) {
    const users = await db.collection('users').find().toArray();

    for (let index = 0; index < users.length; index++) {
      const element = users[index];

      if (element.birthday) {
        const birthday = element?.birthday && moment(element.birthday).format('YYYY-MM-DD');
        await db.collection('users').updateOne(
          {
            mailNickname: element.mailNickname,
          },
          { $set: { birthday } }
        );
      }
    }
  },

  async down(db, client) {},
};
