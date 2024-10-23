# Translate Rundeck to your language

Help to improve Rundeck's translation to your language by submitting new translations or corrections! 

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

**Congratulations!**  Keep an eye out for comments/feedback via the comments section from our team.


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


## Tips

* When the text involve key terms, it's important to keep consistency. For example don't translate job to employment.
* Short phrases are preferred.
* Whenever possible, keep text in the imperative form.

## What each locale means

| Language code | Language   |
|---------------|------------|
| en_US         | English    |
| es_419        | Spanish    |
| fr_FR         | French     |
| ja_JP         | Japanese   |
| pt_BR         | Portuguese |
| zh_CN         | Chinese    |

## Questions?

Got Questions after trying everything above? [Ask us in our Forums!](https://community.pagerduty.com/ask-a-product-question-2)

