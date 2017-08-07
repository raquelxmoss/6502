import assert from 'assert';

import { VM } from '../index';
const compile = require('../assembler');

describe('STA', () => {
  it('does not affect the registers', () => {
    const instruction = compile('STA $12');
    const vm = new VM();

    vm.run(instruction);

    const expectedValue = {
      A: '',
      X: '',
      Y: '',
      S: { C: 0, Z: 0, I: 0, D: 0, B: 0, V: 0, N: 0 },
      PC: 0,
    }

    assert.equal(vm.registers().A, expectedValue.A);
    assert.equal(vm.registers().X, expectedValue.X);
    assert.equal(vm.registers().Y, expectedValue.Y);
    assert.equal(vm.registers().PC, expectedValue.PC);
  });

  it('sets the value of the accumulator at the given memory location', () => {
    const loadAccumulator = compile('LDA #1');
    const instruction = compile('STA $12');

    const vm = new VM();

    vm.run(loadAccumulator);
    vm.run(instruction);

    assert.equal(vm.memory()[18], 1)
  });
});
