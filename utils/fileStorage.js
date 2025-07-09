const fs = require('fs');
const path = require('path');

function loadData(filename) {
  const filePath = path.join(__dirname, '..', 'data', filename);
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf8');
  try {
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to parse file:', filename, err);
    return [];
  }
}

function saveData(filename, data) {
  const filePath = path.join(__dirname, '..', 'data', filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = {
  loadData,
  saveData
};
