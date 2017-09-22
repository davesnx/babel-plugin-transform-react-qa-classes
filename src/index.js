import _ from 'lodash'

export default function ({types: t}) {
  return {
    visitor: {
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
          ReturnStatement(returnStatement) {
            let arg = returnStatement.get('argument')
            if (!arg.isJSXElement()) return

            let openingElement = arg.get('openingElement')
            openingElement.node.attributes.push(
              t.jSXAttribute(
                t.jSXIdentifier('data-qa'),
                t.stringLiteral(_.kebabCase(name.node.name))
              )
            )
          }
        })
      }
    }
  }
}
