It uses (`babel-helper-plugin-test-runner`)[https://github.com/babel/babel/tree/master/packages/babel-helper-plugin-test-runner] that actually isn't recommened to use outside Babel monorepo, but if you follow the folder structure for the fixtures works perfectly.

The idea behind that is create the tests based on the folders and run babel-core on `actual.js` and comparing it to `expected.js`

At the end the **babel-helper-plugin-test-runner** looks something similar like that:

```js
const path = require("path")
const fs = require("fs")
const assert = require("assert")
const babel = require("babel-core")
const plugin = require("../src/index")

const trim = str => str.replace(/^\s+|\s+$/, '')
const unslug = str => str.split('-').join(' ')

describe('Fixtures', () => {
  const fixturesDir = path.join(__dirname, "fixtures")

  fs.readdirSync(fixturesDir).map((caseName) => {
    it(unslug(caseName), () => {
      const fixtureDir = path.join(fixturesDir, caseName)
      
      const actual = babel.transformFileSync(
        path.join(fixtureDir, 'actual.js')
      ).code

      const expected = fs.readFileSync(
        path.join(fixtureDir, 'expected.js')
      ).toString()

      assert.equal(trim(actual), trim(expected))
    })
  })
})
```
