const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure')

setHeadlessWhen(process.env.CI)
setCommonPlugins()

exports.config = {
  tests: './e2e/*.test.js',
  output: './e2e/output',
  helpers: {
    Playwright: {
      url: 'http://127.0.0.1:4173',
      show: !process.env.CI,
      browser: 'chromium',
      waitForTimeout: 5000,
    },
  },
  name: 'codecept-playwright-pages',
  plugins: {
    retryFailedStep: { enabled: true },
    screenshotOnFail: { enabled: true },
  },
}
