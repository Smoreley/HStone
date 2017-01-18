$(document).ready(function () {
    $(document).foundation();
    
    // Create Global to hold modal window ref
    window.gSearchModal = new Foundation.Reveal($('#searchModeModal'));
    window.gDeckModal = new Foundation.Reveal($('#deckSetupModal'));
    window.gCardDeck = new Deck("base", "unknown");
    
    
    $("#modalLauncher").click(function(e) {
        gSearchModal.open();
    });
    
    // Toggle accordion
    $("#accordionLauncher").click(function(e) {
        $("#myAccordion").foundation('toggle',$("#item1"));
    });
    
    $("#deckBuilderLauncher").click(function(e) {
        gDeckModal.open();
    });
      
});

// Setup hstone module
var hstone = angular.module('hstone', ['ngRoute']);

hstone.config(function ($routeProvider, $locationProvider) {
//    $locationProvider.hashPrefix('');
    $routeProvider
    .when('/', {
        templateUrl: 'pages/card.html',
        controller: 'mainController'
    })
    .when('/buildme', {
        templateUrl: 'pages/build.html',
        controller: 'buildController'
    })
    .when('/decks', {
        templateUrl: 'pages/decks.html'
    })
});

// Deck Builder controller
hstone.controller("buildController", ['$scope', '$log', function($scope, $log) {
    $scope.scopeName = "Build";
    
    console.log($scope);
    
}]);

// Main Controller
hstone.controller('mainController', ['$scope', '$http', function ($scope, $http) {
    $scope.scopeName = "Main";
    $scope.formData = {};
    
    // Method to search a card by
    $scope.searchType = undefined;
    
    // Names of
    $scope.nameOfClasses = [];
    $scope.nameOfTypes = [];
    $scope.nameOfSets = [];
    
    // Array of cards currently loaded
//    $scope.cardsOnDisplay = [];
    
    $http.get('/').then(
        function onSuccess(res) {        
            $scope.setUp();
        },
        function onError(res) {
           console.log('Error: ' + res.data);
        }
    );
    
    $scope.searchCard = () => {
        console.log("Search Button was pressed");
    };
    
    $scope.createDeck = () => {
        console.log("Deck Builder");
        window.gCardDeck = new Deck($scope.formData.deckName, $scope.formData.playerClass);
        $scope.cardDeck = window.gCardDeck;
        
        // Close Modal
        window.gDeckModal.close();
    };
    
    $scope.setCurrentDeck = () => {
        
    };
    
    $scope.findCard = () => {
        $scope.page = {};
        $scope.page.title = $scope.formData.text;        
        console.log($scope.formData);
        
        switch($scope.searchType) {
            case "Name":
                console.log("Search Type Name");
                // Sending post request to find card
                $http.post('/findCardByName', $scope.formData).then(
                function onSuccess(res) {
        //            console.log(res.data);
        //            console.log(JSON.stringify(res.data) );
        //            $scope.helloTo.title = res.data;

                    if(res.data.length == undefined) { console.log("no Cards"); }

                    $scope.cardProccess(res.data);
                    $scope.displayCard($scope.cardsOnDisplay[0]);
                },
                function onError(res) {
                    console.log("Unable to get the data ERROR!");
                });
                
                break;
            case "Class":         
                console.log("Search Type Class");
                // Sending post request to find card by Class
                $http.post('/findCardByClass', $scope.formData).then(
                function onSuccess(res) {
                    if(res.data.length == undefined) { console.log("no Cards"); }
                    
                    $scope.cardProccess(res.data);
                    $scope.displayCard($scope.cardsOnDisplay[0]);
                },
                function onError(res) {
                    console.log("Unable to get the data ERROR!");
                });
                
                break;
            case "Type":                
                console.log("Search Type Type");
                // Sending post request to find card by TYpe
                $http.post('/findCardByType', $scope.formData).then(
                function onSuccess(res) {
                    if(res.data.length == undefined) { console.log("no Cards"); }
                    
                    $scope.cardProccess(res.data);
                    $scope.displayCard($scope.cardsOnDisplay[0]);
                },
                function onError(res) {
                    console.log("Unable to get the data ERROR!");
                });
                
                break;
            case "Set":
                console.log("Search Type Set");
                // Sending post request to find card by TYpe
                $http.post('/findCardBySet', $scope.formData).then(
                function onSuccess(res) {
                    if(res.data.length == undefined) { console.log("no Cards"); }
                    
                    $scope.cardProccess(res.data);
                    $scope.displayCard($scope.cardsOnDisplay[0]);
                },
                function onError(res) {
                    console.log("Unable to get the data ERROR!");
                });
                break;
            default:
                console.log("ERROR! Invalid search type given");
        } 
    };
    
    $scope.setSearchType = (searchType) => {
        $("#cardNameForm").hide();
        $("#playerClassForm").hide();
        $("#cardTypeForm").hide();
        $("#cardSetForm").hide();
        $("#attackHealthCostForm").show();
        
        // Set Search Type
        $scope.searchType = searchType;
        
        // Show the correct form
        switch($scope.searchType) {
            case "Name":
                $("#cardNameForm").show();
                $("#attackHealthCostForm").hide();
                break;
            case "Class":
                $("#playerClassForm").show();
                break;
            case "Type":
                $("#cardTypeForm").show();
                break;
            case "Set":
                $("#cardSetForm").show();
                break;       
        }
        
        // Open Accordion
        $("#myAccordion").foundation('down',$("#item1"));
        // Close Modal
        gSearchModal.close();
    };
    
    // Proccess card before adding them to display Array
    $scope.cardProccess = (cardArray) => {
        // Clear Array
        $scope.cardsOnDisplay = [];
        
        for(var i = 0; i < cardArray.length && $scope.cardsOnDisplay.length <= 8; i++) {
            if(cardArray[i].img && cardArray[i].text) {
                $scope.cardsOnDisplay.push(cardArray[i]);
            }
        }
        
        console.log($scope.cardsOnDisplay);
    }
    
    // Display card data
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
    };
    
    // Populate drop down forms for search
    $scope.setUp = () => {
        $http.post('/getInfo', $scope.formData)
        .then(function onSuccess(res) {
            $scope.nameOfClasses = res.data.classes;
            $scope.nameOfTypes = res.data.types;
            $scope.nameOfSets = res.data.standard;
        },
        function onError(res) {
            console.log("\tError: Unable to get info");
        });
    };
    
    $scope.addToDeck = (card) => {
//        window.gCardDeck.addCard(res.data[index]);
        
        if(window.gCardDeck != null)
            window.gCardDeck.addCard($scope.cardsOnDisplay[0]);
    };
    
}]);
