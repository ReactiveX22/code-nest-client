import fs from 'fs';
import path from 'path';

const db = async () => {
  try {
    const filePath = path.resolve('./db/db.json');

    const data = fs.readFileSync(filePath, 'utf-8');
    const db = JSON.parse(data);

    return db;
  } catch (error) {
    console.error('Error reading db.json:', error);
    return null;
  }
};

export default db;
