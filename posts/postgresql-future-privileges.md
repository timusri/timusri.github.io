---
title: "How to grant privileges to future tables in PostgreSQL?"
date: "2024-04-02"
tags: ["postgresql", "database", "aws", "rds", "permissions", "security"]
description: "A practical guide to using ALTER DEFAULT PRIVILEGES in PostgreSQL to grant permissions to tables that will be created in the future, ensuring proper access control for your database."
author: "Sumit Srivastava"
externalUrl: "https://timusri.medium.com/how-to-grant-privileges-to-future-tables-in-postgresql-34bf5e789bb3"
---

# How to grant privileges to future tables in PostgreSQL?

2 min read

This article covers:
- Understanding `ALTER DEFAULT PRIVILEGES` command
- Granting permissions for the current user
- Using `FOR USER` clause for specific users
- Schema-level privilege management
- Important considerations for existing vs. future tables

**Key Commands:**
```sql
ALTER DEFAULT PRIVILEGES IN SCHEMA public 
GRANT ALL ON TABLES TO backup;

ALTER DEFAULT PRIVILEGES FOR USER tableuser 
IN SCHEMA public GRANT ALL ON TABLES TO backup;
```

**Important Notes:**
- Only affects new tables created after the command
- Requires superuser or owner privileges
- Essential for automated database management

Read the full article on Medium.

