'use strict'

const isCpf = require('iscpf')
const chalk = require('chalk')
const { tick, circleDotted } = require('figures')

const textInput = require('./lib/text')
const pretty = require('./lib/pretty')
const rightPad = require('./lib/utils/right-pad')

module.exports = () => {
  return new Promise((resolve, reject) => {
    const state = {
      error: undefined,
      cardGroupLabel: `${chalk.gray('>')} ${chalk.bold(
        'Enter your CPF information.'
      )}`,
      cpf: {
        label: rightPad('CPF Number', 12),
        mask: 'cpf',
        placeholder: '### ### ### ##',
        validateKeypress: (data, value) => /\d/.test(data) && value.length < 15,
        validateValue: data => {
          data = data.replace(/ /g, '')
          return isCpf(data)
        }
      }
    }

    async function render() {
      for (const key in state) {
        if (!Object.hasOwnProperty.call(state, key)) {
          continue
        }
        const piece = state[key]
        if (typeof piece === 'string') {
          console.log(piece)
        } else if (typeof piece === 'object') {
          let result
          try {
            /* eslint-disable no-await-in-loop */
            result = await textInput({
              label: `${circleDotted} ${piece.label}`,
              initialValue: piece.initialValue || piece.value,
              placeholder: piece.placeholder,
              mask: piece.mask,
              validateKeypress: piece.validateKeypress,
              validateValue: piece.validateValue,
              autoComplete: piece.autoComplete
            })

            piece.value = result

            process.stdout.write(
              `${chalk.green(tick)} ${piece.label}${result}\n`
            )
          } catch (err) {
            if (err.message === 'USER_ABORT') {
              process.exit(1)
            } else {
              console.error(err)
            }
          }
        }
      }

      console.log('') // New line

      const res = {
        cpf: pretty(state.cpf.value.split(' ').join(''))
      }

      resolve(res)
    }

    render().catch(err => reject(err))
  })
}
