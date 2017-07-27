import assert from 'assert';

import { VM, LDA } from '../index';

describe('LDA', () => {
  xit('sets the A register', () => {
    assert.equal(VM.REGISTERS.A, '1');
  });

  describe('the status register', () => {
    xit('does not change the carry flag', () =>  {
      assert.equal(VM.REGISTERS.S.C, '0');
    });

    xit('sets the zero flag if A = 0', () =>  {
      assert.equal(VM.REGISTERS.S.Z, '1');
    });

    xit('does not set the zero flag if A != 0', () => {
      assert.equal(VM.REGISTERS.S.Z, '0');
    });

    xit('does not change interrupt disable', () =>  {
      assert.equal(VM.REGISTERS.S.I, '0');
    });

    xit('does not change decimal mode', () =>  {
      assert.equal(VM.REGISTERS.S.D, '0');
    });

    xit('does not change break command', () =>  {
      assert.equal(VM.REGISTERS.S.B, '0');
    });

    xit('does not change overflow flag', () =>  {
      assert.equal(VM.REGISTERS.S.V, '0');
    });

    // is this because negative numbers are marked in binary with a flag?
    xit('sets the negative flag if bit 7 of A is set', () =>  {
      assert.equal(VM.REGISTERS.S.N, '1');
    });

    xit('does not set the negative flag if bit 7 of A is not set', () =>  {
      assert.equal(VM.REGISTERS.S.N, '0');
    });
  });

  xit('increments the program counter', () => {
    assert.equal(VM.REGISTERS.PC, '2');
  });

  // TODO describe this better
  xit('sets memory', () => {
  });
})
