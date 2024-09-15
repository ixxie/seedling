import Database from 'better-sqlite3'
import type { Database as DatabaseType } from 'better-sqlite3';

import { migrateDb } from './migrate/run'

let writer: DatabaseType | null = null;

export function initDb(opts: Database.Options = {}) {
    const path = migrateDb()
    if (opts.readonly) {
        return new Database(path, opts);
    } else if (writer) {
        return writer
    } else {
        writer = new Database(path, opts);
        return writer;
    }
}
