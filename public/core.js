$(document).ready(function () {
    $(document).foundation();
    
    // Create Global to hold modal window ref
    window.gSearchModal = new Foundation.Reveal($('#searchModeModal'));
    window.gDeckModal = new Foundation.Reveal($('#deckSetupModal'));
    window.gactiveDeck = new Deck("base", "unknown");
    window.gDecks = [];
    
    // Launch Modal
    $("#modalLauncher").click(function(e) {
        gSearchModal.open();
    });
    
    $("#deckBuilderLauncher").click(function(e) {
        gDeckModal.open();
    });
    
    // Toggle accordion
    $("#accordionLauncher").click(function(e) {
        $("#myAccordion").foundation('toggle',$("#item1"));
    });
    
});

// Setup hstone module
var hstone = angular.module('hstone', ['ngRoute', 'ngCookies']);

hstone.config(function ($routeProvider, $locationProvider) {
//    $locationProvider.hashPrefix('');
    $routeProvider
    .when('/', {
        templateUrl: 'pages/main.html',
        controller: 'mainController'
    })
    .when('/search', {
        templateUrl: 'pages/cardSearch.html',
        controller: 'mainController'
    })
    .when('/buildme', {
        templateUrl: 'pages/currentDeck.html',
        controller: 'buildController'
    })
    .when('/decks', {
        templateUrl: 'pages/deckGallery.html',
        controller: 'buildController'
    })
});

// Deck Builder controller
hstone.controller("buildController", ['$scope', '$log', function($scope, $log) {
    $scope.scopeName = "Build";
    
    // Load Deck
    $scope.load();
}]);

// Main Controller
hstone.controller('mainController', ['$scope', '$http', '$location', '$cookies', function ($scope, $http, $location, $cookies) {
    // Formdata that user fills out
    $scope.formData = {};
    
    // Method to search a card by
    $scope.searchType = undefined;
    
    // Names of
    $scope.nameOfClasses = [];
    $scope.nameOfTypes = [];
    $scope.nameOfSets = [];
    
    $scope.decks = [];
    $scope.activeDeckNumber = 0;
    
    $http.get('/').then(
        function onSuccess(res) {        
            $scope.setUp();
        },
        function onError(res) {
           console.log('Error: ' + res.data);
        }
    );
    
    $scope.createDeck = () => {
        if($scope.decks.length >= 8) {
            console.log("To Many Decks saved, delete one first.");
        }
        
        // Check that form has been filled out if not return error message
        if($scope.formData.deckName == null || $scope.formData.playerClass == null) {
            console.log("Could not create deck");
            return false;
        }
        
        window.gactiveDeck = new Deck($scope.formData.deckName, $scope.formData.playerClass);
        $scope.decks.push(window.gactiveDeck);
        $scope.activeDeckNumber = $scope.decks.length-1;
        
        // Close Modal
        window.gDeckModal.close();
        
        $scope.save();
        return true;
    };
    
    $scope.failedCardFind = () => {
        console.log("could not find card");
        
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

                    if(res.data.length == undefined) { $scope.failedCardFind(); }

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
                    if(res.data.length == undefined) { $scope.failedCardFind(); }
                    
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
                    if(res.data.length == undefined) { $scope.failedCardFind(); }
                    
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
                    if(res.data.length == undefined) { $scope.failedCardFind(); }
                    
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
        
        // Change view to search so we can see the results
        $location.path('/search');
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
        
        for(var i = 0; i < cardArray.length && $scope.cardsOnDisplay.length < 16; i++) {
            if(cardArray[i].img && cardArray[i].text) {
                $scope.cardsOnDisplay.push(cardArray[i]);
            }
        }
        console.log($scope.cardsOnDisplay);
    };
    
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
    
    $scope.addToDeck = (index) => {        
        if($scope.getActiveDeck())
            $scope.decks[$scope.activeDeckNumber].addCard($scope.cardsOnDisplay[index]);
        
        $scope.save();
    };
    
    $scope.setActivetDeck = (index) => {
        $scope.activeDeckNumber = index;
        $scope.save();
    };
    
    $scope.getActiveDeck = () => {
        if($scope.activeDeckNumber >= 0) {
            return $scope.decks[$scope.activeDeckNumber];
        }
        return null;
    };
    
    // Save deck data to local storage
    $scope.save = () => {      
        // Local Storage        
        window.localStorage.setItem("Decks", JSON.stringify($scope.decks));
        window.localStorage.setItem("LastActiveDeck", $scope.activeDeckNumber.toString());
    };
    
    // Load deck data from local storage
    $scope.load = () => {
        $scope.decks = JSON.parse(window.localStorage.getItem("Decks"));
        
        // Creates Deck Objects
        for(var i = 0; i < $scope.decks.length; i++) {
            var temp = new Deck($scope.decks[i].name, $scope.decks[i].playerClass);
            temp.deck = $scope.decks[i].deck;
            $scope.decks[i] = temp;
        }
        
        $scope.activeDeckNumber = parseInt(window.localStorage.getItem("LastActiveDeck"));
        $scope.setActivetDeck($scope.activeDeckNumber);
    };
    
    // Clear Decks
    $scope.clearDeck = () => {        
        $scope.decks = [];
        $scope.activeDeckNumber = -0;
        $scope.save();
    };
    
    $scope.load();
}]);
