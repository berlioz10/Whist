import { Round } from './round';
export class Player {

    constructor(name: string) {
        this.name = name
        this.turn = false
        this.points = 0
        this.rounds = []
    }

    name: string;
    turn: boolean;
    points: number;
    rounds: Round[];

    public calculate_round(roundnumber: number): void {
        this.points += this.rounds[roundnumber].calculate()
        if(roundnumber >= 4)
        {
            for(var i = roundnumber - 4; i < roundnumber; i++)
            {
                if(this.rounds[roundnumber].calculate() * this.rounds[i].calculate() < 0 || this.rounds[i].ten_points == true)
                    return
            }
            if(this.rounds[roundnumber].calculate() < 0)
            {
                this.points -= 10
            }
            else
            {
                this.points += 10
            }

            for(var i = roundnumber - 4; i <= roundnumber; i++)
            {
                this.rounds[i].ten_points = true
            }
        }
    }
}