## Babel plugin transform React qa classes
[![Build Status](https://travis-ci.org/davesnx/babel-plugin-transform-react-qa-classes.svg?branch=master)](https://travis-ci.org/davesnx/babel-plugin-transform-react-qa-classes) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/) [![npm](https://img.shields.io/npm/dm/localeval.svg)](https://www.npmjs.com/package/babel-plugin-transform-react-qa-classes)

This plugin adds the component name as a `data-qa` in each React Component.

<table>
  <tr>
    <th>Before</th>
    <th>After</th> 
  </tr>
  <tr>
    <td>
      <pre>
class componentName extends Component {
  render () {
    return (
      &lt;div&gt;
        &lt;div&gt;Hello world&lt;/div&gt;
      &lt;/div&gt;
    )
  }
}
      </pre>
    </td>
    <td>
      <pre>
class componentName extends Component {
  render () {
    return (
      &lt;div data-qa='component-name'&gt;
        &lt;div&gt;Hello world&lt;/div&gt;
      &lt;/div&gt;
    )
  }
}
      </pre>
    </td>
  </tr>
</table>

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

You can specify the format of the name that you want and the name of the attribute:

```json
{
  "presets": ["es2015", "react"], // This asumes that you use those presets
  "env": {
    "dev": {
      "plugins": ["transform-react-qa-classes", {
        "attribute": "qa-property",
        "format": "camelCase"
      }]
    }
  }
}
```

> Note: format can be: "camel" (camelCase), "snake" (snake_case) or "kebab" (kebab-case).

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

### How it works

It's extremly dummy for now but you can get an idea on the (tests)[test/README.md]
