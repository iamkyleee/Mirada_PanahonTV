// var share = new Share(".share-button", {

 

// });


var config = {
    //protocol:    // the protocol you'd prefer to use. [Default: your current protocol]
//  url:         // the url you'd like to share. [Default: `window.location.href`]
 // title:       'Mirada'// title to be shared alongside your link [Default: your page's meta description]
  //description: 'Mirada chrome Extension'// text to be shared alongside your link, [Default: your page's meta description]   
 // image:       'http://imgur.com/ydTsHUW' // image to be shared [Default: your page's meta description]
  ui: {
    flyout:            'top center'// change the flyout direction of the shares. chose from `top left`, `top center`, `top right`, `bottom left`, `bottom right`, `bottom center`, `middle left`, or `middle right` [Default: `top center`]
//    button_font:       // include the Lato font set from the Google Fonts API. [Default: `true`]
//    button_text:       // change the text of the button, [Default: `Share`]
//    icon_font:         // include the minified Entypo font set. [Default: `true`]
  },
  networks: {
    google_plus: {
      enabled: 'true'// Enable Google+. [Default: true]
      url:     'http://imgur.com/ydTsHUW'// the url you'd like to share to Google+ [Default: config.url]
    },
    twitter: {
      enabled: 'http://imgur.com/ydTsHUW'// Enable Twitter. [Default: true]
      url:     'http://imgur.com/ydTsHUW'// the url you'd like to share to Twitter [Default: config.url]
      description:    theQuotes[whichImage]// text to be shared alongside your link to Twitter [Default: config.description]
    },
    facebook: {
      enabled: 'true'// Enable Facebook. [Default: true]
  //    load_sdk: // Load the FB SDK. If false, it will default to Facebook's sharer.php implementation. 
                // NOTE: This will disable the ability to dynamically set values and rely directly on applicable Open Graph tags.
                // [Default: true]
      url: 'http://imgur.com/ydTsHUW'// the url you'd like to share to Facebook [Default: config.url]
    //  app_id: // Facebook app id for tracking shares. if provided, will use the facebook API
      title: 'Mirada'// title to be shared alongside your link to Facebook [Default: config.title]
      caption: 'Mirada chrome'// caption to be shared alongside your link to Facebook [Default: null]
      description:    'Mirada for chrome'// text to be shared alongside your link to Facebook [Default: config.description]
      image: theUrls[whichImage]// image to be shared to Facebook [Default: config.image]
    },
    pinterest: {
      enabled: 'true'// Enable Pinterest. [Default: true]
      url:     'http://imgur.com/ydTsHUW'// the url you'd like to share to Pinterest [Default: config.url]
      image:   'http://imgur.com/ydTsHUW'// image to be shared to Pinterest [Default: config.image]
      description:  'Mirada'  // text to be shared alongside your link to Pinterest [Default: config.description]
    },
    email: {
      enabled: 'true'// Enable Email. [Default: true]
      title:     'cool'// the subject of the email [Default: config.title]
      description:    'nice'// The body of the email [Default: config.description]
    }
}

var share = new Share('.share-button', config);