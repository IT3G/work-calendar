db.createUser({
  user: 'calendar',
  pwd: 'calendar',
  roles: [
    {
      role: 'readWrite',
      db: 'calendar'
    }
  ]
});
