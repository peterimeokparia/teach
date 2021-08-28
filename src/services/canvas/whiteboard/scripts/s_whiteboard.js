//This file is only for saving the whiteboard.

// const notatest = require("../../../course/api");
// const PREFIXT = 'http://localhost:9005/api/v1';

const fs = require("fs");
const config = require("./config/config");
const { getSafeFilePath } = require("./utils");
const FILE_DATABASE_FOLDER = "savedBoards";

var savedBoards = {};
var savedUndos = {};
var saveDelay = {};

if (config.backend.enableFileDatabase) {
    // make sure that folder with saved boards exists
    fs.mkdirSync(FILE_DATABASE_FOLDER, {
        // this option also mutes an error if path exists
        recursive: true,
    });
}

/**
 * Get the file path for a whiteboard.
 * @param {string} wid Whiteboard id to get the path for
 * @returns {string} File path to the whiteboard
 * @throws {Error} if wid contains potentially unsafe directory characters
 */
function fileDatabasePath(wid) {
    return getSafeFilePath(FILE_DATABASE_FOLDER, wid + ".json");
}

module.exports = {
    handleEventsAndData: function (content) {
        var tool = content["t"]; //Tool which is used
        var wid = content["wid"]; //whiteboard ID
        var username = content["username"];
        if (tool === "clear") {
            //Clear the whiteboard
            delete savedBoards[wid];
            delete savedUndos[wid];
            // delete the corresponding file too
            fs.unlink(fileDatabasePath(wid), function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        } else if (tool === "undo") {
            //Undo an action
            if (!savedUndos[wid]) {
                savedUndos[wid] = [];
            }
            let savedBoard = this.loadStoredData(wid);
            if (savedBoard) {
                for (var i = savedBoards[wid].length - 1; i >= 0; i--) {
                    if (savedBoards[wid][i]["username"] == username) {
                        var drawId = savedBoards[wid][i]["drawId"];
                        for (var i = savedBoards[wid].length - 1; i >= 0; i--) {
                            if (
                                savedBoards[wid][i]["drawId"] == drawId &&
                                savedBoards[wid][i]["username"] == username
                            ) {
                                savedUndos[wid].push(savedBoards[wid][i]);
                                savedBoards[wid].splice(i, 1);
                            }
                        }
                        break;
                    }
                }
                if (savedUndos[wid].length > 1000) {
                    savedUndos[wid].splice(0, savedUndos[wid].length - 1000);
                }
            }
        } else if (tool === "redo") {
            if (!savedUndos[wid]) {
                savedUndos[wid] = [];
            }
            let savedBoard = this.loadStoredData(wid);
            for (var i = savedUndos[wid].length - 1; i >= 0; i--) {
                if (savedUndos[wid][i]["username"] == username) {
                    var drawId = savedUndos[wid][i]["drawId"];
                    for (var i = savedUndos[wid].length - 1; i >= 0; i--) {
                        if (
                            savedUndos[wid][i]["drawId"] == drawId &&
                            savedUndos[wid][i]["username"] == username
                        ) {
                            savedBoard.push(savedUndos[wid][i]);
                            savedUndos[wid].splice(i, 1);
                        }
                    }
                    break;
                }
            }
        } else if (
            [
                "line",
                "pen",
                "rect",
                "circle",
                "eraser",
                "addImgBG",
                "recSelect",
                "eraseRec",
                "addTextBox",
                "setTextboxText",
                "removeTextbox",
                "setTextboxPosition",
                "setTextboxFontSize",
                "setTextboxFontColor",
            ].includes(tool)
        ) {
            let savedBoard = this.loadStoredData(wid);
            //Save all this actions
            delete content["wid"]; //Delete id from content so we don't store it twice
            if (tool === "setTextboxText") {
                for (var i = savedBoard.length - 1; i >= 0; i--) {
                    //Remove old textbox tex -> dont store it twice
                    if (
                        savedBoard[i]["t"] === "setTextboxText" &&
                        savedBoard[i]["d"][0] === content["d"][0]
                    ) {
                        savedBoard.splice(i, 1);
                    }
                }
            }
            savedBoard.push(content);
        }
        this.saveToDB(wid);
    },
    saveToDB: function (wid) {
        if (config.backend.enableFileDatabase) {
            //Save whiteboard to file
            if (!saveDelay[wid]) {
                saveDelay[wid] = true;
                setTimeout(function () {
                    saveDelay[wid] = false;
                    if (savedBoards[wid]) {
                        // do something here
                        console.log('@@@wid wid wid wid@@@');
                        console.log(JSON.stringify(wid));

                        fs.writeFile(
                            fileDatabasePath(wid),
                            JSON.stringify(savedBoards[wid]),
                            (err) => {
                                if (err) {
                                    return console.log(err);
                                }
                            }
                        );
                    }
                }, 1000 * 10); //Save after 10 sec
            }
        }
    },
    saveJsonData: function (wid, jsonData) {
        savedBoards[wid] = [];
        if (config.backend.enableFileDatabase) {
            //save to file
            fs.writeFile(
                fileDatabasePath(wid),
                JSON.stringify(jsonData),
                (err) => {
                    if (err) {
                        return console.log(err);
                    }
                }
            );

            savedBoards[wid] = jsonData
        }

        return savedBoards[wid];
    },
    // Load saved whiteboard
    loadStoredData: function (wid) {
        if (wid in savedBoards) {
            return savedBoards[wid];
        }

        savedBoards[wid] = [];

        //read saved board from file
        if (config.backend.enableFileDatabase) {
            var filePath = fileDatabasePath(wid);
            if (fs.existsSync(filePath)) {
                var data = fs.readFileSync(filePath);
                if (data) {
                    console.log('@@@reading from file source');
                    savedBoards[wid] = JSON.parse(data);
                }
            }
        }

        return savedBoards[wid];
    },
    clearWhiteBoard: function (wid) {
        delete savedBoards[wid];
        delete savedUndos[wid];
        // delete the corresponding file too
        fs.unlink(fileDatabasePath(wid), function (err) {
            if (err) {
                return console.log(err);
            }
        });
    },
    copyStoredData: function (sourceWid, targetWid) {
        const sourceData = this.loadStoredData(sourceWid);
        if (sourceData.length === 0 || this.loadStoredData(targetWid).lenght > 0) {
            return;
        }
        savedBoards[targetWid] = sourceData.slice();
        this.saveToDB(targetWid);
    },
    saveData: function (wid, data) {
        const existingData = this.loadStoredData(wid);
        if (existingData.length > 0 || !data) {
            return;
        }
        savedBoards[wid] = JSON.parse(data);
        this.saveToDB(wid);
    },
};
