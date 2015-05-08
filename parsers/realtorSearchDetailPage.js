module.exports = function(fs,request,cheerio,task)
{



console.log(task.url);
request(task.url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);

    var json = { housedetails:[]};

    $('.title-group-headline title-group-headline-ldpnxt').each(function(i, elem) {
