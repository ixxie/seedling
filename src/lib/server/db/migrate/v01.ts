import Database from "better-sqlite3"

export default () => {
    const v1 = new Database(
        'data/db/seedling.v01.sqlite', { 
        verbose: console.log 
    });    
    v1.exec(`--sql
        pragma user_version = 1;           -- schema version
        pragma journal_mode = wal2;        -- write ahead log
        pragma synchronous = normal;       -- synchronise less often to the filesystem
        pragma foreign_keys = on;          -- enable foreign keys (for a slight perf hit)
        pragma case_sensitive_like = on;   -- make like operator case sensitive

        -- user
        create table if not exists
        account (
            id text not null primary key,
            username text not null unique,
            email text not null unique check (email like '%_@__%.__%'),
            password_hash text not null
        );
        create table if not exists
        session (
            id text not null primary key,
            expires_at integer not null,
            user_id text not null,
            foreign key (user_id) references account(id)
        );

        -- workspace
        create table if not exists
        studio (
            id text not null primary key,
            name text not null
        );
        create table if not exists
        role (
            id text not null primary key,
            type text check (type in ('owner', 'editor', 'writer')),
            account_id text not null,
            studio_id text not null,

            foreign key (account_id) references account(id),
            foreign key (studio_id) references studio(id)
        );

        -- content
        create table if not exists 
        article (
            id integer not null primary key,
            content text,
            studio_id text not null,

            foreign key (studio_id)
                references studio(id)
        );
    `)
}