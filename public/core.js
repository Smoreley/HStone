$(document).ready(function () {
    $(document).foundation();
    
    $("#modalLauncher").click(function (e) {
        new Foundation.Reveal($('#myModal')).open();
    });
    
    
});


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
    
    $scope.searchCard = () => {
        console.log("Search Button was pressed");
    }
    
    $scope.deckBuild = () => {
        console.log("Deck Builder");
    }
    
    $scope.findCard = () => {
        $scope.page = {};
        $scope.page.title = $scope.formData.text;
        
        console.log($scope.formData);
        
        switch($scope.formData.searchType) {
            case "Name":
                console.log("Search Type Name");
                break;
            case "Class":
                console.log("Search Type Class");
                break;
            case "Type":
                console.log("Search Type Type");
                break;
            case "Set":
                console.log("Search Type Set");
                break;
            default:
                console.log("ERROR! Invalid search type given");
        }
        
        // Sending post request to find card
        $http.post('/findCardByName', $scope.formData).then(
        function onSuccess(res) {
//            console.log(res.data);
//            console.log(JSON.stringify(res.data) );
//            $scope.helloTo.title = res.data;
            console.log("cardLenght "+res.data.length);
            if(res.data.length == undefined) {
                console.log("no Cards");
            }
            
            var index = 0;
            while(index < res.data.length) {
                if(res.data[index].img && res.data[index].flavor) {               
                    $scope.displayCard(res.data[index]);
                    break;
                }
                index+= 1;
            }
        },
        function onError(res) {
            console.log("Unable to get the data ERROR!");
        })
    };
    
    // Display card
    $scope.displayCard = (data) => {
        $scope.page.cardName = data.name;
        $scope.page.cardType = data.type;
        $scope.page.cardClass = data.playerClass;

        $scope.page.cardRace = data.race;
        $scope.page.cardCost = data.cost;
        $scope.page.cardHealth = data.health;

        $scope.page.cardAttack = data.attack;
        $scope.page.cardFlavor = data.flavor;
        $scope.page.cardSet = data.cardSet;

        $scope.page.image = data.img;
    }
    
}]);
