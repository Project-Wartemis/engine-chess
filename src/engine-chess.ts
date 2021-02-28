import { Engine } from 'wartemis';
import { Action } from './action';
import { State } from './state';
import { Util } from './util';
import { LogFactory } from './log';

const LOG = LogFactory.getLogger('EngineChess');

export class EngineChess extends Engine<State, Action> {

  constructor() {
    super('Chess');
  }

  public start(): void {
    super.start();
    LOG.info('Started');
  }

  public generateInitialState(players: Array<string>): State {
    return new State(players);
  }

  public getPlayersToMove(state: State): Array<string> {
    return [state.getPlayerToMove()];
  }

  public validateAction(state: State, player: string, action: Action): string | null {
    if(!Util.IsAlgebraic(action.from)) {
      return `from is not in algebraic notation : ${action.from}`;
    }
    if(!Util.IsAlgebraic(action.to)) {
      return `to is not in algebraic notation : ${action.to}`;
    }
    if(!state.isValidMove(action)) {
      return `${action.from} -> ${action.to} is not a valid action`;
    }
    return null;
  }

  public processActions(state: State, actions: Map<string, Action>): State {
    for(const action of actions.values()) {
      state.makeMove(action);
    }
    return state;
  }

  public isGameOver(state: State, turn: number): boolean {
    if(turn > 50) {
      return true;
    }
    return state.isGameOver();
  }

}
