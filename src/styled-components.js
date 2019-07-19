import * as _path from 'path'
import * as t from 'babel-types'

import checkValidOptions from './options'

export default function TaggedTemplateExpression(path, state) {
  const options = checkValidOptions(state)
  const scope = path.scope

  try {
    // simple case
    if (isStyledPrefix(path.node.tag)) {
      const id = getIdFrom(path.parentPath)
      if (!id) return
      path.node.tag = insertBefore(path.node.tag, id)
      return
    }

    // chained case.  traverse until prefix found.
    // NB: styled-component chain api is always CallExpression+MemberExpression pairs.
    let node = path.node.tag
    while (true) {
      if (!node || !node.callee) break
      if (isStyledPrefix(node.callee.object)) {
        const id = getIdFrom(path.parentPath)
        if (!id) return
        node.callee.object = insertBefore(node.callee.object, id)
        break
      }
      node = node.callee.object
    }
  } catch (e) {}

  return

  // hoisted helpers in closure
  function insertBefore(node, id) {
    return t.callExpression(t.memberExpression(node, t.identifier('attrs')), [
      t.objectExpression([
        t.objectProperty(t.StringLiteral(options.attribute), t.StringLiteral(id))
      ])
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
    if (t.isVariableDeclarator(parentPath.node)) {
      return parentPath.node.id.name
    }
    if (t.isArrowFunctionExpression(parentPath.node)) {
      if (t.isVariableDeclarator(parentPath.parentPath.node)) {
        return parentPath.parentPath.node.id.name
      }
    }
    if (t.isExportDefaultDeclaration(parentPath.node)) {
      const path = state.file.opts.filename
      const filename = _path.parse(path).name
      if (filename === 'index') {
        const parent = _path.basename(_path.dirname(filename))
        return parent
      }
      return filename
    }
  }
}
