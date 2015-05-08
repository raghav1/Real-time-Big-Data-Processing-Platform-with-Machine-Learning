module.exports = function(fs,request,cheerio,task)
{



console.log(task.url);
request(task.url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);

    var json = { houses:[]};

//console.log($('#decluttered-search-results').children().first()['0']);
$('div[data-ldpurl]').each(function(i, elem) {
  //console.log ($(this).ht;
  var house={};

  var figure=$(this).children().find("li.listing-location  span[itemprop]").each(function(i, elem){

    house[$(this).attr("itemprop")]=($(this).text());
  });
  var detailPage=$(this).children().find("a.ellipsis[href]");

    house["detailPage"]=$(this).attr("data-ldpurl");
    var geo=$(this).children().find("div.listing-geo meta").each(function(i, elem){
      house[$(this).attr("itemprop")]=$(this).attr("content");
    });
    var liSpan=$(this).children().find("li span[itemprop]").each(function(i, elem){
      house[$(this).attr("itemprop")]=$(this).text();
    });
    house.unstructuredInfo=[];
    var liSpan=$(this).children().find("li span").not("[itemprop]").each(function(i, elem){
      house.unstructuredInfo.push($(this).text());
    });
  json.houses.push(house);

});
}

$('#RentListView ul.listing-summary').each(function(i, elem) {
  //console.log ($(this).ht;
  var house={};

  var figure=$(this).children().find("li.listing-location  span[itemprop]").each(function(i, elem){

    house[$(this).attr("itemprop")]=($(this).text());
  });

  house["detailPage"]=$(this).children().find("a.ellipsis[href]").attr("href");
var geo=$(this).children().find("div.listing-geo meta").each(function(i, elem){
  house[$(this).attr("itemprop")]=$(this).attr("content");
});
var liSpan=$(this).children().find("li span[itemprop]").each(function(i, elem){
  house[$(this).attr("itemprop")]=$(this).text();
});
house.unstructuredInfo=[];
var liSpan=$(this).children().find("li span").not("[itemprop]").each(function(i, elem){
  house.unstructuredInfo.push($(this).text());
});

  json.houses.push(house);

});
$('ol.pagination').first().children().find('a.paginate:not(.selected)').each(function(i, elem){
  var task={};
  task.url='http://www.realtor.com'+$(this).attr('href');
  task.parser='realtorSearch';
  var fileName='./task'+new Date().getTime()+'.json';
  fs.writeFile(fileName, JSON.stringify(task, null, 4), function(err){

  if(!err)
      console.log('New Task'+fileName);
  else
    console.log(err);
  });
  });


fs.writeFile('./output/output'+new Date().getTime()+'.json', JSON.stringify(json, null, 4), function(err){

if(!err)
    console.log('File successfully written! - Check your project directory for the output.json file');
else
  console.log(err);
})
});
}
