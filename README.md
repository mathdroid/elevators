# Elevators

> A program that simulates freight lifts in React and Redux.

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Installation

> Tested on Node v6.3.1. Node v4.0.0 or newer is recommended.

1. `$ git clone https://github.com/mathdroid/elevators`

2. `$ npm i`

3. `$ npm start`

## Testing

- `$ npm run test` -- single test

- `$ npm run watch` -- test watcher

## Globals

There are two methods which are declared globally in <App />, which are exposed in `window.controls` object.

```js
window.controls = {
  checkButtonInFloor: (Number) => Boolean,
  activateButton: (Number) => undefined
  }
}

```

1. `checkButtonInFloor(floor)` will give you the status of the button in a specific `floor`. Returns `true` if it is activated.

2. `activateButton(floor)` will try to activate the button on the `floor`. Validity handling is internally checked.

### Usage

1. Open browser console

2. `controls.checkButtonInFloor(floor)` or `controls.activateButton(floor)`
