import React, { Component } from 'react'
import styled from 'styled-components'

/* should be transformed */

const basic = styled.div`
  color: black;
`

const withChain = styled.div.withConfig()`
  color: black;
`

const withInterpolation = styled.div`
  color: ${Colors.black};
`

const el = styled(El)`
  color: black;
`

const arrowExpr = () => styled.div`
  color: black;
`

// covered by VariableDeclaraion cases
export const exported = styled.div`
  color: black;
`

export default styled.div`
  color: black;
`

/* should not be transformed */

let assigned
assigned = styled.div`
  color: black;
`

const arrowReturn = () => {
  return styled.div`
    color: black;
  `
}

function fnReturn(){
  return styled.div`
    color: black;
  `
}

const fnExprReturn = function(){
  return styled.div`
    color: black;
  `
}

const namedFnExprReturn = function namedFnExpr(){
  return styled.div`
    color: black;
  `
}

const ternary = cond ? styled.div`color: black;` : null

const conditional = cond && styled.div`color: black;`

const map = {
  comp: styled.div`color: black;`
}

const comps = [styled.div`color: black;`]