const fs = require('fs')
const express = require('express');
const compression = require('compression');
const path = require('path');
const pingPage = require('@monsantoit/ping-page');
const {generateHtmlMiddleware} = require('@monsantoit/phoenix-html-middleware')
const bindingsMiddleware = require('./src/middleware/serviceBindings')

const pkg = require('./package.json')
const appBaseUrl = '/agvisor-ui'
const app = express();

app.use(compression());
app.get(`/ping|${appBaseUrl}/ping`, pingPage(pkg)); // for accessing through ocelot
app.use(`${appBaseUrl}/service-bindings.js`, bindingsMiddleware)

if ( process.env.NODE_ENV !== 'production') {
    const webpack = require('./src/middleware/webpack');
    app.use(webpack.devMiddleware);
    app.use(webpack.hotModuleMiddleware);
    app.get(`${appBaseUrl}/styles/style.css`, (req, res) =>
        res.send('/* when running locally, webpack embeds this in bundle.js */'))
}

app.use(`${appBaseUrl}/styles`, express.static(path.resolve(__dirname, './public/styles')));
app.use(`${appBaseUrl}/scripts`, express.static(path.resolve(__dirname, './public/scripts')));
app.use(`${appBaseUrl}/images`, express.static(path.resolve(__dirname, './public/images')));




function checkFileExistsSync(filepath){
    let flag = true;
    try{
        fs.accessSync(filepath, fs.constants.F_OK);
    }catch(e){
        flag = false;
    }
    return flag;
}

if (!fs.existsSync('./public')){
    fs.mkdirSync('./public');
}

const generateIndex = async (req, res) => {
    await generateHtmlMiddleware(
        appBaseUrl,
        'agvisor-ui',
        ['agvisor-ui_local'],
        {defaultSuite: 'aurora', libType: 'material', materialVersion: '10.0.0', lightningExpress: true}
    )(req, res)

    const indexFile = './public/index.html'
    global.indexHtml !== 'undefined' && !checkFileExistsSync(indexFile) ? fs.writeFileSync(indexFile, global.indexHtml) : ''
}

app.get(`/*`, generateIndex)


app.use('/*', (err, req, res, next) => {
    console.error(err); // handle uncaught errors
    next();
});

const setupServer = () => {
    const port = parseInt(process.env.PORT || 3283, 10);
    const hostname = process.env.NODE_ENV === 'production' ? undefined : '127.0.0.1' // unlike default, only reachable from this machine
    const server = app.listen(port, hostname, () => {
        const address = server.address();
        const url = `http://${address.host || 'localhost'}:${port}`;
        console.info(`Listening at ${url}${appBaseUrl}/`);
    });

    return server
}

module.exports = setupServer()
