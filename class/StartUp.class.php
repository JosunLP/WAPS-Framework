<?php


namespace webapp_php_sample_class;

use mysqli;

class StartUp
{
    static function createDatabase()
    {
        require_once('config/db.config.php');
        $query = file_get_contents("../sql/php_WebApp_sample.sql");

        $db_link = new mysqli(
            MYSQL_HOST,
            MYSQL_BENUTZER,
            MYSQL_KENNWORT
        );

        $db_link_done = mysqli_connect(
            MYSQL_HOST,
            MYSQL_BENUTZER,
            MYSQL_KENNWORT,
            MYSQL_DATENBANK
        );

        if ($db_link->connect_error) {
            die("Connection failed: " . $db_link->connect_error);
        }

        if ($db_link->query($query) === TRUE) {
            return $db_link_done;

        } else {
            echo "Error creating database: " . $db_link->error;
        }

    }

    function classDirCheck()
    {

    }

}