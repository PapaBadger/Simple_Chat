<?php
include("businesslogic/simpleLogic.php");

$param = $_GET["param"] ?? null;
$method = $_GET["method"] ?? null;

if (!$method || !$param) {
    response("GET", 400, "Invalid request");
    exit;
}

$logic = new SimpleLogic();

try {
    $result = $logic->handleRequest($method, $param);
    if ($result == null) {
        response("GET", 400, "No data found");
    } else {
        response("GET", 200, $result);
    }
} catch (Exception $e) {
    response("GET", 500, $e->getMessage());
}

function response($method, $httpStatus, $data)
{
    header('Content-Type: application/json');
    switch ($method) {
        case "GET":
            http_response_code($httpStatus);
            echo json_encode($data);
            break;
        default:
            http_response_code(405);
            echo json_encode("Method not supported yet!");
    }
}