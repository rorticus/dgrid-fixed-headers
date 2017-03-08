# dgrid w/ fixed headers

This is a sample of using [dgrid](http://dgrid.io/) with headers that scroll along with the grid as the user scrolls down the page.

## Usage

Clone this repository and install the dependencies,

```bash
$ npm install
```

Starting the project will open up a web server,

```bash
$ npm run serve
```

Open up http://localhost:8080 in your browser and you should see a grid with red headers and a grid with green headers. Scrolling down the page will scroll the headers with the grids.

## How it Works

Calling `applyFixedHeaders` on a dgrid instance will add an event handler for when the window is scrolled. The handler will calculate if or how much the grid's header needs to be adjusted.
