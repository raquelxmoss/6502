export class VM {
  constructor () {
    this.REGISTERS = {
      A: '',
      X: '',
      Y: '',
      S: { C: 0, Z: 0, I: 0, D: 0, B: 0, V: 0, N: 0},
      PC: 1536,
    }
    this.MEMORY = '';
  }

  registers () {
    return this.REGISTERS;
  }

  mapCommand (value) {
    return {
      169: 'LDA'
    }[value]
  }

  run (input) {
    const [ opCode, value ] = input;
    const command = this.mapCommand(opCode);

    if (!this[command]) { throw new Error('command not implemented :-('); }

    this[command](value);
  }

  LDA (value) {
    this.REGISTERS.A = value;

    const Z = isZeroValue(value);

    this.REGISTERS.S = {...this.REGISTERS.S, Z };
    this.REGISTERS.PC = this.REGISTERS.PC + 2;
  }
}

function isZeroValue (value) {
  if (value == '0') return 1;
  if (value == '00') return 1;
  return 0;
}
