import checkValidOptions from './options'
import TaggedTemplateExpression from './styled-components'

function isReactFragment(openingElement) {
  return (
    openingElement.node.name.name === 'Fragment' ||
    (openingElement.node.name.type === 'JSXMemberExpression' &&
      openingElement.node.name.object.name === 'React' &&
      openingElement.node.name.property.name === 'Fragment')
  )
}

function applyAttribute({ openingElement, t, name, options }) {
  if (!openingElement || isReactFragment(openingElement)) return

  const isAttributeAlreadySet = openingElement.node.attributes.find(
    node => node.name.name === options.attribute
  )

  if (isAttributeAlreadySet) return

  openingElement.node.attributes.push(
    t.jSXAttribute(
      t.jSXIdentifier(options.attribute),
      t.stringLiteral(options.format(name))
    )
  )
}

function functionBodyPushAttributes(t, path, options, componentName) {
  let openingElement = null
  const functionBody = path.get('body').get('body')
  if (functionBody.parent && functionBody.parent.type === 'JSXElement') {
    const jsxElement = functionBody.find(c => {
      return c.type === 'JSXElement'
    })
    if (!jsxElement) return
    openingElement = jsxElement.get('openingElement')
  } else {
    const returnStatement = functionBody.find(c => {
      return c.type === 'ReturnStatement'
    })
    if (!returnStatement) return

    const arg = returnStatement.get('argument')
    if (!arg.isJSXElement()) return

    openingElement = arg.get('openingElement')
  }

  applyAttribute({ openingElement, t, name: componentName, options })
}

export default function({ types: t }) {
  return {
    visitor: {
      TaggedTemplateExpression,
      FunctionDeclaration(path, state) {
        if (!path.node.id || !path.node.id.name) return

        const options = checkValidOptions(state)
        const componentName = path.node.id.name

        functionBodyPushAttributes(t, path, options, componentName)
      },
      ArrowFunctionExpression(path, state) {
        const options = checkValidOptions(state)
        if (!path.parent.id || !path.parent.id.name) return
        const componentName = path.parent.id.name

        functionBodyPushAttributes(t, path, options, componentName)
      },
      ClassDeclaration(path, state) {
        const name = path.get('id')
        const properties = path.get('body').get('body')

        const render = properties.find(prop => {
          return (
            prop.isClassMethod() &&
            prop.get('key').isIdentifier({ name: 'render' })
          )
        })

        if (!render || !render.traverse) {
          return
        }

        const options = checkValidOptions(state)

        render.traverse({
          ReturnStatement(returnStatement) {
            const arg = returnStatement.get('argument')
            if (!arg.isJSXElement()) return

            const openingElement = arg.get('openingElement')

            applyAttribute({
              openingElement,
              t,
              name: name.node && name.node.name,
              options
            })
          }
        })
      }
    }
  }
}
