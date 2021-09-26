import { PlayerRoundService } from './../player-round.service';
import { Player } from './../player';
import { SetPlayersService } from './../set-players.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-players',
  templateUrl: './display-players.component.html',
  styleUrls: ['./display-players.component.css']
})
export class DisplayPlayersComponent implements OnInit {
  name:string = "Unkown"
  startGame: boolean = false
  dealer: string
  players:Player[] = []

  constructor(private setPlayersService:SetPlayersService, private playerRoundService: PlayerRoundService) {
    playerRoundService  
   }

  ngOnInit(): void {
    this.getall()
    this.setPlayersService.add("Hemlo")
    this.setPlayersService.add("Bogdan")
    this.setPlayersService.add("Bestea")
  }

  add():void {
    this.setPlayersService.existPlayerName(this.name) == true
    ? this.attention("There is another player with that name") : this.setPlayersService.add(this.name)

    /* This code maybe will help you later 
    this.setPlayersService.getspecific(this.players.length - 1).subscribe(player => this.players[this.players.length - 1] = player)
    */
  } 
  remove():void {
    this.players[this.players.length -  1]
    this.setPlayersService.remove()
  }

  getall(): void {
    this.setPlayersService.getall().subscribe(players => this.players = players)
  }

  start(): void {
    //console.log(this.players[0].rounds.length);

    (this.players.length >= 3 && this.players.length <= 6)
    ? (this.setPlayersService.setRounds(this.players.length),
      this.startGame=true,
      this.playerRoundService.setUp(this.players),
      this.dealer = this.playerRoundService.firstPlayerName()) 
    : this.attention("There must be between 3 or 6 players")
  }

  next(): void {
    try
    {
      if(this.playerRoundService.verifyRound() == true)
      {
        this.playerRoundService.next()
        this.dealer = this.playerRoundService.firstPlayerName()
      }
      else
      {
        this.attention("There must not be the points added equal to the number of round >:(")
      }
    }
    catch(err)
    {
    }
  }
  repeatRound(): void {
    this.playerRoundService.repeatRound()
  }

  attention(message: string): void {
    alert(message)
  }
}
