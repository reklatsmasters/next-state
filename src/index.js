'use strict';

const Emitter = require('events');

const _state = Symbol('state'); // Cuurent state.
const _transitions = Symbol('transitions'); // List of state transitions.
const _previous = Symbol('previous'); // Previous state.

const isSet = s => s instanceof Set;

/**
 * Simple state machine.
 */
class StateMachine extends Emitter {
  /**
   * @class {StateMachine}
   * @param {Object} transitions State map.
   * @param {string} state Initial state.
   */
  constructor(transitions, state = null) {
    super();

    this[_state] = state;
    this[_previous] = null;
    this[_transitions] = transitions;
  }

  /**
   * Get current state.
   * @returns {string}
   */
  get state() {
    return this[_state];
  }

  /**
   * Get previous state.
   * @returns {string}
   */
  get previous() {
    return this[_previous];
  }

  /**
   * Switch to the next state.
   * @param {string} state
   * @returns {boolean}
   */
  next(state) {
    /** @type {Set} */
    const allowedStates = this[_transitions][this.state];

    if (!isSet(allowedStates)) {
      throw new TypeError('Invalid state set');
    }

    if (!allowedStates.has(state)) {
      throw new Error(`Forbidden transition from ${this.state} to ${state}`);
    }

    this[_previous] = this[_state];
    this[_state] = state;

    this.emit(state);
    return true;
  }
}

/**
 * Create state machine.
 * @param {Object} transitions State map.
 * @param {*} initial Initial state, default is null.
 * @returns {StateMachine}
 */
function createMachine(transitions, initial = null) {
  return new StateMachine(transitions, initial);
}

/**
 * Create a new state transition.
 * @param  {...any} states List of possible states.
 * @returns {Set}
 */
function createState(...states) {
  if (states.length === 0) {
    throw new Error('Missing state transition');
  }
  return new Set(states);
}

module.exports = {
  createState,
  createMachine,
  StateMachine,
};
