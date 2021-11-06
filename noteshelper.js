'use strict';
const fs = require('fs');
const FILEPATH = 'data.json';
const encoding = 'utf8'

/**
 * Helper class to read write and process data with data.json file
 */
class noteshelper {
    /**
     * Function to read file and return notes as JSON 
     * @returns 
     */
    static readNotes() {
        let rawdata = fs.readFileSync(FILEPATH,encoding);
        return JSON.parse(rawdata).data;
    }

    /**
     * Function to read file and return the note for the specific id as JSON
     * @param {*} id 
     * @returns 
     */
    static readNotesId(id) {
        let rawdata = fs.readFileSync(FILEPATH,encoding);
        const filteredArray = JSON.parse(rawdata).data.find((item) => item.id == id)
        return filteredArray;
    }
    /**
     * Function to create notes from input JSON
     * @param {*} content 
     * @returns 
     */
    static createNotes(content) {
        let rawdata = fs.readFileSync(FILEPATH,encoding);
        let dataObj = JSON.parse(rawdata);
        let data = dataObj.data;
    
        var size= data.length; //get size and create id
        let  note = content;
        note = { ...note, id: size, when :Math.floor(new Date().getTime() / 1000)};
        data = [...data, note];
        dataObj = {...dataObj, data};
    
        fs.writeFile(FILEPATH, JSON.stringify(dataObj, null, 2), (err) => {
            if (err) {
                console.log('Error adding data to ('+FILEPATH+') file ('+JSON.stringify(dataObj)+')');
                throw err;
            };
            console.log('Data added to ('+FILEPATH+') file successfully.');
        });

        return note;
    }

    /**
     * Delete notes with id from JSON
     * @param {*} id 
     */
    static deleteNotesId(id){
        let rawdata = fs.readFileSync(FILEPATH,encoding);
        let dataObj = JSON.parse(rawdata);
        let data = dataObj.data;
        const newData = data.filter((item) => item.id != id)

        data = [...newData];
        dataObj = {data};

        fs.writeFile(FILEPATH, JSON.stringify(dataObj, null, 2), (err) => {
            if (err) {
                console.log('Error deleting from('+FILEPATH+') file ('+JSON.stringify(dataObj)+')');
                throw err;
            };
            console.log('Deleted from file ('+FILEPATH+') file successfully.');
        });
    }

    /**
     * Function to create data.json file if not exist
     */
    static checkCreateJsonFile() {
        const checkFile = async (jsonPath) => {
            try {
                await fs.promises.stat(jsonPath);
                return true;
            } catch (err) {
                if (err.code === 'ENOENT') {
                    return false;
                } else {
                    throw err;
                }
            }
        };

        let check = checkFile(FILEPATH);

        check.then(function(exist) {
            if(!exist){
                fs.writeFile(FILEPATH, JSON.stringify({"data": []}, null, 2), function (err) {
                    if (err) throw err;
                    console.log('('+FILEPATH+') is created successfully.');
                });
            }
        });
    }
}

module.exports = noteshelper;