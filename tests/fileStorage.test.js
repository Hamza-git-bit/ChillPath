const fs = require('fs');
const path = require('path');
const { loadData, saveData } = require('../utils/fileStorage');

const testFile = 'testData.json';
const testPath = path.join(__dirname, '..', 'data', testFile);

describe('fileStorage utility functions', () => {
  afterEach(() => {
    if (fs.existsSync(testPath)) {
      fs.unlinkSync(testPath); // clean up
    }
  });

  test('saveData should write valid JSON', () => {
    const sample = [{ id: 1, name: 'Test' }];
    saveData(testFile, sample);

    const raw = fs.readFileSync(testPath, 'utf-8');
    expect(JSON.parse(raw)).toEqual(sample);
  });

  test('loadData should return empty array for non-existent file', () => {
    const result = loadData('nonexistent.json');
    expect(result).toEqual([]);
  });
});
