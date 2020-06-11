# Progress Badge (Enterprise)
::: enterprise
:::

The Progress Badge Plugin included with Rundeck Enterprise can create graphic badges to be rendered on the Log Output tab.

See Also: (/manual/workflow-steps/progress-badge.md)

Accepts the following input:

- Text to be displayed inside the badge. Supports emoticons (see below).
- String (optional) regular expression to search in the normal output of the step, if found, the badge is rendered as success (green) else is rendered as failed (red)
- Mute: Default `true`, suppress all the standard output, just diaplay the badge or errors.
- Conditional Disable: Boolean to do nothing if string pattern does not match.

## Emoji Support

To use some emoji inside the text, must input the alias of the emoji between colon:
`:smile: Successfull job! :100:`
Display as:

`😄 Successfull job! 💯`

A full list of supported emoji are listed here:
[vdurmont/emoji-java](https://github.com/vdurmont/emoji-java)

## Advanced render options

- Specify typeface and font size
- Select for background color of the badge. O can enter a hexadecimal color value in the format #ffff00
