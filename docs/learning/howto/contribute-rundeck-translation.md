# Translate Rundeck to your language

Help to improve Rundeck's translation to your language by submitting new translations or corrections! 

# Prerequisites

* Have the project running locally by following the steps described in this link []()

# How to add a translation

Let's get started with an example and add a translation to Spanish:

1. On the profile page, set the language to Spanish. []()
2. Copy the text that needs to be translated. []()
3. Search in the codebase for this string. []()
4. Open the file(s) with that exact string, making sure that the file name mention the locale of the language that is missing the translation (in this case es). []()
5. Edit the phrase to the updated content. []()
6. Save your changes and open a Pull request following the steps mentioned here []()/

**Congratulations!**  Keep an eye out for comments/feedback via the comments section from our team.


## What to do when results shows two files missing a translation

If the text you're about to translate appears in two files, one ending with `.property` and another with `.js` please add the translation to both files!

## What if the text isn't showing in any files with the right locale

If by any chance the text only appears in files with `en_us`, follow these steps:

1. Open the `en_us` file that contains that text. []()
2. Copy the whole line (including the values that appear before a `=` or the values that appear before `:` in case it's a json file). []()
3. Look in the same folder of the `en_us` file, for the file with the desired locale. []()
4. Paste the line and follow steps 5 and 6 above.


# Tips

* When the text involve key terms, it's important to keep consistency. For example don't translate job to employment.
* Short phrases are preferred.
* Whenever possible, keep text in the imperative form.

## What each locale means

en_US: English
es_419: Spanish
fr_FR: French
ja_JP: Japanese
pt_BR: Portuguese
zh_CN: Chinese
