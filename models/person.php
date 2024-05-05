<?php
class User {
    private $id;
    private $userName;

    function __construct($id, $userName) {
        if(empty($id) || empty($userName)) {
            throw new Exception('ID and Username cannot be empty');
        }
        $this->id = $id;
        $this->userName = $userName;
    }

    public function getId() {
        return $this->id;
    }

    public function getUserName() {
        return $this->userName;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setUserName($userName) {
        $this->userName = $userName;
    }
}