module.exports = function(fs,request,cheerio,task,out)
{



console.log(task.url);
request(task.url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);

    var title, release, rating;
    var json = {};
json.images=[];
//console.log($('#decluttered-search-results').children().first()['0']);
$('ol.photos img[href]').each(function(i, elem) {
  json.images.push($(this).attr('href'));
});
var addressArray=($('.addr h1').text().trim().split(","));

json.address=addressArray[0].trim();
json.city=addressArray[1].trim();
var stateZipArray=addressArray[2].trim().split(" ");
json.state=stateZipArray[0].trim();
json.zip=stateZipArray[1].trim();
var houseSpace=($('.addr h3').text().trim());

json.houseSpecification=houseSpace.trim();

var houseisfor=($('.status-icon-row.for-sale-row.home-summary-row').text());
console.log(houseisfor);
json.housefor=houseisfor.trim();

var amount=($('.main-row.home-summary-row').text());
console.log(amount);
json.price=amount;

var detail=($('.notranslate').text());
json.description=detail;


// Facts Contains Fact and Feature Block Can you check is this right or need to more in this
var fact=($('.fact-group-container.zsg-content-component.top-facts').text());
json.facts=fact;

// Price History not been Added stuck how to add price history


//School Ratings
var rating=($(".nearby-schools-list")).text().trim().split("/n");
json.schoolGrading=rating;


 //json.housespace=addressArray[3].trim();

require("../output")(json);

}

});

}
