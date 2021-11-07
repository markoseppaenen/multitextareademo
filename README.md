# demo of multitextarea

I felt that my web-based publishing application would benefit from a possibility that editable text could be split over multiple text areas, but I had doubts towards what could be done in a browser. So, a prototype was made. It has these features:

- need for adding/deleting a textarea is checked after every keystroke
- when resizing the first textarea, text is split to fill as many textareas as text needs
- lines can be moved forward/backward by keeping Ctrl pressed while pressing up or down arrow
- textareas are arranged into a grid

There are JavaScript methods that allow, but are not limited to:

- increase/decrease textarea rows/columns
- copy all the text to the clipboard

Font must be monospaced, otherwise counting of characters for deciding where from to split text wouldn't make much sense. If you take a look at demo's HTML code you notice that there are few initialising settings to set like *mincols*, *maxrows*, *initialtextareawidth* etc. Settings *widthpixelspercolumnset* and *heightpixelsperrowset* are based on what kind of font (Courier) and linespacing is in use (see multitextarea.css).

There actually are few bugs and for understanding how the code works, you would have to do slight debugging on a browser, but overally it turned out to be something quite cool. **You are free to use the code without restrictions from my part.** I'd be delighted if somebody creates something much better by getting inspired what I've done.

![multitextarea demo](https://markoseppaenen.github.io/multitextareademo/multitextareademo.png)

[multitextarea - demo page](https://markoseppaenen.github.io/multitextareademo/)  
[multitextarea - GitHub repository](https://github.com/markoseppaenen/multitextareademo)  
