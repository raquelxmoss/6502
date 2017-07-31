import assert from 'assert';

import { VM, LDA } from '../index';
const compile = require('../assembler');

describe('LDA', () => {
  it('sets the A register to the given value', () => {
    const instruction = compile('LDA #1');
    const vm = new VM();

    vm.run(instruction);

    assert.equal(vm.registers().A, 1);
  });

  describe('the status register', () => {
    it('does not change the carry flag', () =>  {
      const instruction = compile('LDA #1');
      const vm = new VM();

      vm.run(instruction);

      assert.equal(vm.registers().S.C, 0);
    });

    it('sets the zero flag if A = 0', () =>  {
      const instruction = compile('LDA #0');
      const vm = new VM();

      vm.run(instruction);

      assert.equal(vm.registers().S.Z, 1);
    });

    it('does not set the zero flag if A != 0', () => {
      const instruction = compile('LDA #1');
      const vm = new VM();

      vm.run(instruction);

      assert.equal(vm.registers().S.Z, 0);
    });

    it('does not change interrupt disable', () =>  {
      const instruction = compile('LDA #1');
      const vm = new VM();

      vm.run(instruction);

      assert.equal(vm.registers().S.I, 0);
    });

    it('does not change decimal mode', () =>  {
      const instruction = compile('LDA #1');
      const vm = new VM();

      vm.run(instruction);

      assert.equal(vm.registers().S.D, 0);
    });

    it('does not change break command', () =>  {
      const instruction = compile('LDA #1');
      const vm = new VM();

      vm.run(instruction);

      assert.equal(vm.registers().S.B, 0);
    });

    it('does not change overflow flag', () =>  {
      const instruction = compile('LDA #1');
      const vm = new VM();

      vm.run(instruction);

      assert.equal(vm.registers().S.V, 0);
    });

    // TODO: compiler doesn't like this
    xit('sets the negative flag if bit 7 of A is set', () =>  {
      const instruction = compile('LDA #EA');
      const vm = new VM();

      vm.run(instruction);

      assert.equal(vm.registers().S.N, 1);
    });

    it('does not set the negative flag if bit 7 of A is not set', () =>  {
      const instruction = compile('LDA #1');
      const vm = new VM();

      vm.run(instruction);

      assert.equal(vm.registers().S.N, 0);
    });
  });

  it('increments the program counter', () => {
    const instruction = compile('LDA #1');
    const vm = new VM();

    vm.run(instruction);

    assert.equal(vm.registers().PC, 1538);
  });

  // TODO describe this better
  // also I am really confused as to how to store my
  // memory. A string doesn't seem right?
  it('sets memory', () => {
    const instruction = compile('LDA #1');
    const vm = new VM();

    vm.run(instruction);

    assert.equal(vm.memory(), '169 1 ');
  });
})
