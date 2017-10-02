'use strict';

const chalk = require('chalk');
const got = require('got');
const table = require('tty-table');

const getLogoAscii = function() {
  console.log(
    chalk.cyan(
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
  const rows = Object.entries(data);
  
  const header = [
    {
      value : "Award",
      headerColor : "cyan",
      color: "white",
      align : "center",
      paddingLeft : 5,
      //width : 30
    },
    {
      value : "Count",
      headerColor : "cyan",
      color: "white",
      align : "center",
      //paddingLeft : 5,
      //width : 30
    },
  ];

  const footer = [
    "TOTAL",
    (function(){
      return rows.reduce(function(prev,curr){
        return prev+curr[1]
      },0)
    }()),
    (function(){
      const total = rows.reduce(function(prev,curr){
        return prev+((curr[2]==='yes') ? 1 : 0);
      },0);
      return (total/rows.length*100).toFixed(2) + "%";
    }())];

  const t1 = table(header,rows,footer, {
    borderStyle : 1,
    borderColor : "cyan",
    paddingBottom : 0,
    headerAlign : "center",
    align : "center",
    color : "white",
    truncate: "..."
  });

  const str1 = t1.render();

  console.log(str1);
};


got(profile())
  .then(response => {
    if (!response) {
      console.log(
        chalk.yellow(
          'Oops, we have some problems getting the data...try again please.'
        )
      );
      return;
    }

    const profile = JSON.parse(response.body);

    // Display logo
    getLogoAscii();

    // Show the information of the profile
    console.log(chalk.cyan('Agency: ' + profile.name + '\n'));
    console.log(chalk.cyan('Website: ' + profile.website + '\n'));
    console.log(chalk.cyan('Showreel: ' + profile.showreel + '\n'));
    console.log(chalk.cyan('Total Offices: ' + profile.offices.length + '\n'));
    //console.log(chalk.cyan('Total Awards: ' + profile.total + '\n'));

    if (profile.stats.awards) {
      getAwards(profile.stats.awards);
    }
  })
  .catch(error => {
    console.log(chalk.red(error.response.body));
  });