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
    echo "New connection! ({$conn->remoteAddress})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $messageData = json_decode($msg);
        if (!isset($messageData->username) || !isset($messageData->text)) {
            // The messageData object doesn't have a username or text property.
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
                    'text' => $text
                ]));
            }
        }
        echo "{$responseText}\n";
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

