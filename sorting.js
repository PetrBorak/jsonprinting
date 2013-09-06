var cities = {
actualCity : 0,

list: [{name: "Moscow", count: 12, content: "<p>description</p>"}, {name:
"Amsterdam", count: 25, content: "html"}, {name: "Lisbon", count: 15,
content: "html"}, {name: "Berlin", count: 19, content: "<div style='border: 1px solid red;'>test</div>"},
{name: "Madrid", count: 25, content: "html"}], 


sortFn : function(city0, city1){
 city0.sc = city0.name.toLowerCase();
 city1.sc = city1.name.toLowerCase();
 var toRet = city0.sc > city1.sc ? 1 : 0;
 return(toRet);
}, 

sort: function(){
 this.list.sort(this.sortFn);
},

print: function(divCities, divDesc, numCol){
  var spanLink, aLink, list, listItemOuter,listInner,listItemInner, listLength, cityName, count;
  
  /*Here I wasnt sure how exactly the layout should work. So I made it universal*/
  var numCol = numCol ? numCol : 3;
  var perCol = Math.ceil(this.list.length/numCol); 
  listLength = this.list.length;
  list = document.createElement('ul');
  $(list).attr('id','mainList');
  
  $(divCities).append(list);
  
  for(var i = 0; i < listLength; i++){
    if((i==0)||(i%perCol == 0)){
     listItemOuter = document.createElement('li');
     listInner = document.createElement('ul');
     listItemInner = document.createElement('li');
     $(listInner).addClass('listInner');
     $(listItemInner).addClass('listItemInner');
     $(listItemOuter).append(listInner);
    }
    
      listItemInner = document.createElement('li');
      spanLink = document.createElement('span');
      aLink = document.createElement('a');
      $(aLink).attr('alt','toDesc').attr('href','#');
      $(list).append(listItemOuter);
      $(listInner).append(listItemInner);
      this.list[i].domRef = aLink;
      $(listItemInner).append(aLink);
      var that = this;
      
      /*The event listener shifted to upper element to minimaze its number to only one... in case of large amount of items. The event listener now at line102*/
//     (function(num){
//        $(aLink).bind('click', function(event){
//        that.update(num,divDesc,that);
//        event.preventDefault(); 
//  })   
//  })(i);
    aLink.num = i;
    cityName = document.createTextNode(this.list[i].name);
    count = document.createTextNode(this.list[i].count);
    $(aLink).addClass('linkToDesc').append(cityName);
    $(spanLink).append(aLink).append(' (').append(count).append(')');
    $(listItemInner).append(spanLink);
    if((i+1)==listLength){
      $(divCities).append(list);
    }else{
      continue;
   }    

  }
},
update: function(num, divDesc, that){
num = arguments.length == 2 ? 0 : num;
divDesc = arguments.length == 2 ? arguments[0] : arguments[1];
that = arguments.length == 2 ?  arguments[1] : arguments[2];
//console.log('num');
//console.log(num);
//console.log('that');
//console.log(that);

this.actualCity = num;
var actual = $(that.list[num].domRef);

//console.log('actual');
//console.log(actual);

that.resetActive();
actual.addClass('active');
$(divDesc).empty().append(that.list[num].content);
},
resetActive: function(){
  $('.linkToDesc').each(function(index, obj){
   $(obj).removeClass('active');
//   console.log('resetActive');
  })
},
init: function(){
 var divCities, divDesc;
 divCities = $("#cities");
 divDesc = $("#desc");
 var that = this;
 divCities.bind('click',function(event){
   var el = event.target;
   that.update(el.num, divDesc,that);
   event.preventDefault();
 });
 this.sort();
 this.print(divCities, divDesc,3);
 this.update(this.actualCity, divDesc,this);
}
} 

$(document).ready(function(){
  cities.init();
});