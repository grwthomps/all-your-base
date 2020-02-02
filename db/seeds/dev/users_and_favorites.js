exports.seed = function(knex) {
  // We must return a Promise from within our seed function
  // Without this initial `return` statement, the seed execution
  // will end before the asynchronous tasks have completed
  return knex('favorites').del() // delete all footnotes first
    .then(() => knex('users').del()) // delete all papers

    // Now that we have a clean slate, we can re-insert our paper data
    .then(() => {
      return Promise.all([

        // Insert a single paper, return the paper ID, insert 2 footnotes
        knex('users').insert([
          {api_key: 'first_key'},
          {api_key: 'second_key'},
        ], 'id')
        .then(user => {
          return knex('favorites').insert([
            { location: 'Denver, CO', user_id: user[0] },
            { location: 'Orlando, FL', user_id: user[0] },
            { location: 'Denver, CO', user_id: user[1] },
            { location: 'Portland, OR', user_id: user[1] }
          ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
