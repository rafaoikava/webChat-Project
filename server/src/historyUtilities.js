const fs = require("fs");
const path = require("path");
const HISTORY_FILE = path.join(__dirname, "chatHistory.json");
const MAX_HISTORY = 250;

function readHistory() {
  try {
    const data = fs.readFileSync(HISTORY_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeHistory(history) {
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
}

function addMessageToHistory(msgObj) {
  let history = readHistory();
  history.push(msgObj);

  if (history.length > MAX_HISTORY) {
    history = history.slice(history.length - MAX_HISTORY);
  }

  writeHistory(history);
}

module.exports = { readHistory, writeHistory, addMessageToHistory };
