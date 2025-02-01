---
title: "How to grant privileges to future tables in PostgreSQL"
date: "2024-04-10"
tags: ["postgresql", "database", "aws"]

---
To grant permissions to future tables in PostgreSQL, you can use the `ALTER DEFAULT PRIVILEGES` command. This command allows you to set the privileges that will be applied to objects created in the future. It's important to note that `ALTER DEFAULT PRIVILEGES` only affects new tables and does not apply to existing ones. The privileges are set for the current user or for a specific user if specified in the `FOR USER` clause.

Here's how you can grant permissions to future tables:

## For the Current User

If you want to grant permissions to future tables created by the current user, you can use the following command:

```sql
ALTER DEFAULT PRIVILEGES IN SCHEMA public 
GRANT ALL ON TABLES TO backup;
```

This command grants all privileges on future tables in the public schema to the backup user. Replace `backup` with the appropriate user name and `public` with the schema name if different.

## For a Specific User

If you want to grant permissions to future tables created by a specific user, you can use the `FOR USER` clause. This is particularly useful when you want to set default privileges for tables created by a user other than the current one. For example:

```sql
ALTER DEFAULT PRIVILEGES FOR USER tableuser IN SCHEMA public 
GRANT ALL ON TABLES TO backup;
```

This command grants all privileges on future tables in the public schema created by `tableuser` to the backup user.

## Important Notes

- These commands need to be executed by a user with the necessary privileges to alter default privileges, typically a superuser or the owner of the tables
- These commands only affect tables created after the command is executed
- Existing tables will not be affected by these changes

