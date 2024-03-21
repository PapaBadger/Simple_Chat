<?php
class User {
    public $id;
    public $userName;

    function __construct($id, $userName) {
        $this->id = $id;
        $this->userName = $userName;
      }
}
