import { element } from 'protractor';
import { SetPlayersService } from './set-players.service';
import { Injectable } from '@angular/core';
import { Player } from './player';
import { Observable, of } from 'rxjs';
import { exception } from 'console';

@Injectable({
  providedIn: 'root'
})
export class PlayerRoundService {
  public players: Player[]
  betHand: boolean
  playersTurn: number
  firstPlayer: number
  roundsnumber: number

  rounds_number_score: number[]

  constructor() { }

  setUp(players: Player[]):void {
    this.players = players
    this.first()
  }

  first(): void {
    this.betHand = true
    this.firstPlayer = 0
    this.playersTurn = 0
    this.roundsnumber = 0
    this.players[this.playersTurn].rounds[this.roundsnumber].bet = true
  }

  verifyRound(): boolean {

    if((this.firstPlayer + this.players.length - 1) % this.players.length == this.playersTurn)
    {
      var sum:number = 0
      this.players.forEach(element => {
        sum += element.rounds[this.roundsnumber].hands_bet
      });

      if(sum == this.players[0].rounds[this.roundsnumber].round)
        return false
    }
    return true
  }

  next(): void {
    // if the made hand was finished, than we can calculate the result and put it in the score
    if(this.betHand == false)
    {
      this.players[this.playersTurn].calculate_round(this.roundsnumber)
    }

    // make both false cause we finished with the player's decision
    this.players[this.playersTurn].rounds[this.roundsnumber].bet = false
    this.players[this.playersTurn].rounds[this.roundsnumber].made = false

    // next player
    this.playersTurn = (this.playersTurn + 1) % this.players.length
    
    if(this.playersTurn == this.firstPlayer) {
      if(this.betHand == true)
      {
        this.betHand = false
      }
      else
      {
        this.firstPlayer = (this.firstPlayer + 1) % this.players.length
        this.playersTurn = this.firstPlayer
        this.roundsnumber = this.roundsnumber + 1
        this.betHand = true
      }
    }

    // if it is bet's turn or made's turn
    this.betHand == true
      ? this.players[this.playersTurn].rounds[this.roundsnumber].bet = true 
      : this.players[this.playersTurn].rounds[this.roundsnumber].made = true 
  }

  previous(): void {

  }

  repeatRound(): void {
    this.players[this.playersTurn].rounds[this.roundsnumber].bet = false
    this.players[this.playersTurn].rounds[this.roundsnumber].made = false
    this.betHand == true
    this.playersTurn = this.firstPlayer
    this.players[this.playersTurn].rounds[this.roundsnumber].bet = true
  }
  
  firstPlayerName(): string {
    return this.players[this.firstPlayer].name
  }
}
