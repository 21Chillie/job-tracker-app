 CREATE TABLE "user"
  (
     "id"            TEXT NOT NULL PRIMARY KEY,
     "name"          TEXT NOT NULL,
     "email"         TEXT NOT NULL UNIQUE,
     "emailverified" INTEGER NOT NULL,
     "image"         TEXT,
     "createdat"     DATE NOT NULL,
     "updatedat"     DATE NOT NULL
  );

CREATE TABLE "session"
  (
     "id"        TEXT NOT NULL PRIMARY KEY,
     "expiresat" DATE NOT NULL,
     "token"     TEXT NOT NULL UNIQUE,
     "createdat" DATE NOT NULL,
     "updatedat" DATE NOT NULL,
     "ipaddress" TEXT,
     "useragent" TEXT,
     "userid"    TEXT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE
  );

CREATE TABLE "account"
  (
     "id"                    TEXT NOT NULL PRIMARY KEY,
     "accountid"             TEXT NOT NULL,
     "providerid"            TEXT NOT NULL,
     "userid"                TEXT NOT NULL REFERENCES "user" ("id") ON DELETE
     CASCADE,
     "accesstoken"           TEXT,
     "refreshtoken"          TEXT,
     "idtoken"               TEXT,
     "accesstokenexpiresat"  DATE,
     "refreshtokenexpiresat" DATE,
     "scope"                 TEXT,
     "password"              TEXT,
     "createdat"             DATE NOT NULL,
     "updatedat"             DATE NOT NULL
  );

CREATE TABLE "verification"
  (
     "id"         TEXT NOT NULL PRIMARY KEY,
     "identifier" TEXT NOT NULL,
     "value"      TEXT NOT NULL,
     "expiresat"  DATE NOT NULL,
     "createdat"  DATE NOT NULL,
     "updatedat"  DATE NOT NULL
  );

CREATE INDEX "session_userId_idx"
  ON "session" ("userid");

CREATE INDEX "account_userId_idx"
  ON "account" ("userid");

CREATE INDEX "verification_identifier_idx"
  ON "verification" ("identifier");  