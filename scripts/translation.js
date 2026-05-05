import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs'
import { resolve } from 'path'

// Parse the extracted temp translation file
function generateTranslationFiles() {
  const tempFilePath = resolve('src/locales/temp.json')
  const localesDir = resolve('src/locales')
  const enFilePath = resolve(localesDir, 'en-US.json')
  const frFilePath = resolve(localesDir, 'fr-FR.json')

  // Check if temp file exists
  if (!existsSync(tempFilePath)) {
    // eslint-disable-next-line no-console
    console.error('No temp translation file found. Run extraction first.')
    process.exit(1)
  }

  // Read the temp translations
  const tempTranslations = JSON.parse(readFileSync(tempFilePath, 'utf-8'))

  // Read existing French translations, if available
  const existingFrTranslations = existsSync(frFilePath)
    ? JSON.parse(readFileSync(frFilePath, 'utf-8'))
    : {}

  // Generate English translations (use original keys)
  const enTranslations = { ...tempTranslations }

  // Generate French translations
  const frTranslations = Object.keys(tempTranslations).reduce((acc, key) => {
    if (existingFrTranslations[key]) {
      // Retain existing French translation if available
      acc[key] = existingFrTranslations[key]
    } else {
      // Leave as empty string if no French translation exists
      acc[key] = ''
    }
    return acc
  }, {})

  // Ensure locales directory exists
  if (!existsSync(localesDir)) {
    mkdirSync(localesDir, { recursive: true })
  }

  // Write English translations
  writeFileSync(enFilePath, JSON.stringify(enTranslations, null, 2), 'utf-8')

  // Write French translations
  writeFileSync(frFilePath, JSON.stringify(frTranslations, null, 2), 'utf-8')

  // eslint-disable-next-line no-console
  console.log('Translation files generated ✅')

  // Optional: Remove temp file
  unlinkSync(tempFilePath)
}

// Run the generator
generateTranslationFiles()
