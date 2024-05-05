<?php
namespace MyApp;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Chat implements MessageComponentInterface {
    public function onOpen(ConnectionInterface $conn) {
        // Store the new connection
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        // Broadcast the message to all connections
    }

    public function onClose(ConnectionInterface $conn) {
        // Remove the connection
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        // Handle the error
    }
}