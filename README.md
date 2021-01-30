# livehtmlgraphviz
Creates svg graphic from DOT-file, display it in browser and refreshes browser if DOT-file changes

Just a small helper tool for visualizing graphviz DOT files in browser.

## Prerequisites
graphviz must be installed

## Run

Sourcefile Dotfile is: `src/graphviz.viz`

Targetfile is: `dist/targetfile.svg`

```
npm run watch
```

Go to browser: `localhost:5000/`

Now whenever you make changes in the sourcefile, the svg-file will be recreated and the browser reloads
