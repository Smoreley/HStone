
// Setup hstone module
var hstone = angular.module('hstone', [])

.controller('mainController', ['$scope', '$http', function ($scope, $http) {
    $scope.formData = {};
    
    $http.get('/').then(
    function onSuccess(res){
        $scope.myData = res.data
        
        
        $scope.helloTo = {};
        $scope.helloTo.title = "AngularJS";
        
        console.log("WE did it");
    },
    function onError(res) {
       console.log('Error: ' + res.data);
    });
    
    $scope.findCard = function() {
        $scope.page = {};
        $scope.page.title = $scope.formData.text;
        
        // Sending post request to find card
        $http.post('/findcard', $scope.formData).then(
        function onSuccess(res) {
//            console.log(res.data);
//            console.log(JSON.stringify(res.data) );
//            $scope.helloTo.title = res.data;
            
            var index = 0;
            console.log(res.data.length);
            while(index < res.data.length) {
                if(res.data[index].img != undefined) {               
                    $scope.page.cardName = res.data[index].name;
                    $scope.page.cardType = res.data[index].type;
                    $scope.page.cardClass = res.data[index].playerClass;
                    
                    $scope.page.cardRace = res.data[index].race;
                    $scope.page.cardCost = res.data[index].cost;
                    $scope.page.cardHealth = res.data[index].health;
                    
                    $scope.page.cardAttack = res.data[index].attack;
                    $scope.page.cardFlavor = res.data[index].flavor;
                    $scope.page.cardSet = res.data[index].cardSet;
                    
                    $scope.page.image = res.data[index].img;
                    break;
                }
                index+= 1;
            }
        },
        function onError(res) {
            console.log("Unable to get the data ERROR!");
        })
    };
    
}]);
