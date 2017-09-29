'use strict';

const colors = require('colors');
const got = require('got');

const handleError = function(error) {
  console.log(colors.error(error.response.body));
};

const getLogoAscii = function() {
  console.log(
    colors.rainbow(
      `
    ______    __  __    ______    ______ _       __    ___ 
    /_  __/   / / / /   / ____/   / ____/| |     / /   /   |
     / /     / /_/ /   / __/     / /_    | | /| / /   / /| |
    / /     / __  /   / /___    / __/    | |/ |/ /   / ___ |
   /_/     /_/ /_/   /_____/   /_/       |__/|__/   /_/  |_|                                            
    `
    )
  );
};

const profile = function() {
  const argv = process.argv[2];

  if (!argv) {
    return 'mediamonks';
  }

  return argv;
};

//console.log(profile());

got('https://thefwa.com/api/profiles/mediamonks')
  .then(res => JSON.parse(res.body))
  .then(profile => {
    if (!profile) {
      console.log(
        colors.warn(
          'Oops, we have some problems getting the data...try again please.'
        )
      );
      return;
    }

    // Display logo
    getLogoAscii();

    // Show the information of the profile
    console.log(profile.total);
  })
  .catch(handleError);
