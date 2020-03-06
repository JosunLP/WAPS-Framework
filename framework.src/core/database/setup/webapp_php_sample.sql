USE `webapp_php_sample`;
-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `iplogg`
--

CREATE TABLE ipLogg
(
    IPID     int NOT NULL AUTO_INCREMENT,
    info     text,
    clientIP VARCHAR(999),
    publicIP VARCHAR(999),
    TS       TIME,
    DT       DATE,
    PRIMARY KEY (IPID)
);


--
-- Tabellenstruktur für Tabelle `user`
--

CREATE TABLE usr
(
    UID       int(11)                 NOT NULL auto_increment,
    userName  text CHARACTER SET utf8 NOT NULL,
    firstName text CHARACTER SET utf8 NOT NULL,
    lastName  text CHARACTER SET utf8 NOT NULL,
    email     text CHARACTER SET utf8 NOT NULL,
    userRank  text CHARACTER SET utf8 NOT NULL,
    age       date                 NOT NULL,
    PRIMARY KEY (UID)
);



--
-- Tabellenstruktur für Tabelle `user`
--

CREATE TABLE passWd
(
    PWID     int(11)   NOT NULL auto_increment,
    UID      int(11)   NOT NULL,
    passwort text(256) NOT NULL,
    PRIMARY KEY (PWID),
    CONSTRAINT FK_UID FOREIGN KEY (UID) REFERENCES usr (UID)
);



--
-- Tabellenstruktur für Tabelle `migrations`
--

CREATE TABLE migrations
(
    MID           int(11)   NOT NULL auto_increment,
    migrationName text(256) NOT NULL,
    TS            TIME,
    DT            DATE,
    PRIMARY KEY (MID)
);



-- --------------------------------------------------------

--
-- Einfügen des Admin Acounts
--

INSERT INTO usr (UID, userName, firstName, lastName, email, userRank, age)
VALUES (1, 'Admin', 'Admin', 'Admin', 'admin@email.de', 'Admin', '1997-03-06'),
       (2, 'Tester1', 'Tester1', 'Tester1', 'test1@email.de', 'User', '1997-03-06')
;

--
-- Einfügen des Temporären, gehashten Admin Passworts
--

INSERT INTO passWd (PWID, UID, passwort)
VALUES (1, 1, '$2y$10$BtaQ1/t3pcDlT1kRb8j79eeSGpW0QINqG6vEtwvvKk17o1ASn7vaq'),
       (2, 2, '$2y$10$BFL5Qd.ETHD9KvADTQ3o8OHbXBvLJJJSzmvFkS8P76.bPrYz4mrQ6')
;
