# cpf-prompt [![Build Status](https://travis-ci.org/bukinoshita/cpf-prompt.svg?branch=master)](https://travis-ci.org/bukinoshita/cpf-prompt)

> CPF prompt with validation


## Install
```bash
$ npm install --save cpf-prompt
```


## Usage
```js
const cpfPrompt = require('cpf-prompt')

cpfPrompt().then(({ cpf }) => cpf)
// => '623.267.215-19'
// => It returns the CPF input.
```

## Demo

<img src="https://github.com/bukinoshita/cpf-prompt/blob/master/demo.gif" width="550">


## API

### cpfPrompt()

Returns a `promise`


## Related

- [credit-card-prompt](https://github.com/bukinoshita/credit-card-prompt) — Credit card prompt with validation and address lookup


## License

MIT © [Bu Kinoshita](https://bukinoshita.io)
