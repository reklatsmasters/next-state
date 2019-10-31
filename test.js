'use strict';

const { createState, createMachine } = require('.');

describe('create state', () => {
  test('should return a Set', () => {
    const state = createState('first', 'second');
    const singleState = createState('first');

    expect(state).toBeInstanceOf(Set);
    expect(singleState).toBeInstanceOf(Set);
  });

  test('should not support empty state', () => {
    expect(() => createState()).toThrowError('Missing state transition');
  });
});

describe('state machine', () => {
  const INIT = 'INIT';
  const ACTIVE = 'ACTIVE';
  const PASSIVE = 'PASSIVE';

  const transitions = {
    [INIT]: createState(ACTIVE),
    [ACTIVE]: createState(PASSIVE),
    [PASSIVE]: createState(ACTIVE),
  };

  test('should support init state', () => {
    const firstMachine = createMachine(transitions);
    const secondMachine = createMachine(transitions, INIT);

    expect(firstMachine.state).toBe(null);
    expect(secondMachine.state).toBe(INIT);
  });

  test('should have transition for default init state', () => {
    const flow = {
      [null]: createState(ACTIVE),
    };
    const invalid = {};

    const validMachine = createMachine(flow);
    const invalidMachine = createMachine(invalid);

    const callback = jest.fn();
    const failed = jest.fn();

    validMachine.on(ACTIVE, callback);
    validMachine.next(ACTIVE);

    expect(callback).toBeCalled();
    expect(() => invalidMachine.next(ACTIVE)).toThrowError('Invalid state set');
    expect(failed).not.toBeCalled();
  });

  test('should check transitions', () => {
    const machine = createMachine(transitions, INIT);
    const callback = jest.fn();

    machine.on(PASSIVE, callback);

    expect(() => machine.next(PASSIVE)).toThrowError(/Forbidden transition/);
    expect(callback).not.toBeCalled();
  });

  test('should get previous state', () => {
    const machine = createMachine(transitions, INIT);

    expect(machine.previous).toBe(null);

    machine.next(ACTIVE);
    expect(machine.previous).toBe(INIT);

    machine.next(PASSIVE);
    expect(machine.previous).toBe(ACTIVE);
  });
});
