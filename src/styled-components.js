import checkValidOptions from './options'
import * as t from 'babel-types'

export default function TaggedTemplateExpression(path, state) {
  const options = checkValidOptions(state)
  const scope = path.scope

  try {
    if (isStyledPrefix(path.node.tag)) {
      const id = getIdFrom(path.parentPath)
      if (!id) return
      path.node.tag = insertBefore(path.node.tag, id)
      return
    }
    let node = path.node.tag
    while (true) {
      if (!node.callee) debugger
      if (!node || !node.callee) break
      if (isStyledPrefix(node.callee.object)) {
        const id = getIdFrom(path.parentPath)
        if (!id) return
        node.callee.object = insertBefore(node.callee.object, id)
        break
      }
      node = node.callee.object
    }
  } catch (e) {
    console.log(e)
    return
  }

  function insertBefore(node, id) {
    return t.callExpression(t.memberExpression(node, t.identifier('attrs')), [
      t.arrowFunctionExpression(
        [],
        t.objectExpression([
          t.objectProperty(t.StringLiteral(options.attribute), t.StringLiteral(id))
        ])
      )
    ])
  }
  function isStyledPrefix(node) {
    // handle two forms: styled.div and styled(Comp)
    return (
      (t.isMemberExpression(node) && isStyledComponentsBinding(node.object)) ||
      (t.isCallExpression(node) && isStyledComponentsBinding(node.callee))
    )
    function isStyledComponentsBinding(node) {
      if (!t.isIdentifier(node)) return false
      const binding = scope.getBinding(node.name)
      if (!binding || binding.kind !== 'module') return false
      return binding.path.parent.source.value == 'styled-components'
    }
  }
  function getIdFrom(parentPath) {
    while (parentPath && !parentPath.node.id && !parentPath.node.left) {
      parentPath = parentPath.parentPath
    }
    const id =
      parentPath &&
      parentPath.node &&
      ((parentPath.node.id && parentPath.node.id.name) ||
        (parentPath.node.left && parentPath.node.left.name))
    return id
  }
}
