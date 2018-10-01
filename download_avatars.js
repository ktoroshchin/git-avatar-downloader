var request = require('request');

var token = require('./secrets');

var fs = require('fs');

var arg = process.argv.slice(2);




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
  if(err) {
    console.log("Errors---->", err);
  }
  console.log(result);
  var parse = JSON.parse(result);

  if(parse.message == 'Not Found'){
    console.log("Invalid owner or repo names!!! Use this format: ownername reponame (For example: jquery jquery) ");
  } else {
    for(var contributor of parse) {
      downloadImageByURL(contributor.avatar_url, `./downloadpicture/${contributor.login}.jpg`)
    };
  };
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
