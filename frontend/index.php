<!DOCTYPE html>
<html>
<head>
    <title>Chatroom</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/style.css"></head>
<body>
    <?php include './includes/navbar.php'; ?>
    <script src="controller.js"></script>
    <div class="container bg-dark">
        <div class="chat-container">
            <div class="messages">
                <!-- Messages will be displayed here -->
            </div>
        </div>
        <div class="tabs">
            <div class="col">
                <ul class="nav nav-tabs row" id="myTabs">
                    <li class="nav-item col-6">
                        <a class="nav-link active" href="#tab1" data-toggle="tab">members</a>
                    </li>
                    <li class="nav-item col-6">
                        <a class="nav-link" href="#tab2" data-toggle="tab">channels</a>
                    </li>
                <div class="tab-content">
                    <div class="tab-pane active" id="tab1">
                        <p>
                            <li class="list-item">
                                pu$$ydestroyer69
                            </li>
                            <li class="list-item">
                                JohnDoe123
                            </li>
                            <li class="list-item">
                                JaneSmith456
                            </li>
                            <li class="list-item">
                                EmilyBrown123
                            </li>
                            <li class="list-item">
                                cumblaster666
                            </li>
                        </p>
                    </div>
                    <div class="tab-pane" id="tab2">
                        <p>
                            <li class="list-item">
                                /python
                            </li>                                <li class="list-item">
                                /csharp
                            </li>                                <li class="list-item">
                                /javascript
</li>                                <li class="list-item">
                                /java
                            </li>                                <li class="list-item">
                                /htmlcss
                            </li>
                            <!-- Rest of the list items... -->
                        </p>
                    </div>
                </div>
            </div>
        </div>       
    </div>
    <div class="container bg-dark">
        <div class="input-container">
            <textarea class="input-field" id="text" rows="1" placeholder="Type your message..."></textarea>
            <button class="btn send-button"> >> </button>
        </div>
    </div>

    
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>    
</body>
</html>
