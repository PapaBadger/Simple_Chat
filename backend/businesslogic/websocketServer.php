<?php
require('vendor/autoload.php');
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use MyApp\Chat;

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new Chat()
        )
    ),
    8080
);

echo "\nServer started on port 8080\n\n";
echo "Server running...\n\n";
echo "Listening for clients...\n\n";

$server->run();