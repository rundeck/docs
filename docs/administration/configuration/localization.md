# Localization

## Overview

Rundeck supports multiple languages through localization (l10n) and internationalization (i18n), allowing you to display the user interface in your preferred language. This is particularly useful for:

- **Global teams** - Users can work in their native language
- **Compliance** - Some regulations require systems in local languages
- **Adoption** - Easier onboarding for non-English speaking users
- **User experience** - Improved comprehension and reduced errors

**What gets localized:**
- User interface text (buttons, labels, messages)
- Date and time formats
- Error messages and notifications
- Help text and tooltips

**What doesn't get localized:**
- Job names, descriptions, and content (user-created)
- Node names and tags
- Project names
- Log output from executions
- API responses (always in English)

---

## Available Languages

Rundeck includes built-in translations for these languages:

| Language | Locale Code | Coverage | Notes |
|----------|-------------|----------|-------|
| **English (US)** | `en_US` | 100% | Default language |
| **Spanish** | `es_419` | ~95% | Latin American Spanish |
| **French** | `fr_FR` | ~90% | France French |
| **Japanese** | `ja_JP` | ~85% | |
| **Portuguese** | `pt_BR` | ~90% | Brazilian Portuguese |
| **Chinese (Simplified)** | `zh_CN` | ~85% | |

**Note:** Coverage percentages are approximate. Not all UI elements may be translated in all languages yet.

**Missing translations?** See [Contributing Translations](#contributing-translations) to help improve coverage.

---

## How to Use Different Languages

### For Users: Switching Language

Users can select their preferred language from their profile settings:

1. Click on your **username** in the top-right corner
2. Select **Profile**
3. Change **Language** dropdown
4. Click **Save**

The interface will immediately display in the selected language.

**URL parameter method:**

You can also temporarily switch languages by adding `?lang=XX` to any Rundeck URL:

```
https://rundeck.example.com/menu/home?lang=es_419
```

This affects only your current session. Use full locale codes (e.g., `zh_CN` not just `zh`).

### For Administrators: Setting Default Language

**Option 1: System-wide default (via configuration)**

Currently, Rundeck doesn't provide a system-wide default language setting. The default is always English (`en_US`). Users must change their individual preferences.

**Option 2: Browser locale detection**

Rundeck respects browser language settings. If a user's browser is set to Spanish, Rundeck will attempt to display Spanish (if available) until the user explicitly chooses a different language.

---

## Customizing Translations

### Understanding Messages Files

Rundeck uses the Grails framework for localization, which stores translations in `messages` files. These are property files with key-value pairs:

```properties
# English (messages.properties)
page.home=Home
button.save=Save
error.required=This field is required

# Spanish (messages_es_419.properties)
page.home=Inicio
button.save=Guardar
error.required=Este campo es obligatorio
```

**Technical reference:** [Grails Internationalization Documentation](https://docs.grails.org/latest/guide/i18n.html)

### Overriding Built-in Translations

You can override or add to Rundeck's built-in translations by creating custom messages files.

**Location:** `$RDECK_BASE/i18n/messages.properties`

#### Example 1: Customize English Text

Create `$RDECK_BASE/i18n/messages.properties`:

```properties
# Override default English strings
button.save=Save Changes
page.home=Dashboard
job.create.title=Create New Automation
```

#### Example 2: Add Spanish Customizations

Create `$RDECK_BASE/i18n/messages_es_419.properties`:

```properties
# Override or add Spanish translations
button.save=Guardar Cambios
page.home=Panel de Control
job.create.title=Crear Nueva Automatización
```

#### Example 3: Add New Language (Example: German)

If German isn't included, create `$RDECK_BASE/i18n/messages_de.properties`:

```properties
# German translations
button.save=Speichern
page.home=Startseite
job.create.title=Neuen Job Erstellen
```

**Note:** You'll need to provide translations for all strings. Copy from `messages.properties` and translate each entry.

### File Naming Convention

Messages files follow this pattern:

```
messages.properties              # English (default)
messages_[language].properties   # Language only
messages_[language]_[country].properties   # Language + Country
```

**Examples:**
- `messages_es.properties` - Spanish (generic)
- `messages_es_419.properties` - Spanish (Latin America)
- `messages_es_ES.properties` - Spanish (Spain)
- `messages_pt_BR.properties` - Portuguese (Brazil)
- `messages_zh_CN.properties` - Chinese (Simplified)
- `messages_fr_FR.properties` - French (France)

### Locale Codes Reference

| Language | Locale Code | Description |
|----------|-------------|-------------|
| English (US) | `en_US` | Default |
| Spanish (Latin America) | `es_419` | Most of Latin America |
| Spanish (Spain) | `es_ES` | European Spanish |
| French (France) | `fr_FR` | France French |
| French (Canada) | `fr_CA` | Canadian French |
| Portuguese (Brazil) | `pt_BR` | Brazilian Portuguese |
| Portuguese (Portugal) | `pt_PT` | European Portuguese |
| Chinese (Simplified) | `zh_CN` | Mainland China |
| Chinese (Traditional) | `zh_TW` | Taiwan |
| Japanese | `ja_JP` | Japan |
| Korean | `ko_KR` | Korea |
| German | `de_DE` | Germany |
| Italian | `it_IT` | Italy |

---

## Applying Custom Translations

After creating or modifying messages files:

1. **Create the i18n directory** (if it doesn't exist):
```bash
mkdir -p $RDECK_BASE/i18n
```

2. **Place your messages files** in that directory:
```bash
# Example
cp messages_es_419.properties $RDECK_BASE/i18n/
```

3. **Set correct permissions**:
```bash
chown rundeck:rundeck $RDECK_BASE/i18n/messages*.properties
chmod 644 $RDECK_BASE/i18n/messages*.properties
```

4. **Restart Rundeck**:
```bash
sudo systemctl restart rundeckd
```

5. **Test the translations** using the `?lang=` URL parameter or user profile settings

**Note:** Changes take effect after restart. There's no hot-reload for translations.

---

## Testing Your Changes

### Testing Method 1: URL Parameter

The quickest way to test translations is using the `?lang=` URL parameter:

```
# Test Spanish
https://rundeck.example.com/?lang=es_419

# Test Chinese (must use full code)
https://rundeck.example.com/?lang=zh_CN

# Test French
https://rundeck.example.com/?lang=fr_FR
```

**Important:** 
- Use the **full locale code** (e.g., `zh_CN` not `zh`)
- Lowercase works: `?lang=es_419` or `?lang=ES_419`
- URL parameter overrides user profile setting temporarily

### Testing Method 2: User Profile

1. Go to **Profile** settings
2. Change **Language** dropdown
3. Click **Save**
4. Navigate through Rundeck to verify translations

### Testing Method 3: Development Testing

If you're developing locally, see the [Grails locale testing documentation](https://docs.grails.org/latest/guide/i18n.html#changingLocales) for additional methods.

### What to Test

When testing translations, check these areas:

- [ ] Navigation menu items
- [ ] Button labels
- [ ] Form field labels
- [ ] Error messages
- [ ] Confirmation dialogs
- [ ] Help text and tooltips
- [ ] Date/time formats (see next section)
- [ ] Job execution output formatting
- [ ] Email notifications (if using email templates)

### Troubleshooting Translation Issues

**Issue: Translations not appearing after restart**
- **Cause:** Wrong file location or permissions
- **Solution:** 
  - Verify file is in `$RDECK_BASE/i18n/`
  - Check filename matches locale code exactly
  - Ensure Rundeck user can read the file
- **Debug:** Check logs: `grep -i "messages" /var/log/rundeck/rundeck.log`

**Issue: Some strings still in English**
- **Cause:** Missing translation keys in your messages file
- **Solution:** 
  - Find the English key in Rundeck's default `messages.properties`
  - Add translation to your custom file
  - Or, see [Contributing Translations](#contributing-translations)

**Issue: Garbled characters or wrong encoding**
- **Cause:** Messages file not in UTF-8 encoding
- **Solution:** Convert file to UTF-8:
```bash
iconv -f ISO-8859-1 -t UTF-8 messages_es_419.properties > messages_es_419.properties.utf8
mv messages_es_419.properties.utf8 messages_es_419.properties
```

**Issue: Locale code not recognized**
- **Cause:** Using incorrect locale code format
- **Solution:** Use exact format from [Locale Codes Reference](#locale-codes-reference)
- **Example:** Use `zh_CN` not `zh-CN` or `zh-cn`

---

## Customizing Date and Time Formats

Date and time formats are also customizable through messages files. This is useful for regional preferences (e.g., DD/MM/YYYY vs MM/DD/YYYY).

### Date Format Properties

These messages properties control how dates and times appear:

| Property | Format System | Default | Example Output |
|----------|---------------|---------|----------------|
| `jobslist.date.format` | Java SimpleDateFormat | `M/d/yy h:mm a` | `3/15/24 2:30 PM` |
| `jobslist.date.format.ko` | moment.js | `M/DD/YY h:mm a` | `3/15/24 2:30 PM` |
| `jobslist.running.format.ko` | moment.js | `h:mm a` | `2:30 PM` |

**Format systems:**
- `.format` entries use [Java SimpleDateFormat](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html)
- `.format.ko` entries use [moment.js format](https://momentjs.com/docs/#/displaying/format/)

### Example: European Date Format (DD/MM/YYYY)

Add to your `messages.properties` or locale-specific file:

```properties
# European format: Day/Month/Year
jobslist.date.format=dd/MM/yy HH:mm
jobslist.date.format.ko=DD/MM/YY HH:mm
jobslist.running.format.ko=HH:mm
```

**Result:** `15/03/24 14:30` instead of `3/15/24 2:30 PM`

### Example: ISO 8601 Format

```properties
# ISO 8601 format
jobslist.date.format=yyyy-MM-dd HH:mm:ss
jobslist.date.format.ko=YYYY-MM-DD HH:mm:ss
jobslist.running.format.ko=HH:mm:ss
```

**Result:** `2024-03-15 14:30:00`

### Example: Localized Formats by Language

**Spanish (24-hour format):**
```properties
# messages_es_419.properties
jobslist.date.format=dd/MM/yy HH:mm
jobslist.date.format.ko=DD/MM/YY HH:mm
jobslist.running.format.ko=HH:mm
```

**Japanese (Year-first format):**
```properties
# messages_ja_JP.properties
jobslist.date.format=yy/MM/dd HH:mm
jobslist.date.format.ko=YY/MM/DD HH:mm
jobslist.running.format.ko=HH:mm
```

### Common Date Format Patterns

**Java SimpleDateFormat patterns:**

| Pattern | Description | Example |
|---------|-------------|---------|
| `yyyy` | 4-digit year | `2024` |
| `yy` | 2-digit year | `24` |
| `MM` | 2-digit month | `03` |
| `M` | 1-2 digit month | `3` |
| `dd` | 2-digit day | `15` |
| `d` | 1-2 digit day | `15` |
| `HH` | 24-hour (00-23) | `14` |
| `h` | 12-hour (1-12) | `2` |
| `mm` | Minutes | `30` |
| `ss` | Seconds | `45` |
| `a` | AM/PM | `PM` |

**moment.js patterns** (similar but different case):

| Pattern | Description | Example |
|---------|-------------|---------|
| `YYYY` | 4-digit year | `2024` |
| `YY` | 2-digit year | `24` |
| `MM` | 2-digit month | `03` |
| `M` | 1-2 digit month | `3` |
| `DD` | 2-digit day | `15` |
| `D` | 1-2 digit day | `15` |
| `HH` | 24-hour (00-23) | `14` |
| `h` | 12-hour (1-12) | `2` |
| `mm` | Minutes | `30` |
| `ss` | Seconds | `45` |
| `A` | AM/PM | `PM` |

---

## Contributing Translations

### Improving Existing Translations

Help improve Rundeck's built-in translations! If you notice:
- Missing translations (English text in other languages)
- Incorrect translations
- Inconsistent terminology

You can contribute improvements back to Rundeck.

**Step-by-step guide:** Follow the detailed [How to Contribute Rundeck Translations](/learning/howto/contribute-rundeck-translation.md) guide.

**Quick overview:**
1. Fork the [Rundeck repository](https://github.com/rundeck/rundeck)
2. Find the translation key in the appropriate `messages_XX.properties` file
3. Add or update the translation
4. Test your changes locally
5. Submit a Pull Request

### Adding a New Language

To add a completely new language to Rundeck:

1. **Check if language exists:** Look in Rundeck source for `messages_[your_locale].properties`
2. **If it doesn't exist:** Copy `messages.properties` to `messages_[your_locale].properties`
3. **Translate all strings:** Go through each line and translate
4. **Test thoroughly:** Use `?lang=` parameter to test
5. **Submit PR:** Include the new messages file

**Important:** Adding a new language is a significant effort. Focus on high-priority UI elements first:
- Navigation and menus
- Common buttons and actions
- Error messages
- Job-related terms

### Translation Guidelines

When contributing translations:

**Consistency:**
- Use consistent terminology (e.g., always translate "job" the same way)
- Check existing translations for established terms
- Maintain technical terms when appropriate (API, SSH, etc.)

**Brevity:**
- UI space is limited - keep translations concise
- Prefer shorter phrases where possible
- Test that translations fit in UI elements

**Style:**
- Use imperative form for action buttons ("Save" not "Saving")
- Match the formality level of the original English
- Follow language-specific capitalization rules

**Technical accuracy:**
- Don't translate technical terms that users need to know (API endpoints, etc.)
- Preserve variable placeholders: `{0}`, `${var}`, etc.
- Maintain HTML tags and special formatting

### Missing Translations

**Found untranslated text?**

Not all UI elements in Rundeck are fully localized yet. If you find English text that should be translatable:

1. **Note the location:** Page name, section, exact text
2. **Check if key exists:** Search Rundeck source for the English text
3. **Report it:** 
   - [GitHub Issue](https://github.com/rundeck/rundeck/issues) - Preferred
   - [Community Forums](https://community.pagerduty.com/ask-a-product-question-2)
   - [Support](/about/getting-help.md) - Enterprise customers

Include:
- Screenshot showing untranslated text
- Page/URL where it appears
- Language you're using
- Suggested translation (if you know it)

**Why isn't everything translated?**
- Some features are newer and haven't been localized yet
- Dynamic content (user-created names, descriptions) isn't translated
- Some technical terms are intentionally left in English
- Community translations may not cover all features

---

## Best Practices

### For Administrators

1. **Document language choices:** Note which languages you're supporting and why
2. **Test before production:** Verify translations work in test environment
3. **Backup custom files:** Include `$RDECK_BASE/i18n/` in backups
4. **Version control:** Keep custom messages files in version control
5. **Consistent across clusters:** Ensure all cluster members have identical messages files

### For Users

1. **Profile settings persist:** Language choice is saved per user account
2. **Browser settings matter:** Rundeck respects browser language preferences
3. **URL parameter is temporary:** Using `?lang=` only affects current session
4. **Report issues:** Help improve translations by reporting problems

### For Developers/Translators

1. **Use UTF-8 encoding:** Always save messages files as UTF-8
2. **Test both Java and JS:** Some strings appear in both `.properties` and `.js` files
3. **Preserve formatting:** Don't break HTML tags or variable substitutions
4. **Follow conventions:** Match existing translation style and terminology
5. **Document context:** Add comments for ambiguous terms

**See detailed guide:** [How to Contribute Rundeck Translations](/learning/howto/contribute-rundeck-translation.md)

---

## Additional Resources

- [How to Contribute Rundeck Translations](/learning/howto/contribute-rundeck-translation.md) - Step-by-step guide for translators
- [GUI Customization](/administration/configuration/gui-customization.md) - Other UI customization options
- [Grails Internationalization](https://docs.grails.org/latest/guide/i18n.html) - Technical reference
- [Java SimpleDateFormat](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html) - Date format reference
- [moment.js Format](https://momentjs.com/docs/#/displaying/format/) - JavaScript date format reference
- [Rundeck GitHub Repository](https://github.com/rundeck/rundeck) - Source code and existing translations
- [Community Forums](https://community.pagerduty.com/ask-a-product-question-2) - Ask questions about translations

