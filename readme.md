# next-state

[![Build Status](https://travis-ci.com/reklatsmasters/simple-state.svg?branch=master)](https://travis-ci.com/reklatsmasters/simple-state)
[![npm](https://img.shields.io/npm/v/next-state.svg)](https://npmjs.org/package/next-state)
[![node](https://img.shields.io/node/v/next-state.svg)](https://npmjs.org/package/next-state)
[![license](https://img.shields.io/npm/l/next-state.svg)](https://npmjs.org/package/next-state)
[![downloads](https://img.shields.io/npm/dm/next-state.svg)](https://npmjs.org/package/next-state)
[![Coverage Status](https://coveralls.io/repos/github/reklatsmasters/next-state/badge.svg?branch=master)](https://coveralls.io/github/reklatsmasters/next-state?branch=master)

Simple event-driven state machine.

### Support

[![Buy Me A Coffee](https://www.buymeacoffee.com/assets/img/custom_images/purple_img.png)](https://www.buymeacoffee.com/reklatsmasters)

## Install

```
npm i next-state
```

##  Usage

Let's imagine you have 3 states:

```
INTERMEDIATE -> ACTIVE <-> INACTIVE
```

You should define 3 transitions:

```js
const { createState, createMachine } = require('next-state');

const INTERMEDIATE = 'INTERMEDIATE';
const ACTIVE = 'ACTIVE';
const INACTIVE = 'INACTIVE';

const transitions = {
  [INTERMEDIATE]: createState(ACTIVE),
  [ACTIVE]: createState(INACTIVE),
  [INACTIVE]: createState(ACTIVE)
};

const machine = createMachine(transitions, INTERMEDIATE);

machine.on(ACTIVE, () => console.log('button pressed on'));
machine.on(INACTIVE, () => console.log('button pressed off'));

function FriendlyButton() {
  return <Button onClick={ () => {
    const nextstate = machine.state === ACTIVE ? INACTIVE : ACTIVE;
    machine.next(nextstate);
  }; }> { machine.state } </Button>
}
```

See also [nodertc/dtls](https://github.com/nodertc/dtls) for more complex example.

## License

MIT, 2019 &copy; Dmitriy Tsvettsikh
