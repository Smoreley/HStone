
// Setup hstone module
var hstone = angular.module('hstone', [])

.controller('mainController', ['$scope', '$http', function ($scope, $http) {
    $scope.formData = {};
    
    $http.get('/').then(
    function onSuccess(resp){
        $scope.myData = resp.data
        
        
        $scope.helloTo = {};
        $scope.helloTo.title = "AngularJS";
        
        console.log("WE did it");
    },
    function onError(resp) {
       console.log('Error: ' + resp.data);
    });
    
    $scope.createTodo = function(data) {
        $scope.page = {};
        $scope.page.title = $scope.formData.text;
        
        // Sending post request to find card
        $http.post('/findcard').then(
        function onSuccess(resp) {
            console.log("we have gotten the data");
//            console.log(resp.data);
            
            console.log(JSON.stringify(resp.data) );
//            $scope.helloTo.title = resp.data;
            $scope.page.cardData = resp.data.Basic[0];
            $scope.page.image = resp.data.Basic[0].img;
        },
        function onError(resp) {
            console.log("Unable to get the data ERROR!");
        })
    };
    
//    $scope.createTodo = function() {
//		$http.post('/api/todos', $scope.formData)
//			.success(function(data) {
//				$scope.formData = {}; // clear the form so our user is ready to enter another
//				$scope.todos = data;
//				console.log("Doing the dead");
//			})
//			.error(function(data) {
//				console.log('Error: ' + data);
//			});
//	};
    
}]);
