<?php
include("db_connect.php");

class DataHandler
{
    private $conn;

    public function __construct()
    {
        global $conn;
        $this->conn = $conn;
    }

    public function getUsers()
    {
        $res = [];
        $sql = "SELECT * FROM users";
        $result = $this->conn->query($sql);

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $res[] = $row;
            }
        }

        return $res;
    }

    public function getMessages()
    {
        $res = [];
        $sql = "SELECT * FROM messages";
        $result = $this->conn->query($sql);

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $res[] = $row;
            }
        }

        return $res;
    }

    public function addMessage($userId, $message)
    {
        $sql = "INSERT INTO messages (user_id, message) VALUES (?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("is", $userId, $message);
        $stmt->execute();
    }
}