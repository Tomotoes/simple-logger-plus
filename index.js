const chalk = require('chalk')
const logSymbols = require('log-symbols')

module.exports = (function() {
	const { log } = console

	const logs = [
		{
			type: 'error',
			func: chalk.bold.white.bgRed
		},
		{
			type: 'warn',
			func: chalk.bold.white.bgRedBright
		},
		{
			type: 'info',
			func: chalk.bold.white.bgBlue
		},
		{
			type: 'success',
			func: chalk.bold.white.bgGreen
		},
		{
			type: 'debug',
			func: chalk.bold.white.bgGreenBright
		}
	]

	const isDebug =
		process.execArgv[0] && process.execArgv[0].includes('inspect', 5)
	const toLog = isDebug
		? () => text => text
		: function() {
				return this.func
		  }

	return logs.reduce((_log, e) => {
		_log[e.type] = (...text) => {
			text.unshift(logSymbols[e.type] || logSymbols.warning)
			log(toLog.call(e)(...text))
		}
		return _log
	}, {})
})()
