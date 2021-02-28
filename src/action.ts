export class Action {

  public from: string;
  public to: string;
  public promote?: string;

  constructor(from: string, to: string) {
    this.from = from;
    this.to = to;
  }

  public static equals(first: Action, second: Action): boolean {
    return first.from === second.from && first.to === second.to && (first.promote === undefined || first.promote === second.promote);
  }

}
