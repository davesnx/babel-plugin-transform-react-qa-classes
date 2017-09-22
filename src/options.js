import kebabCase from 'lodash.kebabcase'
import camelCase from 'lodash.camelcase'
import snakeCase from 'lodash.snakecase'
import isString from 'lodash.isstring'

const langTransforms = {
  kebab: kebabCase,
  camel: camelCase,
  snake: kebabCase
}

const isValidOption = opt => {
  return opt && isString(opt)
}

const validTranform = (opt) => {
  return Object.keys(langTransforms).indexOf(opt) > -1
}

const checkValidOptions = (state) => {
  let attribute = 'data-qa'
  let format = 'kebab'

  if (isValidOption(state.opts.attribute)) {
    attribute = state.opts.attribute
  }

  if (isValidOption(state.opts.format) && validTranform(state.opts.format)) {
    format = state.opts.format
  }

  return {
    format: langTransforms[format],
    attribute: attribute
  }
}

export default checkValidOptions
