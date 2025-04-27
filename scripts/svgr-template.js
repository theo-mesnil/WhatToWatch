const propTypesTemplate = ({ componentName, exports, imports, interfaces, jsx }, { tpl }) => {
  return tpl`${imports}
${interfaces}
${'\n\n'}
function ${componentName}({ color = 'currentColor', ...props }: SvgProps) {
  return ${jsx};
}

${exports}
  `
}

module.exports = propTypesTemplate
