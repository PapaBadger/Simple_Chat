<?php
include("./models/person.php");

class DataHandler
{
    public function queryPersons()
    {
        // Replace with actual database query
        $res =  $this->getDemoData();
        return $res;
    }

    public function queryPersonById($id)
    {
        foreach ($this->queryPersons() as $val) {
            if ($val[0]->id == $id) {
                return $val;
            }
        }
        throw new Exception("No person found with id: $id");
    }

    private static function getDemoData()
    {
        $demodata = [
            [new User(1, "personOne")],
            [new User(2, "personTwo")],
            [new User(3, "personThree")],
            [new User(4, "personFour")],
        ];
        return $demodata;
    }
}