
Since the first step for me for to complete the coding assignment is to learn Angular, it's going to take a little longer than I'd hope.

Rather than showing up to the interview empty-handed, though, I wanted to provide a simple tool I'm going to be using for it, as well as the testing for that tool (via Jest).

The EnhancedTextValue class serves as an intermediary between the user input and the display.

- It cleans up potentially dangerous <script> tags, replacing them with <code> tags.

- It removes "onXXX" eventhandler attributes from tags, another potential source of malicious code.

- It converts simple plus/minus calculations into numeric values.

- It stores the original and the final values, so that it can be used in both View and Edit modes.
