# Translate Rundeck to your language

Help to improve Rundeck's translation to your language by submitting new translations or corrections!

## About Rundeck Translations

**PagerDuty/Rundeck officially delivers and supports English only.** All other language translations are community-contributed and maintained.

**This means:**
- English is fully supported and QA tested
- Other languages are provided "as-is" by community contributors
- Translations may not cover 100% of the UI
- New features are typically added in English first

**We actively welcome and encourage translation contributions!** Your contributions:
- Help Rundeck users worldwide work in their native language
- Are reviewed and merged by the PagerDuty team
- Get included in official Rundeck releases
- Are credited in the project contributors list

**Current community-maintained languages:** Spanish, French, Japanese, Portuguese, Chinese (Simplified) 

## Prerequisites
* GitHub account
* Machine with git installed
* IDE that can search the codebase like Visual Studio Code or Intellij
* Knowledge about how to open projects in this IDE and how to search for occurrences
* Have the project running locally by following the [Contributing to Rundeck](./build-rundeck.md) steps before getting started.

## How to add a translation

Let's get started with an example and add a translation to Spanish:

1. On the profile page, set the language to Spanish. 
![Set the language to Spanish](/assets/img/translation-step1.png)
2. Copy the text that needs to be translated. In this example, let's translate the text "Delete expired tokens" 
![Find the text that needs translation](/assets/img/translation-step2.png)
3. In your IDE, with Rundeck codebase open, search the codebase for this string.
4. Open the file(s) with that exact string, making sure that the file name mention the locale of the language that is missing the translation (in this case `es_419`). 
![Search and edit the file](/assets/img/translation-step3-4.png)
5. Edit the phrase to the updated content. No need to change anything before it. 
![Updated text](/assets/img/translation-step5.png)
6. Refresh the page to see your changes. 
![Result](/assets/img/translation-step6.png)
7. Save your changes and open a Pull request in [Rundeck OSS repository](https://github.com/rundeck/rundeck) following the steps mentioned [in the sections push changes and create pull request](./build-rundeck.md#push-changes)

**Congratulations!** Keep an eye out for comments/feedback via the comments section from our team.

### What happens after you submit?

1. **Review:** The PagerDuty team reviews your translation for technical correctness (no syntax errors, proper variable formatting)
2. **Merge:** Once approved, your translation is merged into the Rundeck codebase
3. **Release:** Your contribution is included in the next Rundeck release
4. **Credit:** You'll be listed in the contributors

**Note:** We don't validate translation accuracy or grammar - that's why community maintenance is important! If you spot issues in existing translations, please submit corrections.

## Why Ongoing Maintenance Matters

Translations aren't a one-time task! Here's why continued community involvement is important:

**New features constantly added:**
- Each Rundeck release adds new UI elements
- These initially appear in English only
- Community translations need updates to cover new features

**Language evolves:**
- Technical terminology changes
- Better translations may be discovered
- User feedback reveals confusing wording

**How you can help:**
- Report incomplete translations in your language
- Fix errors or awkward phrasing you discover
- Update translations when new Rundeck versions are released
- Coordinate with other speakers of your language

**Making it sustainable:**
If you're maintaining translations for your organization, consider:
- Contributing improvements back to the community
- Documenting your translation glossary for consistency
- Sharing the maintenance work with others

### What to do when results shows two files missing a translation

If the text you're about to translate appears in two files, one ending with `.property` and another with `.js` please add the translation to both files! 
![Example of situation where a translation appear in different files for Spanish](/assets/img/translation-multiple-files.png)


### What if the text isn't showing in any files with the right locale

If by any chance the text only appears in the files `en_US.js` or `messages.properties`
![Example of translation only available](/assets/img/translation-not-available.png) 

Please follow these steps:

1. Open the file that contains that text.
2. Copy the whole line (including the values that appear before a `=` or the values that appear before `:` in case it's a json file). 
![Line to be copied in the file en_US.js](/assets/img/translation-copy-line-js.png)
3. Look in the same folder of the open file, for the file with the desired locale (in this case `es_419.js`). 
![Pasted line in es_419.js](/assets/img/translation-where-to-look-for-file.png)
4. Paste the line at the end of the file.
![Pasted line in es_419.js](/assets/img/translation-paste-line-js.png)
5. Follow the steps above starting from step 5.


## Translation Best Practices

### Consistency
* Use consistent terminology throughout (e.g., always translate "job" the same way)
* Check existing translations for established terms before adding new ones
* Don't translate "job" to "employment" in one place and "task" in another

### Brevity
* Keep translations concise - UI space is limited
* Short phrases are preferred
* Test that your translations fit in buttons and labels

### Style
* Use imperative form for action buttons ("Save" not "Saving")
* Match the formality level of the original English
* Follow your language's capitalization rules

### Technical Accuracy
* Don't translate technical terms that users need to know (API, SSH, URL, etc.)
* Preserve variable placeholders exactly: `{0}`, `${var}`, `%s`, etc.
* Maintain HTML tags and special formatting: `<strong>`, `<br>`, etc.
* Don't break JSON or properties file syntax

### Examples

**Good:**
```properties
button.save=Guardar
error.required=Este campo es obligatorio
job.execution.failed=La ejecución del job falló
```

**Bad (breaks variables):**
```properties
# Wrong - variable placeholder changed
error.field.required=El campo es obligatorio {0}  # Should be {0} at the end
```

**Bad (inconsistent terminology):**
```properties
job.create=Crear empleo        # "empleo" (employment)
job.delete=Eliminar trabajo    # "trabajo" (work/job)
job.run=Ejecutar tarea         # "tarea" (task)
# Should all use the same word for "job"
```

## What each locale means

| Language code | Language   |
|---------------|------------|
| en_US         | English    |
| es_419        | Spanish    |
| fr_FR         | French     |
| ja_JP         | Japanese   |
| pt_BR         | Portuguese |
| zh_CN         | Chinese    |

## Additional Resources

- [Localization Configuration](/administration/configuration/localization.md) - How to use and customize translations in Rundeck
- [Rundeck GitHub Repository](https://github.com/rundeck/rundeck) - Submit your translations here
- [Contributing to Rundeck](./build-rundeck.md) - General contribution guidelines
- [Community Forums](https://community.pagerduty.com/ask-a-product-question-2) - Ask questions about translations

## Questions?

Got Questions after trying everything above? [Ask us in our Forums!](https://community.pagerduty.com/ask-a-product-question-2)

**Thank you for contributing to Rundeck!** Your efforts help make Rundeck accessible to users around the world.

