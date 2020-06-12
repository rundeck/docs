# Progress Badge (Enterprise)
::: enterprise
:::

This log filter changes the display of log output in a job’s activity logs by displaying a simple lozenge (the Progress Badge) with a text message, and optionally not displaying log returns. This is typically used to notify users of job status in a very clear way without complicating results with log returns.

## Usage
This filter has a few options:

- Text - the text to be placed on the display badge.
- String - Optional regex to search the log returns for. If this field is set, the badge will only appear if the regex finds a match.
- Mute - True/False with Conditional Disable option. If true, log output will be replaced by the badge.
    - Conditional Disable option will only show the badge if the String regex matches. (Useful when configuring multiple Progress Badges for the same result for “Red/Green” style notifications.)
- Typeface - Specify font for the badge - uses typical HTML/CSS typeface rules.
### Advanced render options
- Font Size - Font size of the text on the badge. All standard CSS options are available - “%”, “px”, “pt”, or “em.”
- Background Color - Select from the predefined pulldown list, or enter a valid CSS value in the text box - either standard colors, or hex values.


## Emoji Support

To use some emoji inside the text, must input the alias of the emoji between colon:
`:smile: Successfull job! :100:`
Display as:

`😄 Successfull job! 💯`

A full list of supported emoji are listed here:
[vdurmont/emoji-java](https://github.com/vdurmont/emoji-java)

## Example

![](@assets/img/logfilter-progress-example1.png)

![](@assets/img/logfilter-progress-example2.png)
