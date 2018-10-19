# Hepia-Blocks

Web app offering a block based language to program the [HEPIA](http://hepia.hesge.ch)
education board [HepiaLight](http://hepia.hesge.ch/fr/groupes-de-competences/hepialight/accueil/).

## Installation

### Install npm dependencies

```bash
npm install # Install dependencies
```

### Run the app

```bash
npm start # Run the http server
```

Make sure to use a browser that [supports](https://caniuse.com/#search=Web%20Components) Web Components.

## Getting started

### Examples

You can start by play around with the examples in the `examples` directory.
To open an example, just drag the example file `[filename].xml` into the app in the browser.

### Program the board

Once you finished buiding the program with blocks, it is time to try it in the micro-controller.

Clicking the "Download" bouton to download a file named `MAIN.py`.
This file contains the python code generated from your block program.
Drop this file in the micro-controller file-system and restart it to run the program.

### Userlib dependencies

Make sure that you are using the latest version of `USERLIB.py`,
available in the `BOARD_FILES` directory.

## Credits

This application relies heavily on [blockly](https://developers.google.com/blockly/) (by Google) to handle the block based UI.

The application aesthetics was strongly inspired by [MakeCode](https://www.microsoft.com/en-us/makecode) (by Microsoft)
