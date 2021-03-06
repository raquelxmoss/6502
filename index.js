export class VM {
  constructor () {
    this.REGISTERS = {
      A: '',
      X: '',
      Y: '',
      S: { C: 0, Z: 0, I: 0, D: 0, B: 0, V: 0, N: 0},
      PC: 0,
    }
    this.MEMORY = new Array(65535);
  }

  registers () {
    return this.REGISTERS;
  }

  memory () {
    return this.MEMORY;
  }

  mapCommand (value) {
    return {
      169: 'LDA',
      133: 'STA'
    }[value]
  }

  run (input) {
    const [ opCode, value ] = input;
    const command = this.mapCommand(opCode);

    if (!this[command]) { throw new Error('command not implemented :-('); }

    this.setMemory(opCode);
    this[command](value);
  }

  setMemory (value, location) {
    location = location || this.MEMORY.findIndex(loc => loc == undefined);
    this.MEMORY[location] = value;
  }

  incrementPC (amount = 1) {
    this.REGISTERS.PC = this.REGISTERS.PC + amount;
  }

  LDA (value) {
    this.REGISTERS.A = value;

    const Z = isZeroValue(value);

    this.setMemory(value);
    this.incrementPC(2);
    this.REGISTERS.S = {...this.REGISTERS.S, Z };
  }

  // stores the contents of the A register
  // into memory
  STA (location) {
    this.setMemory(this.REGISTERS.A, location);
  }
}

function isZeroValue (value) {
  if (value == '0') return 1;
  if (value == '00') return 1;
  return 0;
}
