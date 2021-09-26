import { element } from 'protractor';
import { Round } from './round';
import { Observable, of } from 'rxjs';
import { Player } from './player';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SetPlayersService {
  private players:Player[] = []
  constructor() { }

  public add(name_player:string): void {
    var player = new Player(name_player)
    this.players.push(player)
  }

  public remove(): void {
    var player = this.players.pop()
  }

  public removeSpecific(player:Player): void {
    this.players.forEach((element, index) => {
      if(player.name == element.name) this.players.splice(index, 1)
    });
  }

  public getall(): Observable<Player[]> {
    return of(this.players)
  }

  public existPlayerName(name_player: string): boolean {
    return (this.players.find(element => {
      return element.name == name_player
    }) === undefined) ? false : true;
  }

  /*
  public getspecific(position: number): Observable<Player> {
    return of(this.players[position])
  }*/

  setRounds(number_of_players: number): void {
    for(var i = 0; i < this.players.length; i++)
    {
      for(var j = 1; j <= number_of_players; j++)
        this.players[i].rounds.push(new Round(1))
      
      for(var j = 2; j <= 7; j++)
        this.players[i].rounds.push(new Round(j))
      
      for(var j = 1; j <= number_of_players; j++)
        this.players[i].rounds.push(new Round(8))

      for(var j = 7; j >= 2; j--)
        this.players[i].rounds.push(new Round(j))
        
      for(var j = 1; j <= number_of_players; j++)
        this.players[i].rounds.push(new Round(1))
    }
  }
}
