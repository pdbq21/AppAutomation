const fs = require('fs');
const mkdirp = require('mkdirp');
const copyFile = require('quickly-copy-file');

const filepath = './list.txt';
const dirpath = './Designs';


// Read the list
fs.readFile(filepath, 'utf-8', (err, data) => {
    if (err) {
        console.log("An error ocurred reading the file :" + err.message);
        return;
    }
    // if file of list is empty - return;
    if (data.trim() === '') return;
// array of lines the list
    const lines = data.trim().split('\r\n');

    const date = new Date();
    const minuts = date.getMinutes().toString();
    // yyyy-mm-dd hh-mm for folder name
    const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}-${
        (minuts.length === 1) ? `0${minuts}` : minuts}`;

// list designs folder [ 'V_Vinyl.clocks', 'W_Wooden_clocks' ]
    const listDirDesigns = fs.readdirSync(dirpath);
    let dataDirDesigns = {};
    listDirDesigns.forEach((item) => {
        const designDir = item.match(/^[\D+_]/g)[0];
        dataDirDesigns[designDir] = item;
    });
    //console.log(dataDirDesigns);

    let dataSavedCopy = {};

// maping
    lines.forEach((item) => {
        // ^\D+ /  index for search folder - 'W' 'A' ...
        const indexDir = item.match(/^\D+/g)[0].toUpperCase();

        if (!!dataDirDesigns[indexDir]) {
// array of files
            const listFiles = fs.readdirSync(`${dirpath}/${dataDirDesigns[indexDir]}/`);

            listFiles.forEach((name) => {
                if (name.match(/(\d{4})/g)[0] === `0${item.match(/(\d{3})/g)[0]}`) {
                    //createFolder(`${dirpath}/${dataDirDesigns[indexDir]}/${dateStr}/`);

                    if (!fs.existsSync(`${dirpath}/${dataDirDesigns[indexDir]}/${dateStr}/`)){
                        fs.mkdirSync(`${dirpath}/${dataDirDesigns[indexDir]}/${dateStr}/`);
                    }


                    if (!!dataSavedCopy[name]){
                        dataSavedCopy[name] = 0;
                    } else {
                        dataSavedCopy[name] += 1;
                    }
console.log(dataSavedCopy)

                    copyFile(`${dirpath}/${dataDirDesigns[indexDir]}/${name}`,
                        `${dirpath}/${dataDirDesigns[indexDir]}/${dateStr}/0-${name}`, function (error) {
                        if (error) return console.error(error);
                    });
                }
            });


            // dataDirDesigns[indexDir]  - folder name
//console.log(item.match(/(\d{3})/g)[0])
            /*
            * + стврорити папку - дата
            * зробити копію даного файлу - 0 + digt
            * в папку - date
            * */
            /*copyFile('original.js', 'copy.js', function (error) {
                if (error) return console.error(error);
                console.log('File was copied!')
            });*/
        }

    });
});

function createFolder(dir) {
    mkdirp(dir, function (err) {
        if (err) console.log(err);
    });
}

//
function findFileForCopy(path) {
    fs.readdir(path, (err, files) => {
        console.log(files)
    });
}

function listFoldersInDesigns() {

    fs.mkdir(dirpath, (err, files) => {
        console.log(files)
        files.forEach(file => {
            // dir name \ ./Designs/V_Vinyl.clocks
            //
            //if (designDir === indexDir) {
            // createFolder(`${dirpath}/${file}/${dateStr}/`)
// 0 + fileDesigns
            //const fileDesigns = item.match(/(\d{3})/g)[0];
            //findFileForCopy(`${dirpath}/${file}`)
            copyFile('original.js', 'copy.js', function (error) {
                if (error) return console.error(error);
                console.log('File was copied!')
            });
            //}
        });
    });
}


/*files.forEach(file => {
    // dir name \ ./Designs/V_Vinyl.clocks
    const designDir = file.match(/^[\D+_]/g)[0];
    //if (designDir === indexDir){
    // createFolder(`${dirpath}/${file}/${dateStr}/`)
    //}
});*/
