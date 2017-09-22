import kebab from 'lodash.kebabcase'

const addStringLiteral = (t, returnStatement, jsxId, str) => {
  const arg = returnStatement.get('argument')
  if (!arg.isJSXElement()) return

  let openingElement = arg.get('openingElement')
  openingElement.node.attributes.push(
    t.jSXAttribute(
      t.jSXIdentifier(jsxId),
      t.stringLiteral(kebab(str))
    )
  )
}

export default function ({types: t}) {
  return {
    visitor: {
      ArrowFunctionExpression (path) {
        const componentName = path.parent.id.name

        const functionBody = path.get('body').get('body')
        const returnStatement = functionBody.find((c) => {
          return c.type === 'ReturnStatement'
        })

        addStringLiteral(t, returnStatement, 'data-qa', componentName)
      },
      ClassDeclaration (path) {
        let name = path.get('id')
        let properties = path.get('body').get('body')

        let render = properties.find(prop => {
          return (
            prop.isClassMethod() &&
            prop.get('key').isIdentifier({ name: 'render' })
          )
        })

        if (!render || !render.traverse) {
          return
        }

        render.traverse({
          ReturnStatement (returnStatement) {
            addStringLiteral(t, returnStatement, 'data-qa', name.node.name)
          }
        })
      }
    }
  }
}
