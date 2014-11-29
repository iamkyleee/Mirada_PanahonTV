angular.module('ToDo', ['geolocation', 'angularReverseGeocode'])

	.controller('todoController', ['$scope', function($scope) {
		$scope.todos = JSON.parse(localStorage.getItem('todos')) || []
			/*
			$scope.todos = [
				
			];
			*/
		$scope.addTodo = function() {
			$scope.todos.push({
				'title': $scope.newTodo,
				'done': false
			})
			$scope.newTodo = ''
		}
		$scope.clearCompleted = function() {
			$scope.todos = $scope.todos.filter(function(item) {
				return !item.done
			})

		}

		$scope.$watch('todos', function(newValue, oldValue) {
			if (newValue != oldValue) {
				localStorage.setItem('todos', JSON.stringify(newValue))
			}

		}, true)


	}])


.controller('feedCtrl', ['$scope', '$http', function($scope, $http) {
	// $scope.players = [{ 'name': 'Blake Griffin', 'position': 'PF' },
	//       { 'name': 'Chris Paul', 'position': 'PG' },{'name': 'Kobe Bryant', 'position': 'SG'}
	//   ];
	//   $scope.dataCount = 3;
	//   $scope.$watchCollection('players', function (newNames, oldNames) {
	//       $scope.dataCount = newNames.length;
	//   })


	//$scope.getRand = function () {
	//    return Math.floor(Math.random() * 20) + 1;
	//}
	// $scope.names = ['Chris Paul', 'Blake Griffin', 'JJ Reddick'];
	//$http.get('feed.json').success(function (data) {
	$http.get('https://spreadsheets.google.com/feeds/list/0ArLmqAWjjIKmdDNmN1dxUEFvei1LUlRGejMyUVVCa2c/od6/public/basic?alt=json').success(function(data) {
		$scope.apiFeed = data;
		$scope.feed = data.feed;
		$scope.entry = data.feed.entry;
		$scope.title = data.feed.entry.title;
		$scope.content = data.feed.entry.content;

		var rand = Math.floor(Math.random() * data.feed.entry.length) + 1;
		$scope.quote = rand;
		$scope.randomQuote = data.feed.entry[rand].title.$t;

		$scope.getContent = data.feed.entry[rand].content.$t.substring(12, 40);


	})



}])

.controller('locCtrl', ['$scope', '$http', 'geolocation', '$sce', function($scope, $http, geolocation, $sce) {
	 // $scope.coords = geolocation.getLocation().then(function(data){
  //     return {lat:data.coords.latitude, long:data.coords.longitude};

  //     $scope.loc = navigator.geolocation.getCurrentPosition().toString();
  //   });

 geolocation.getLocation().then(function(data){
      $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
      $scope.lat = data.coords.latitude;
      $scope.long = data.coords.longitude;	
      $scope.locString = $scope.lat  + "," + $scope.long ;	
  $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + $scope.locString).success(function(data2){
  // $http.get('testLoc.json').success(function(data2){
 			$scope.locData = data2;
 			$scope.str = data2.results[1].address_components[1].long_name;
 			console.log($scope.str);
 			 $scope.iframeContent =  document.getElementById('liweather').innerHTML = "<iframe id='forecast_embed' type='text/html' frameborder='3' src='http://forecast.io/embed/#lat=" + $scope.lat + "&lon=" + $scope.long +"&name=" + $scope.str + "&units=uk'></iframe>";
 			 //$compile(document.getElementById('liweather'))($scope);
		})	
 });

	 // $scope.lat = "0";
  //       $scope.lng = "0";
  //       $scope.accuracy = "0";
  //       $scope.error = "";
  //       $scope.model = { myMap: undefined };
  //       $scope.myMarkers = [];

  //       $scope.showResult = function () {
  //           return $scope.error == "";
  //       }

  //       $scope.mapOptions = {
  //           center: new google.maps.LatLng($scope.lat, $scope.lng),
  //           zoom: 15,
  //           mapTypeId: google.maps.MapTypeId.ROADMAP
  //       };

  //       $scope.showPosition = function (position) {
  //           $scope.lat = position.coords.latitude;
  //           $scope.lng = position.coords.longitude;
  //           $scope.accuracy = position.coords.accuracy;
  //           $scope.$apply();

  //           var latlng = new google.maps.LatLng($scope.lat, $scope.lng);
  //           $scope.model.myMap.setCenter(latlng);
  //           $scope.myMarkers.push(new google.maps.Marker({ map: $scope.model.myMap, position: latlng }));
  //       }

  //       $scope.showError = function (error) {
  //           switch (error.code) {
  //               case error.PERMISSION_DENIED:
  //                   $scope.error = "User denied the request for Geolocation."
  //                   break;
  //               case error.POSITION_UNAVAILABLE:
  //                   $scope.error = "Location information is unavailable."
  //                   break;
  //               case error.TIMEOUT:
  //                   $scope.error = "The request to get user location timed out."
  //                   break;
  //               case error.UNKNOWN_ERROR:
  //                   $scope.error = "An unknown error occurred."
  //                   break;
  //           }
  //           $scope.$apply();
  //       }

  //       $scope.getLocation = function () {
  //           if (navigator.geolocation) {
  //               navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
  //           }
  //           else {
  //               $scope.error = "Geolocation is not supported by this browser.";
  //           }
  //       }

  //       $scope.getLocation();
}])

.controller('fooCtrl', function($scope){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      $scope.$apply(function(){
        $scope.position = position;
      });
    });
  }
});

// angular.module('Todo', []).
// controller('feedCtrl', function ($scope, $http, $timeout) {

//     $scope.players = [{ 'name': 'Blake Griffin', 'position': 'PF' },
//         { 'name': 'Chris Paul', 'position': 'PG' },{'name': 'Kobe Bryant', 'position': 'SG'}
//     ];
//     $scope.dataCount = 3;
//     $scope.$watchCollection('players', function (newNames, oldNames) {
//         $scope.dataCount = newNames.length;
//     });


//     //$scope.getRand = function () {
//     //    return Math.floor(Math.random() * 20) + 1;
//     //}
//     // $scope.names = ['Chris Paul', 'Blake Griffin', 'JJ Reddick'];
//     //$http.get('feed.json').success(function (data) {
//     $http.get('https://spreadsheets.google.com/feeds/list/0ArLmqAWjjIKmdDNmN1dxUEFvei1LUlRGejMyUVVCa2c/od6/public/basic?alt=json').success(function (data) {
//         $scope.apiFeed = data;
//         $scope.feed = data.feed;
//         $scope.entry = data.feed.entry;
//         $scope.title = data.feed.entry.title;
//         $scope.content = data.feed.entry.content;

//         var rand = Math.floor(Math.random() * data.feed.entry.length) + 1;
//         $scope.quote = rand;
//         $scope.randomQuote = data.feed.entry[rand].title.$t;

//         $scope.getContent = data.feed.entry[rand].content.$t.substring(12, 40);



//         setTimeout(function () { $scope.randomQuote(); }, 100);
//         $scope.generateRandom = function () {
//             var rand2 = Math.floor(Math.random() * data.feed.entry.length) + 1;
//             $scope.ran = data.feed.entry[rand2].title.$t;
//             $timeout(rand, 100);
//         }
//     });

//     //$scope.generateRandom = function () {
//     //    var rand2 = Math.floor(Math.random() * data.feed.entry.length) + 1;
//     //    $scope.ran = $scope.e;
//     //}



//     });



    // var app = angular.module("geo", ["ui.map", "ui.event"])
    // .controller("mainController", function ($scope) {
    //     $scope.lat = "0";
    //     $scope.lng = "0";
    //     $scope.accuracy = "0";
    //     $scope.error = "";
    //     $scope.model = { myMap: undefined };
    //     $scope.myMarkers = [];

    //     $scope.showResult = function () {
    //         return $scope.error == "";
    //     }

    //     $scope.mapOptions = {
    //         center: new google.maps.LatLng($scope.lat, $scope.lng),
    //         zoom: 15,
    //         mapTypeId: google.maps.MapTypeId.ROADMAP
    //     };

    //     $scope.showPosition = function (position) {
    //         $scope.lat = position.coords.latitude;
    //         $scope.lng = position.coords.longitude;
    //         $scope.accuracy = position.coords.accuracy;
    //         $scope.$apply();

    //         var latlng = new google.maps.LatLng($scope.lat, $scope.lng);
    //         $scope.model.myMap.setCenter(latlng);
    //         $scope.myMarkers.push(new google.maps.Marker({ map: $scope.model.myMap, position: latlng }));
    //     }

    //     $scope.showError = function (error) {
    //         switch (error.code) {
    //             case error.PERMISSION_DENIED:
    //                 $scope.error = "User denied the request for Geolocation."
    //                 break;
    //             case error.POSITION_UNAVAILABLE:
    //                 $scope.error = "Location information is unavailable."
    //                 break;
    //             case error.TIMEOUT:
    //                 $scope.error = "The request to get user location timed out."
    //                 break;
    //             case error.UNKNOWN_ERROR:
    //                 $scope.error = "An unknown error occurred."
    //                 break;
    //         }
    //         $scope.$apply();
    //     }

    //     $scope.getLocation = function () {
    //         if (navigator.geolocation) {
    //             navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
    //         }
    //         else {
    //             $scope.error = "Geolocation is not supported by this browser.";
    //         }
    //     }

    //     $scope.getLocation();
    // });

