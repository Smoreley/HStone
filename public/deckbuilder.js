// Deck
class Deck {
    constructor(name, playerClass) {
        this.name = name;
        this.playerClass = playerClass;
        this.deck = [];
    }
    
    getDeck() { return this.deck; }
    
    getClass() { return this.playerClass; }
    
    // Add card to deck (sorts them by cost)
    addCard(cardInfo) {
        // Block adding more then 99 cards to deck
        // or if card class doesn't match this deck and it is not Neutral
        if(this.deck.length >= 99 || cardInfo.playerClass != this.playerClass && cardInfo.playerClass != "Neutral")
        {
            return false;
        }
        
        // put the card in the right location (splice it into the middle if the cost is < or > then others)
        for(var i=0; i < this.deck.length; i++) {            
            if(cardInfo.cost > this.deck[i].cost) {
                continue;
            } else {
                this.deck.splice(i, 0, cardInfo);
                return true;
            }
        }
        
        this.deck.push(cardInfo);
        return true;
    }
    
    // Removes card by info
    removeByInfo(cardInfo) {
        // Find Card index
        for(var i=0; i < this.deck.length; i++) {
            if(cardInfo.cardId === this.deck[i].cardId ) {
                this.deck.splice(i,1);
                return true;
            }
        }
        return false;
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