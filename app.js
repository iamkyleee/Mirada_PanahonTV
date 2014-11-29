    

//var rand = Math.floor(Math.random * 20) + 1;

// var app = angular.module('app', []  )
// app.controller('feedCtrl', function ($scope, $http) {

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

var app = angular.module('ToDo', []).controller('feedCtrl', function ($scope, $http) {
    $http.get('https://spreadsheets.google.com/feeds/list/0ArLmqAWjjIKmdDNmN1dxUEFvei1LUlRGejMyUVVCa2c/od6/public/basic?alt=json').success(function (data) {
        $scope.apiFeed = data;
        $scope.feed = data.feed;
        $scope.entry = data.feed.entry;
        $scope.title = data.feed.entry.title;
        $scope.content = data.feed.entry.content;
        
        var rand = Math.floor(Math.random() * data.feed.entry.length) + 1;
        $scope.quote = rand;
        $scope.randomQuote = data.feed.entry[rand].title.$t;

        $scope.getContent = data.feed.entry[rand].content.$t.substring(12, 40);

        $scope.generateRandom = function () {
            var rand2 = Math.floor(Math.random() * data.feed.entry.length) + 1;
            $scope.ran = data.feed.entry[rand2].title.$t;
            $timeout(rand, 100);
        }
    });
});