'use strict';

const colors = require('colors');
const got = require('got');

const getLogoAscii = function() {
  console.log(
    colors.rainbow(
      `
███████╗██╗    ██╗ █████╗      ██████╗ ███████╗████████╗████████╗███████╗██████╗ 
██╔════╝██║    ██║██╔══██╗    ██╔════╝ ██╔════╝╚══██╔══╝╚══██╔══╝██╔════╝██╔══██╗
█████╗  ██║ █╗ ██║███████║    ██║  ███╗█████╗     ██║      ██║   █████╗  ██████╔╝
██╔══╝  ██║███╗██║██╔══██║    ██║   ██║██╔══╝     ██║      ██║   ██╔══╝  ██╔══██╗
██║     ╚███╔███╔╝██║  ██║    ╚██████╔╝███████╗   ██║      ██║   ███████╗██║  ██║
╚═╝      ╚══╝╚══╝ ╚═╝  ╚═╝     ╚═════╝ ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝                    
   \n`
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

const getAwards = function(data) {
  Object.entries(data).forEach(([key, value]) => {
    console.log(colors.cyan(key + '(' + value + ')'));
  });
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
    console.log(colors.cyan('Agency: ' + profile.name + '\n'));
    console.log(colors.cyan('Website: ' + profile.website + '\n'));
    console.log(colors.cyan('Showreel: ' + profile.showreel + '\n'));
    console.log(colors.cyan('Total Offices: ' + profile.offices.length + '\n'));
    console.log(colors.cyan('Total Awards: ' + profile.total + '\n'));

    console.log(colors.cyan('Awards:'));
    getAwards(profile.stats.awards);

    // TODO: Check if is possible to get site of the day key
    // TODO: Need to check if the data exists (showreel for example)
  })
  .catch(error => {
    console.log(colors.error(error.response.body));
  });
