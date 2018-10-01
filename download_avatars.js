var request = require('request');

var token = require('./secrets');

var fs = require('fs');

var arg = process.argv.slice(2)




function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
  url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
  headers: {
    'User-Agent': 'request',
    'Authorization': 'token ' + token.GITHUB_TOKEN
  }
};

  request(options, function(err, res, body) {
    cb(err, body);
  });
}

getRepoContributors(arg[0], arg[1], function(err, result) {
  console.log("Errors---->", err);
  var parse = JSON.parse(result);
  for(var contributor of parse) {
    downloadImageByURL(contributor.avatar_url, `./downloadpicture/${contributor.login}.jpg`)
  }
});

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .pipe(fs.createWriteStream(filePath))
    .on('finish', function(){
      console.log('Downloading picture...');
      console.log('Download complete!');
    });
}

// function nodeInput(owner, repo) {
//   var arg = process.argv.slice(2)
//   var owner = arg[0];
//   var repo = arg[1];
// }
