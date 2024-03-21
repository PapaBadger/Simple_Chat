<?php
include("./models/person.php");
class DataHandler
{
    public function queryPersons()
    {
        $res =  $this->getDemoData();
        return $res;
    }

    public function queryPersonById($id)
    {
        $result = array();
        foreach ($this->queryPersons() as $val) {
            if ($val[0]->id == $id) {
                array_push($result, $val);
            }
        }
        return $result;
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
