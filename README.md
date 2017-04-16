## Babel plugin transform React QA Classes

This plugin adds the component name as a `data-qa` in each React Component.

### Why?

Basically the idea is to facilitate Automate Testing on Frontend Applications.
Automate Frontend highly requires get the DOMElements and interact with them, adding `data-qa` attributes make it more easy. 

They would only need to get the element like that:

```js
document.querySelectorAll('[data-qa="component"]')
```

That depends on the Test suit, with [`PageObject`](https://github.com/cheezy/page-object) can work like that:

```ruby
div(:component, data_qa: 'component')
```

### Install
```bash
npm install --save-dev babel-plugin-transform-react-qa-classes
# or yarn add -d
```

### Use
`.babelrc`
```json
{
  "presets": ["es2015", "react"], // This asumes that you use those presets
  "env": {
    "dev": {
      "plugins": ["transform-react-qa-classes"]
    }
  }
}
```

> Note: Adding this plugin only on `DEV` mode (or `PREPROD`) allows not having this `data-qa` attributes on production.

#### with CLI

```bash
babel --plugins transform-react-qa-classes component.js
```

#### or programatically with [babel-core](https://www.npmjs.com/package/babel-core)

```js
require('babel-core').transform(`code`, {
  plugins: ['transform-react-qa-classes']
})
```

### Collaborate

This plugin is in a early stage and potentially can change, I will follow semVer convention.
Even the name isn't declarative for what it does and it just solves one problem with QA Automate, can be more generic.
