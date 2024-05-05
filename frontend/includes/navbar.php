<?php
$current_page = basename($_SERVER['PHP_SELF']);
?>

<div class="pt-3">
    <div class="container bg-dark">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="./index.php" <?php echo $current_page == 'index.php' ? 'class="active"' : '' ?>>Chatroom</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="navbar-brand" href="#About">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="navbar-brand" href="#Settings">Settings</a>
                    </li>
                </ul>
            </div>
        </nav>   
    </div>
</div>