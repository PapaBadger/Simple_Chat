<?php
include("db/dataHandler.php");

class SimpleLogic
{
    private $dh;
    function __construct()
    {
        $this->dh = new DataHandler();
    }

    function handleRequest($method, $param)
    {
        switch ($method) {
            case "queryPersons":
                $res = $this->dh->queryPersons();
                break;
            case "queryPersonById":
                $res = $this->dh->queryPersonById($param);
                break;
            default:
                $res = null;
                break;
        }
        return $res;
    }
}
