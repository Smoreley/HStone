// Deck
class Deck {
    constructor(name, deckClass) {
        this.name = name;
        this.deckClass = deckClass;
        this.deck = [];
    }
    
    getDeck() {
        return this.deck;
    }
    
    // Add card to deck (sorts them by cost)
    addCard(cardInfo) {
        // Block adding more then 99 cards to deck
        // or if card class doesn't match this deck and it is not Neutral
        if(this.deck.length >= 99 || cardInfo.playerClass != this.deckClass && cardInfo.playerClass != "Neutral") { return;}
        
        for(var i=0; i < this.deck.length; i++) {            
            if(cardInfo.cost > this.deck[i].cost) {
                continue;
            } else {
                this.deck.splice(i, 0, cardInfo);
                return;
            }
        }
        
        this.deck.push(cardInfo);
    }
    
    // Removes card by info
    removeByInfo(cardInfo) {
        // Find Card index
        for(var i=0; i < this.deck.length; i++) {
            if(cardInfo.cardId === this.deck[i].cardId ) {
                this.deck.splice(i,1);
                return;
            }
        }
    }
    
    // Removes card given by index
    removeByIndex(index) {
        // Remove it from array
        this.deck.splice(index, 1);
    }
    
    test() {
        console.log("This is a deck test");
    }
    
}