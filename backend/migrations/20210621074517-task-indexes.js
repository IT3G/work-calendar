module.exports = {
  async up(db, client) {
    db.collection('tasks').createIndex({ employee: 1 });
  },

  async down(db, client) {
    db.collection('tasks').dropIndex('employee_1');
  },
};
