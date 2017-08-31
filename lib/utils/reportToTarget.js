'use strict'

const get = require('lodash/get')
const getProp = require('jsx-ast-utils/getProp')

module.exports = (node) => get(getProp(node.attributes, 'style'), 'value', node)
