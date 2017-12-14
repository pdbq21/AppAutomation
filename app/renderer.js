// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {readList} = require('./index.js');
const controlStart = document.getElementById('start');
const controlProgress = document.getElementById('progress');

controlStart.onclick = function () {
readList((index,list, warning, name) => {controlProgress.innerHTML =`${index + 1} - ${list}`;

    renderTable(name, warning);
});
    //renderTable()
};


let elementTableBody = document.querySelector('#table-props>tbody');

function renderTable(name, warning) {
    const tr = document.createElement("tr");
    // render tbody


        const tdName = document.createElement("td");
        const tdWarning = document.createElement("td");
    tdName.innerHTML = name;
    tdWarning.innerHTML = (warning === '')? 'Done': warning;




    tr.appendChild(tdName);
    tr.appendChild(tdWarning);

    elementTableBody.insertBefore(tr, elementTableBody.lastChild);
}