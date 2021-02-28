export class Util {

  private static readonly files: string = 'abcdefgh';

  public static algebraicToIndex(algebraic: string): number {
    const file: number = this.files.indexOf(algebraic[0]);
    const rank: number = +(algebraic[1]);
    return file + 8 * (8 - rank);
  }

  public static indexToAlgebraic(index: number): string {
    const file: number = index % 8;
    const rank: number = 8 - Math.floor(index / 8);
    return this.files[file] + rank;
  }

  public static IsAlgebraic(text: string): boolean {
    return /[a-h][1-8]/.test(text);
  }

}
