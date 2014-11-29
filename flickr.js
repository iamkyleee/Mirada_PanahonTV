function jsonFlickrApi(rsp) {
 if (rsp.stat != "ok"){
  return;
 }
 
 var s = "";
 var i = Math.random();
 i = i * 100;
 i = Math.ceil(i);
 
 photo = rsp.photos.photo[ i ];
 
 t_url = "http://farm" + photo.farm +
 ".static.flickr.com/" + photo.server + "/" +
 photo.id + "_" + photo.secret + "_" + "m.jpg";
 
 p_url = "http://www.flickr.com/photos/" +
 photo.owner + "/" + photo.id;
 
// s =  '<img alt="'+ photo.title + '"src="' + t_url + '"/>'  ;
 
 function showFlickr(){
 document.write('<img alt="'+ photo.title + '"src="' + t_url + '"/>'); 
}
 //this tells the JavaScript to write
 //everything in variable "s" onto the page
 

showFlickr();
}
