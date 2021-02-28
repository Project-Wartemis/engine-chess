import { Action } from './action';
import { LogFactory } from './log';

const { Chess } = require('chess.js');

const LOG = LogFactory.getLogger('State');

export class State {

  private static readonly engine = new Chess();

  private players: Array<string>;
  private readonly board: any;

  public fen: string;

  constructor(players: Array<string>) {
    this.players = players;
    this.fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    this.board = new Chess(this.fen);
  }

  public getPlayerToMove(): string {
    const index = this.board.turn() === 'w' ? 0 : 1;
    return this.players[index];
  }

  public isValidMove(action: Action): boolean {
    const actions: Array<Action> = this.board.moves({
      verbose: true
    });
    for(const a of actions) {
      if(Action.equals(action, a)) {
        return true;
      }
    }
    return false;
  }

  public makeMove(action: Action): void {
    LOG.info(`making move ${action.from} -> ${action.to} : ${action.promote}`);
    this.board.move(action);
    this.fen = this.board.fen();
    LOG.info(`fen = ${this.fen}`);
  }

  public isGameOver(): boolean {
    return this.board.game_over();
  }

}
