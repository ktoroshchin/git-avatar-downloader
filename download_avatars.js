var request = require('request');

var token = require('./secrets');

var fs = require('fs');


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

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors---->", err);
  var parse = JSON.parse(result)
  // console.log(parse);
  for(var contributor of parse){
    // var downloadUrl = contributor.avatar_url
    // console.log("Result---->", contributor.avatar_url);
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
