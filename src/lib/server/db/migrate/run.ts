import Database from 'better-sqlite3';
import { readdirSync, accessSync } from 'fs'

import v01 from "./v01";

const migrations = [
    v01
]

function getDbVersion() {
    const files = readdirSync('data/db')
    const versions = files
        .map((file: string) => file.match(/seedling.v([0-9]+).sqlite/))
        .filter((m: RegExpMatchArray | null): m is RegExpMatchArray  => !!m)
    const version = Math.max(...versions.map((match: RegExpMatchArray) => Number(match[1])), 0)
    return version
}

function getAppVersion() {
    const files = readdirSync('src/lib/server/db/migrate')
    const versions = files
        .map((file: string) => file.match(/v([0-9]+).ts/))
        .filter((m: RegExpMatchArray | null): m is RegExpMatchArray  => !!m)
    const version = Math.max(...versions.map((match: RegExpMatchArray) => Number(match[1])))
    if (migrations.length !== version) {
        throw new Error("A migration file has been added but imported to `lib/server/migrate/run.ts`")
    }
    return version
}

export function migrateDb() {
    const appVersion = getAppVersion()
    const dbVersion = getDbVersion()
    const logVersions = () => {
        console.log(`
 +----------------------+
  Seedling version:
    App: v${appVersion}
    DB:  v${dbVersion}
 +----------------------+
        `)
    }
    if (dbVersion > appVersion) {
        logVersions()
        throw new Error("You are running an outdated version of the app against a newer version of the database")
    }
    if (dbVersion < appVersion) {
        logVersions()
        console.log('Executing migration pathway:')
        let i = dbVersion
        while (i < migrations.length) {
            migrations[i]()
            console.log(`  Succesfully migrated database to version ${i + 1}`)
            i++;
        }
    }
    // verify database exists
    const path = `data/db/seedling.${
        appVersion < 10
        ? `v0${appVersion}`
        : `v${appVersion}`
    }.sqlite`
    // crash if it doesn't
    accessSync(path);
    // return the path to the database
    return path;
}