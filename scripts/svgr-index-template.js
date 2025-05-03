// svgr-index-template.js
function kebabCase(str) {
  return (
    str
      // Convert PascalCase to dash-case
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      // Convert camelCase to dash-case
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .toLowerCase()
  )
}

const indexTemplate = filePaths => {
  // Get component names from file paths
  const componentNames = filePaths
    .map(filePath => {
      // Extract the actual path string
      const pathString = typeof filePath === 'string' ? filePath : filePath.path

      if (!pathString) {
        // eslint-disable-next-line no-console
        console.error('Unexpected filePath format:', filePath)
        return ''
      }

      const parts = pathString.split('/')
      const fileName = parts[parts.length - 1]
      // Remove extension (.tsx or .js)
      return fileName.replace(/\.(tsx|js|jsx)$/, '')
    })
    .filter(Boolean)
    .sort()

  // Create import statements
  const importStatements = componentNames.map(name => `import ${name} from './${name}'`).join('\n')

  // Create kebab-case icon names
  const iconNames = componentNames
    .map(name => kebabCase(name))
    .sort()
    .map(name => `'${name}'`)
    .join(' | ')

  // Create the Icons object
  const iconsObjectEntries = componentNames
    .map(name => `  '${kebabCase(name)}': ${name}`)
    .join(',\n')

  return `${importStatements}

export type IconName = ${iconNames}

export const Icons = {
${iconsObjectEntries}
}
`
}

module.exports = indexTemplate
