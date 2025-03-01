const fs = require('fs');
const path = require('path');

// Parse the extracted temp translation file
function generateTranslationFiles() {
  const tempFilePath = path.resolve('src/locales/temp.json');
  const localesDir = path.resolve('src/locales');
  const enFilePath = path.resolve(localesDir, 'en-US.json');
  const frFilePath = path.resolve(localesDir, 'fr-FR.json');

  // Check if temp file exists
  if (!fs.existsSync(tempFilePath)) {
    // eslint-disable-next-line no-console
    console.error('No temp translation file found. Run extraction first.');
    process.exit(1);
  }

  // Read the temp translations
  const tempTranslations = JSON.parse(fs.readFileSync(tempFilePath, 'utf-8'));

  // Read existing French translations, if available
  const existingFrTranslations = fs.existsSync(frFilePath)
    ? JSON.parse(fs.readFileSync(frFilePath, 'utf-8'))
    : {};

  // Generate English translations (use original keys)
  const enTranslations = { ...tempTranslations };

  // Generate French translations
  const frTranslations = Object.keys(tempTranslations).reduce((acc, key) => {
    if (existingFrTranslations[key]) {
      // Retain existing French translation if available
      acc[key] = existingFrTranslations[key];
    } else {
      // Leave as empty string if no French translation exists
      acc[key] = '';
    }
    return acc;
  }, {});

  // Ensure locales directory exists
  if (!fs.existsSync(localesDir)) {
    fs.mkdirSync(localesDir, { recursive: true });
  }

  // Write English translations
  fs.writeFileSync(
    enFilePath,
    JSON.stringify(enTranslations, null, 2),
    'utf-8'
  );

  // Write French translations
  fs.writeFileSync(
    frFilePath,
    JSON.stringify(frTranslations, null, 2),
    'utf-8'
  );

  // eslint-disable-next-line no-console
  console.log('Translation files generated ✅');

  // Optional: Remove temp file
  fs.unlinkSync(tempFilePath);
}

// Run the generator
generateTranslationFiles();
