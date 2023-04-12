export default class ParsedQR {
  keyCounter?: number;
  weight?: number;

  constructor(keyCounter?: number, weight?: number) {
    this.keyCounter = keyCounter;
    this.weight = weight;
  }

  hasData() {
    return this.keyCounter !== undefined && this.weight !== undefined;
  }

  toString() {
    const data = this.hasData()
      ? `{ keyCounter: ${this.keyCounter}, weight: ${this.weight}g }`
      : "no data";
    return `ParsedQR(${data})`;
  }
}
