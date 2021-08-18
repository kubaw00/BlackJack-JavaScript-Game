import { Types, Card, Weights } from "./Card.js";



export class Deck {
    cards = [];

    //tworzenie tali kart
    constructor() {
        Types.forEach( type => 
            Weights.forEach( weight => this.cards.push(new Card(weight, type))))
    }

    //tasowanie kart
    schuffle() {
        for (let i = this.cards.length - 1; i >0; i-- ){
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }

        return this.cards;
    }
    //wybór pierszej karty z góry
    pickOne() {
        return this.cards.shift();
    }
    
}



