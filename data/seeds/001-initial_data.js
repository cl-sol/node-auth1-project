
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {username: "potato", password: 'abc123'},
        {username: "munchkin", password: '123abc'},
        {username: "tater", password: 'cba321'}
      ]);
    });
};
