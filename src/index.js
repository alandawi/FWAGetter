'use strict';

const colors = require('colors');
const got = require('got');

const handleError = function(error) {
  console.error(error.response.body);
};

const getLogoAscii = function() {
  console.log(
    colors.yellow.bold(
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

got('https://thefwa.com/api/profiles/mediamonks')
  .then(res => JSON.parse(res.body))
  .then(data => {
    if (!data) {
      console.log(
        colors.red.bold(
          'Oops, we have some problems getting the data...try again please.'
        )
      );
      return;
    }

    getLogoAscii();

    console.log(data.total);
  })
  .catch(handleError);
