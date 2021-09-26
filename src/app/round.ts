export class Round {
    constructor(round: number) {
        this.hands_made = 0
        this.hands_bet = 0
        this.round = round
        this.bet = false
        this.made = false
        this.ten_points = false
    }


    public bet: boolean;
    public made: boolean;
    public ten_points: boolean;
    public hands_bet: number;
    public hands_made: number;
    public round: number;

    public calculate(): number {
        return (this.hands_bet == this.hands_made) ? (5 + this.hands_bet) : Math.abs(this.hands_bet - this.hands_made) * (-1)
    }
}