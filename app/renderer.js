// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {readList} = require('./index.js');
const controlStart = document.getElementById('start');
const controlProgress = document.getElementById('progress');

controlStart.onclick = function () {

    readList((index,list) => controlProgress.innerHTML =`${index + 1} - ${list.length}`);
    //console.log(test)

};