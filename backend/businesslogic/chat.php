<?php
namespace MyApp;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Chat implements MessageComponentInterface {
    public function onOpen(ConnectionInterface $conn) {
        // Store the new connection
        echo "New connection! ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        // Broadcast the message to all connections
        echo "New message: {$msg}\n";
        $from->send("Message received: {$msg}");
    }

    public function onClose(ConnectionInterface $conn) {
        // Remove the connection
        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        // Handle the error
        echo "An error has occurred: {$e->getMessage()}\n";
        $conn->close();
    }
}