module.exports = {
  async up(db, client) {
    await db.collection('tasks').createIndex({ employee: 1 });
  },

  async down(db, client) {
    await db.collection('tasks').dropIndex('employee_1');
  },
};
