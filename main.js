const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const mysql = require('mysql2');

// -----------------------------------------------------------------------------
// 
// Crear conexion
// 

const conexion = mysql.createConnection({
    host: 'localhost', 
    user: 'actividad5', 
    password: 'rNCJv9mkmWK469xC',
    database: 'giphy_data_db'
});

// -----------------------------------------------------------------------------
// 
// Create window
// 

let ventana;

function createWindow() {
    ventana = new BrowserWindow({
        width: 960, 
        height: 540, 
        webPreferences: {
            // nodeIntegration: true, 
            // contextIsolation: false, 
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    });

    ventana.loadFile('index.html');
}

// -----------------------------------------------------------------------------
// 
// Save giphy search info to DB
// 

ipcMain.on('saveGiphyMedia', function(event, args) {

    conexion.promise()
        .execute("INSERT INTO giphy_media(media_link, media_date, media_search_text, media_type, weirdness_level) VALUES(?, ?, ?, ?, ?)", [args[0].imgLink, args[0].searchDate, args[0].searchText, args[0].type, args[0].weirdnessLevel])
        .then(([results, fields]) => {
            // console.log(results);
            // console.log(fields);

            ventana.webContents.send('giphyMediaSaved', 'Se guardo al informacion en la base de datos.');
        })
        .catch((err) => {
            console.log(err);
        });
});

// -----------------------------------------------------------------------------

ipcMain.on('consultGiphyMediaDB', function(event, args) {

    conexion.promise()
        .execute("SELECT * FROM giphy_media WHERE media_search_text = ? AND media_type = ? AND weirdness_level = ?", [args[0].search, args[0].type, args[0].weirdness])
        .then(([results, fields]) => {

            if (results.length > 0) { 
                var randomNumber = Math.floor(Math.random() * results.length);

                ventana.webContents.send('showGiphyResultDB', results[randomNumber]);
            }
            else {
                ventana.webContents.send('showGiphyResultDB', null);
            }
        });

});

app.whenReady().then(createWindow);