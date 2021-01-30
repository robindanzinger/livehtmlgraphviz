# livehtmlgraphviz
Creates svg graphic from DOT-file, display it in browser and refreshes browser if DOT-file changes

Just a small helper tool for visualizing graphviz DOT files in browser.

## Prerequisites
graphviz must be installed

## Run

Sourcefolder is: `src/`

Targetfolder is: `dist/`

Targetfiletype is: `svg`

```
npm run watch
```

Go to browser: `localhost:5000/` 

Now whenever you make changes in the sourcefile, the svg-file will be recreated and the browser reloads

## Config
You can change the default configuration settings in config.json
```
{
  "src": sourcefolder, default is src
  "target": targetfolder, default is dist
  "type": target file type, default is svg
  "port": server port, default is 5000
  "wssport": websocket port, default is 5001
}
```
