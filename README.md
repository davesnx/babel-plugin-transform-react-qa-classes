## Babel plugin transform React qa classes
[![Build Status](https://travis-ci.org/davesnx/babel-plugin-transform-react-qa-classes.svg?branch=master)](https://travis-ci.org/davesnx/babel-plugin-transform-react-qa-classes) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/) [![npm](https://img.shields.io/npm/dm/localeval.svg)](https://www.npmjs.com/package/babel-plugin-transform-react-qa-classes)

This babel plugin adds the component name as a `data-qa` in each React Component.

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

> This plugin asumes that you are using [React](https://reactjs.org) and [Babel](https://babeljs.io) as a building tool to generate your bundle.

### Why?

The idea is to facilitate Automate Testing on Frontend Applications. Automate Frontend highly requires to get the DOMElements and interact with them, adding `data-qa` attributes automatically to all the components will make it more easy, rather than do it by code, with this way you won't have this `data-qa` in production code.

On the testing site would need to get the element like that:

```js
document.querySelectorAll('[data-qa="component"]')
```

That depends on the Test suit stack, for example with Ruby and [`PageObject`](https://github.com/cheezy/page-object) looks like that:

```ruby
div(:component, data_qa: 'component')
```

### Install
```bash
npm install --save-dev babel-plugin-transform-react-qa-classes
# or yarn add -D
```

### Use
Inside `.babelrc`:
```json
{
  "presets": ["es2015", "react"],
  "env": {
    "dev": {
      "plugins": ["transform-react-qa-classes"]
    }
  }
}
```

> Note: Adding this plugin only on `DEV` mode (or `PREPROD`) allows not having `data-qa` attributes on production.

You can specify the format of the name that you want and the name of the attribute, inside your `babelrc`:

```json
{
  "presets": ["es2015", "react"],
  "env": {
    "dev": {
      "plugins": ["transform-react-qa-classes", {
        "attribute": "qa-property",
        "format": "camel"
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

## Contributing
PRs for additional features are welcome!

There's still a few feature that are missing, for example each change of the state of the component is added as a `data-qa-state` into the DOM. Support for more libraries.

I recommend checking this [handbook](https://github.com/jamiebuilds/babel-handbook) about how to write babel plugins in order to learn. 

- Clone the repo: `git clone https://github.com/davesnx/babel-plugin-transform-react-qa-classes`
- Fork it & set origin as this repo: `git remote set-url origin https://github.com/YOUR_USERNAME/babel-plugin-transform-react-qa-classes.git`
- Create a branch: `git checkout -b BRANCH_NAME`
- Do the code
- Create a PR to this repo.

In order to do the commits I prefer to use [Commitizen](https://github.com/commitizen/cz-cli) and there's a githook setted up when you push it runs the tests.

Is your company using it? I would love to know more! 
Could you answer this small [typeform](https://davesnx.typeform.com/to/JrKgBc) :P

## License
MIT
