# simple-word-cloud
A simple word cloud generator.

## Description

This project was an individual assignment I presented for my Data Visualization class at my university. I worked on it for about a full day of work and managed to have something worth showing for the next day. It's not perfect by any means, whether talking about the features or the code itself, but it was a pretty interesting and fun project so I decided to put it on my GitHub anyway.

## Running

Simply clone the project and open `index.html` in your browser. Copy a text in the text area input or generate a lorem ipsum and click on the enter button.

## Features

* You can change the minimum font size, the maximum font size, and the color if the default values are not to your liking.
* You can enable or disable the use of opacity.
* The text overlap option isn't actually functional: it was meant to give the user the choice to enable or disable it after the text started overlapping for some reason. Ultimately, I decided to consider it as a feature and not a bug. It kind of gives the result a nice styling.
* The ignore common terms option allows the text to be compared to a list of English stop words in order to ignore words such as *the*, *to* or *from* which don't convey any particular meaning.
* You can customize the number of words you want for the lorem ipsum generator.
* You can filter out words that have a certain frequency or less, but you need to enable it first by checking the checkbox next to it.
* I was planning on implementing [HTML5 web workers](https://www.w3schools.com/html/html5_webworkers.asp) in order for the rendering of the word cloud to be done in the background but didn't have time to finish it. I'll try to find the time to eventually do it.

## Demo

![](https://thumbs.gfycat.com/OfficialWeakElectriceel-size_restricted.gif)

[*Gfycat link for better quality*](https://gfycat.com/OfficialWeakElectriceel)

## Sources

* [Material Design Lite](https://getmdl.io/) for the design.
* [Jscolor](http://jscolor.com/) for the color picker.
* [rviscomi/lorem-ipsum.js](https://gist.github.com/rviscomi/1479649) for the lorem ipsum generator.
* [GeekLab.com's stop-words.js](http://geeklad.com/remove-stop-words-in-javascript) for the removal of stop words in the inputted text.

## Other

You can find examples of text you can try this generator with in the **example/** directory.
