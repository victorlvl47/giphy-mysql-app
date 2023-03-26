const {ipcRenderer, contextBridge} = require('electron');

contextBridge.exposeInMainWorld(
    'comunicacion', 
    {
        saveGiphyMedia: (datos) => ipcRenderer.send('saveGiphyMedia', datos), 
        giphyMediaSaved: (callback) => ipcRenderer.on('giphyMediaSaved', callback), 
        consultGiphyMediaDB: (datos) => ipcRenderer.send('consultGiphyMediaDB', datos), 
        showGiphyResultDB: (callback) => ipcRenderer.on('showGiphyResultDB', callback)
    }
);