const fs = require('fs');
//const mkdirp = require('mkdirp');
const copyFile = require('quickly-copy-file');
const path = require('path');

const filepath = path.join(__dirname, '../../../list.txt');
const dirpath = path.join(__dirname, '../../../Designs');
const donepath = path.join(__dirname, '../../../done');

exports.readList = function (callback) {
    console.log('start reading');
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
            (minuts.length === 1) ? `0${minuts}` : minuts}-${date.getSeconds()}`;

// list designs folder [ 'V_Vinyl.clocks', 'W_Wooden_clocks' ]
        const listDirDesigns = fs.readdirSync(dirpath);
        let dataDirDesigns = {};
        listDirDesigns.forEach((item) => {
            const designDir = item.match(/^[\D+_]/g)[0];
            dataDirDesigns[designDir] = item;
        });
        //console.log(dataDirDesigns);

        let dataSavedCopy = {};

        console.log(lines)
// maping
        lines.forEach((item, index) => {
            callback(index, lines);
            // ^\D+ /  index for search folder - 'W' 'A' ...
            const indexDir = item.match(/^\D+/g)[0].toUpperCase();

            if (!!dataDirDesigns[indexDir]) {
// array of files
                const listFiles = fs.readdirSync(`${dirpath}/${dataDirDesigns[indexDir]}/`);

                listFiles.forEach((name) => {
                    if (name.match(/(\d{4})/g)[0] === `0${item.match(/(\d{3})/g)[0]}`) {
                        //createFolder(`${dirpath}/${dataDirDesigns[indexDir]}/${dateStr}/`);

                        if (!fs.existsSync(`${donepath}_${dateStr}`)) {
                            fs.mkdirSync(`${donepath}_${dateStr}`);
                        }

                        if (!fs.existsSync(`${donepath}_${dateStr}/${dataDirDesigns[indexDir]}/`)) {
                            fs.mkdirSync(`${donepath}_${dateStr}/${dataDirDesigns[indexDir]}/`);
                        }
                        const keyCopy = `${indexDir}${name}`;
                        if (typeof dataSavedCopy[keyCopy] === 'undefined') {
                            dataSavedCopy[keyCopy] = 1;
                        } else {
                            dataSavedCopy[keyCopy] += 1;
                        }

                        console.log(dataSavedCopy);
                        console.log('-----');

                        copyFile(`${dirpath}/${dataDirDesigns[indexDir]}/${name}`,
                            `${donepath}_${dateStr}/${dataDirDesigns[indexDir]}/${name.replace('.', `-${dataSavedCopy[keyCopy]}.`)}`, function (error) {
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
};

/*
function createFolder(dir) {
    mkdirp(dir, function (err) {
        if (err) console.log(err);
    });
}*/

//
/*
function findFileForCopy(path) {
    fs.readdir(path, (err, files) => {
        console.log(files)
    });
}*/

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
