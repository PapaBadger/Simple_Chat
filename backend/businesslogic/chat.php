<?php
namespace MyApp;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Chat implements MessageComponentInterface {
    private $clients;
    private $users;
    private $userLookup;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
        $this->users = [];
        $this->userLookup = [];
    }

    public function onOpen(ConnectionInterface $conn) {
        $this->clients->attach($conn);
        echo "New connection! ({$conn->resourceId})\n";
    
        // Send the updated user list to all clients
        foreach ($this->clients as $client) {
            $client->send(json_encode([
                'type' => 'userList',
                'users' => $this->users
            ]));
        }
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $messageData = json_decode($msg);
        if (!isset($messageData->type)) {
            echo "Message does not have a type property.\n";
            return;
        }
    
        if ($messageData->type === 'newUser') {
            $username = $messageData->username;
    
            // Check if the user is already in the user list
            if (!in_array($username, $this->users)) {
                // Add the user to the user list
                $this->users[] = $username;
            }
    
            // Send the updated user list to all clients
            foreach ($this->clients as $client) {
                $client->send(json_encode([
                    'type' => 'userList',
                    'users' => $this->users
                ]));
            }
        } elseif ($messageData->type === 'chat') {
            $username = $messageData->username;
            $text = $messageData->text;
            foreach ($this->clients as $client) {
                // Don't send the message back to the client who sent it
                if ($from !== $client) {
                    $client->send(json_encode([
                        'type' => 'chat',
                        'username' => $username,
                        'text' => $text
                    ]));
                }
            }
        }
    }

    
  
    public function onClose(ConnectionInterface $conn) {
        $this->clients->detach($conn);
        echo "Connection {$conn->resourceId} has disconnected\n";
    
        // Remove the user from the userLookup array
        if (isset($this->userLookup[$conn->resourceId])) {
            $username = $this->userLookup[$conn->resourceId];
            unset($this->userLookup[$conn->resourceId]);
    
            // Delay the removal of the user from the user list
            $this->loop->addTimer(5, function() use ($username) {
                $index = array_search($username, $this->users);
                if ($index !== false) {
                    unset($this->users[$index]);
                    $this->users = array_values($this->users);
                }
            });
        }
    
        // Send the updated user list to all remaining clients
        foreach ($this->clients as $client) {
            $client->send(json_encode([
                'type' => 'userList',
                'users' => $this->users
            ]));
        }
    }



    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";
        $conn->close();
    }
}

