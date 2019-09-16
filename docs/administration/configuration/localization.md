# Localization

Rundeck customization and localization/internationalization.

## Messages file

Rundeck uses Grails, based on Spring, which provides localization/internationalization by means of a `messages` file.

For reference, see [Grails Internationalization](https://docs.grails.org/latest/guide/i18n.html).

In order to add or override the default localized messages, you can create a new file: `RDECK_BASE/i18n/messages.properties`
and place your overrides in that file, according to the normal `messages.properties` format.

To override messages for a language other than English, follow the normal process for supplying these messages by adding
the appropriate locale qualifier to your `messages.properties` file. For example, the file name for Spanish strings
would be: `messages_es_419.properties`

The Locale code you use is based on language code and country code.

### Testing your changes

You can [change the locale used in Rundeck](https://docs.grails.org/latest/guide/i18n.html#changingLocales)
by appending a `?lang=XX` to the URL in your request.

You may have to use the full locale code to activate your locale. For example, to activate simplified Chinese you will
need to do so like this: `?lang=zh_cn`

### Missing Strings

Not all of the Rundeck GUI uses localized strings yet. If you find a page in Rundeck that doesn't seem to use
appropriate localization of English text,
please [Submit an issue report](https://github.com/rundeck/rundeck/issues/new?title=Missing%20i18n%20Text%3A%20___&body=i18n%20support%20is%20missing%20on%20page%3A%20___%0A%0AText%3A%20___&labels[]=i18n).

### Submit a Pull Request

If you would like to translate Rundeck to another language, please submit your new messages file as a Pull Request
via Github, so that we can include it in the next Rundeck release.

There is a page on the [Rundeck wiki: Internationalization](https://github.com/rundeck/rundeck/wiki/Internationalization) that can help if you are new to git.

## Date formats

Changing the Date formats shown in the Activity page of Rundeck:

These messages entries determine the formats shown:

- `jobslist.date.format` default `M/d/yy h:mm a`
- `jobslist.date.format.ko` default `M/DD/YY h:mm a`
- `jobslist.running.format.ko` default `h:mm a`

The `jobslist.date.format` uses [Java SimpleDateFormat](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html?is-external=true).

The messages ending with `.ko` use the [moment.js format](https://momentjs.com/docs/#/displaying/format/)

## GUI Customization

See [GUI Customization](/administration/configuration/gui-customization.md).
