import Dexie from 'dexie';

const db = new Dexie('todo-db');
db.version(1).stores({
  tasks: '++id, taskId', // Primary key and indexed props
});

export default db