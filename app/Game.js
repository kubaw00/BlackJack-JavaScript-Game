import { Deck } from "./Deck.js";
import { Message } from "./Message.js";
import { Player } from "./Player.js";
import { Table } from "./Table.js";

const playersCards = document.getElementById('playersCards');
const dealersCards = document.getElementById('dealersCards');
const hitButton = document.getElementById('hit');
const standButton = document.getElementById('stand');
const dealerPoints = document.getElementById('dealerPoints');
const playerPoints = document.getElementById('playerPoints');

class Game {
    constructor(table, player, hitButton, standButton, playerPoints, dealerPoints, messageBox){
        this.hitButton = hitButton;
        this.standButton = standButton;
        this.playerPoints = playerPoints;
        this.dealerPoints = dealerPoints;
        this.dealer = new Player('Krupier')
        this.player = player;
        this.table = table;
        this.deck = new Deck();
        this.deck.schuffle();
        this.hitCard = this.hitCard.bind(this);
        this.dealerPlays = this.dealerPlays.bind(this);
        this.messageBox = messageBox;
    }

    run() {
        this.hitButton.addEventListener('click', this.hitCard)
        this.standButton.addEventListener('click', this.dealerPlays)
        this.dealCards();  
    }
    
    hitCard() {
        
        const card = this.deck.pickOne();
        this.player.hand.addCard(card);
        this.table.showPlayersCard(card);
        this.playerPoints.innerHTML = this.player.calculatePoints();
        this.dealerPoints.innerHTML = this.dealer.calculatePoints();
        
        if(this.player.points > 21){
            this.messageBox.setText('Wygrywa Krupier!').show();
            this.hitButton.removeEventListener('click', this.hitCard);
            this.standButton.removeEventListener('click', this.dealerPlays);
            return;
        }

    }

    //wybranie 2 kart i wyświetlenie na ekranie
    dealCards() {
        for(let n = 0; n < 2; n++){
            // wybranie 1-szej karty z tablicy
            const card1 = this.deck.pickOne();
            //dodanie karty pierwszej z góry do nowej tablicy
            this.player.hand.addCard(card1);
            this.table.showPlayersCard(card1)

            //to samo dla krupiera
            const card2 = this.deck.pickOne();
            this.dealer.hand.addCard(card2);
            this.table.showDealersCard(card2)
            
        }

        this.playerPoints.innerHTML = this.player.calculatePoints();
        this.dealerPoints.innerHTML = this.dealer.calculatePoints();
    }

    //dodanie karty przez krupiera gdy kliknie się przcisk 'zostaję'
    dealerPlays() {
        while( this.dealer.points <= this.player.points && this.dealer.points < 21 && this.player.points <= 21){
            const card = this.deck.pickOne();
            this.dealer.hand.addCard(card);
            this.table.showDealersCard(card);
            this.dealerPoints.innerHTML = this.dealer.calculatePoints();
        }

        this.endTheGame()
    }

    //zakończenie gry - warunki
    endTheGame() {
        this.hitButton.removeEventListener('click', this.hitCard);
        this.standButton.removeEventListener('click', this.dealerPlays);

        this.hitButton.style.display = 'none';
        this.standButton.style.display = 'none';

        if(this.player.points <= 21 && this.player.points === this.dealer.points){
            this.messageBox.setText('Remis').show();
            return;
        }
        if(this.player.points > 21){
            this.messageBox.setText('Wygrywa Krupier!').show();
            return;
        }

        if(this.dealer.points > 21){
            this.messageBox.setText('Wygrywasz!!!').show();
            return;
        }
        if(this.player.points < this.dealer.points) {
            this.messageBox.setText('Wygrywa Krupier!').show();
            return;
        }
    }


}

const table = new Table(playersCards, dealersCards);
const messageBox = new Message(document.getElementById('message'));


const player = new Player('Kuba');
const game = new Game(table, player, hitButton, standButton, playerPoints, dealerPoints, messageBox);
game.run();