<?php
namespace MyApp;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Chat implements MessageComponentInterface {
    protected $clients;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
    }

    public function onOpen(ConnectionInterface $conn) {
    $this->clients->attach($conn);
    echo "New connection! ({$conn->resourceId}, {$conn->username})\n";
}

    public function onMessage(ConnectionInterface $from, $msg) {
        $messageData = json_decode($msg);
        if ($messageData === null) {
            // The message is not a valid JSON string.
            return;
        }
        $username = $messageData->username;
        $text = $messageData->text;
        $responseText = "{$username}: {$text}";
        foreach ($this->clients as $client) {
            if ($from != $client) {
                $client->send(json_encode([
                    'type' => 'chat',
                    'username' => $username,
                    'text' => $responseText
                ]));
            }
        }
        echo "New message: {$responseText}\n";
        $from->send(json_encode([
            'type' => 'chat',
            'username' => 'Server',
            'text' => "Message received: {$responseText}"
        ]));
    }

    public function onClose(ConnectionInterface $conn) {
        $this->clients->detach($conn);
        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";
        $conn->close();
    }
}

