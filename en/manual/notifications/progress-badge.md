% Progress Badge Plugin (Pro)

The Progress Badge Plugin included with Rundeck Pro can create graphic badges to be rendered on the Log Output tab.

Includes a Log Filter Plugin and Workflow Step Plugin.

## Progress Badges Log Filter Plugin

Accepts the following input:

* Title (optional) can include context variables
* Text to be displayed inside the badge. Supports emoticons (see below).
* String (optional) regular expression to search in the normal output of the step, if found, the badge is rendered as success (green) else is rendered as failed (red)
* Mute: Default `true`, suppress all the standard output, just diaplay the badge or errors.
* Boolean to do nothing if string pattern does not match.


## Progress Badge Workflow Step Plugin

Render a single badge using input options:

* Title (optional) can include context variables
* Text to be displayed inside the badge. Supports emoticons (see below).
* Status of the Badge, ok (green badge), error (red badge) or neutral (grey badge). Can be a variable from option o key-value data.


## Emoji Support

To use some emoji inside the text, must input the alias of the emoji between colon:
`:smile: Successfull job! :100:` 
Display as:

`😄 Successfull job! 💯`

A full list of supported emoji are included on the plugin README.md and on the page of the library:
[vdurmont/emoji-java](https://github.com/vdurmont/emoji-java)

## Advanced render options 

* Specify typeface and font size
* Select for background color of the badge. O can enter a hexadecimal color value in the format #ffff00
