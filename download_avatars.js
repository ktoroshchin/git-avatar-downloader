var request = require('request');

var token = require('./secrets');

var fs = require('fs');

// console.log('WELCOME!!!...........');
//
// function getRepoContributors(repoOwner, repoName, cb) {
//   var options = {
//   url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
//   headers: {
//     'User-Agent': 'request',
//     'Authorization': token.GITHUB_TOKEN
//   }
// };
//
//   request(options, function(err, res, body) {
//     cb(err, body);
//   });
// }
//
// getRepoContributors("jquery", "jquery", function(err, result) {
//   console.log("Errors---->", err);
//   var parse = JSON.parse(result)
//   for(var contributor of parse){
//     console.log("Result---->", contributor.avatar_url);
//   }
// });

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
downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "./downloadpicture/kvirani.jpg")
