import fs from 'fs';
import path from 'path';

const dbFilePath = path.resolve('./db/db.json');

const DB = {
  async get() {
    try {
      const data = fs.readFileSync(dbFilePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading db.json:', error);
      return { posts: [] };
    }
  },

  async save(db) {
    try {
      const data = JSON.stringify(db, null, 2);
      fs.writeFileSync(dbFilePath, data, 'utf-8');
    } catch (error) {
      console.error('Error writing to db.json:', error);
    }
  },
};

export default DB;
