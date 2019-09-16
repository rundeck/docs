# Progress Badge Workflow Step (Enterprise)

The Progress Badge Plugin included with Rundeck Enterprise can create graphic badges to be rendered on the Log Output tab.

See also: (/manual/log-filters/progress-badge.md).

Render a single badge using input options:

- Text to be displayed inside the badge. Supports emoticons (see below).
- Status of the Badge, ok (green badge), error (red badge) or neutral (grey badge). Can be a variable from option o key-value data.

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
