# Highlight Output

This log filter parses the log output of a workflow step and highlights the output that matches a given regular expression. This filter changes display output in Rundeck, but does not alter the logs themselves.

## Usage

This filter has four options:

  - Pattern - regex to test against the log output
  - Foreground color - a pulldown list of ANSI colors to apply to the highlighted text
  - Background color - a pulldown list of ANSI colors to apply to the background of the highlighted text.
  - Mode - a pulldown list of text options (bold, underline, blink, and reverse) to apply to the highlighted text.

The selected text regex has several options. A regex without a capture group will simply highlight any text that matches what’s in the regex and apply the colors and mode to only the matched phrase. Capture groups in a regex will highlight any and all capture groups in the regex, while leaving out everything else matched by the regular expression.

## Example

![](@assets/img/logfilter-highlight-example1.png)

This setting will filter the log output looking for an initial “0” (zero) in the attached job step’s log output. If it matches, the result will look like this:

![](@assets/img/logfilter-highlight-example2.png)
