# Using SVG: Supplementary Material

Code examples and other supplementary material for the book [_Using SVG with CSS3 and HTML5_, by Amelia Bellamy-Royds, Kurt Cagle, and Dudley Storey (O'Reilly Media, 2017)](http://shop.oreilly.com/product/0636920037972.do).

This repository contains:

- All the examples used in the book
- Screenshots of the examples that were used as figures (beware: these are hi-res JPEG and PNG files)
- The SVG code (and screenshots) for other figures which were used to explain concepts
- Index pages for each chapter connecting the filenames to the figure and example numbers in the book
- Reference sections for quickly looking up SVG syntax
- Online extras: sections and tutorials that we couldn't fit in the book, with extra examples and explanation

You can download all the files as a zip using the "Clone or Download" button on the main repository page, or you can click through the file listings to view the code directly in GitHub.

To view the live versions of the code in your web browser, without downloading, start from the [GitHub Pages version of this repository](https://oreillymedia.github.io/Using_SVG/).  For example, you can [play the final version of the gem-collecting game from Chapter 18 here](https://oreillymedia.github.io/Using_SVG/ch18-interaction-files/gem-click-game-misses.svg).

I'll be updating the repo over October & November 2017, as I convert the extra articles and reference guides to HTML and finish the index pages.  If you see any other errors, please file an issue.

These files are covered by [the O’Reilly Media policy on the use of example code](http://shop.oreilly.com/category/customer-service/faq-examples.do). Short version: you are free to use the examples in moderation; credit is appreciated but not required. However, please don't integrate a large portion of the example set within a product or documentation. Some fonts and image files are public domain or Creative Commons-licenced content owned by others; see the credits in the book.

## Notes on viewing SVG files on GitHub

The GitHub website has a convenient SVG preview mode. When you open a file page, such as [this basic line figure from Chapter 5](https://github.com/oreillymedia/Using_SVG/blob/master/ch05-shapes-files/basic-line.svg), it may show you what it looks like, instead of the code. To switch views, the `<>` button on Github (currently labeled "Display the source blob") shows the code, while the button with a page icon (currently labeled "Display the rendered blob") shows the image.

However, many _.svg_ files in this repo _won't_ show correctly in the GitHub preview, because the preview uses an `<img>` to embed the file. As we warn many times in the books, embedding with `<img>` means that JavaScript doesn't run, images aren't interactive, and external file resources aren't loaded.

GitHub previews are also not available for the many inline-svg examples that use _.html_ files.

Depending on your browser, Javascript and external files might also be blocked if you download the file and then try to view it in your browser from your filesystem (as a URL starting with _file://_), without running a local webserver.

Links to the live versions of each SVG and HTML file are available from the companion website: https://oreillymedia.github.io/Using_SVG/

If you want to jump straight to the live version of a particular file, add the folder & file name (from the repo or from the end of the GitHub preview URL) to that website URL. In other words:

- The file (from above) with the repo path: _ch05-shapes-files/basic-line.svg_
- Can be viewed live at https://oreillymedia.github.io/Using_SVG/ch05-shapes-files/basic-line.svg

In some browsers, you can also right-click on the blank image in the Github preview and select "Open in a new tab", which opens the same data without the no-JavaScript restriction (although it will still have restrictions on accessing other files, because they have isolated the code in a _data:_ URI).

If you have downloaded the examples and want them to work offline, you'll need to set up a local webserver (many options are available) for the example folder.

In practice, to use SVG in a web page with JavaScript or external file resources, you need to either integrate it in the HTML as inline SVG or embed using an `<object>` or `<iframe>`.  We discuss this in Chapter 2, and look at the embed elements again in Chapter 9.
