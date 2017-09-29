'use strict';

const colors = require('colors');
const got = require('got');

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
  const url = 'https://thefwa.com/api/profiles/';

  if (!argv) {
    return url + 'mediamonks';
  }

  return url + argv;
};

got(profile())
  .then(response => {
    if (!response) {
      console.log(
        colors.warn(
          'Oops, we have some problems getting the data...try again please.'
        )
      );
      return;
    }

    const profile = JSON.parse(response.body);

    // Display logo
    getLogoAscii();

    // Show the information of the profile
    console.log(profile.total);
  })
  .catch(error => {
    console.log(colors.error(error.response.body));
  });
