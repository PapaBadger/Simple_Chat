<?php
include 'dbConnect.php';

if ($conn) {
    echo "Connection successful";
} else {
    echo "Connection failed";
}