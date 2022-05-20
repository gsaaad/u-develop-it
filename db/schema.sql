/* ALLOWS FOR RETESTING DATABASE PURPOSES/clean state */

DROP TABLE IF EXISTS candidates;
DROP TABLE IF EXISTS parties;
DROP TABLE IF EXISTS voters;

/* creating a table for cadidates, id is auto incremented, has category for first/last name 30 characters long, industry - connected */

/* define this first because constraint relies on parties, and parties ID */
CREATE TABLE parties (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT
);

CREATE TABLE candidates (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
    /* added foreign key party id */
  party_id INTEGER,
  industry_connected BOOLEAN NOT NULL,
    /* constraint used to point out a foreign key, id in candidates HAS TO BE in party id */
  CONSTRAINT fk_party FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE SET NULL
);


/* CREATE VOTERS TABLLES */

CREATE TABLE voters (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30)  NOT NULL,
    email VARCHAR(50) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
