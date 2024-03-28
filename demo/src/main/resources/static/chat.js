var stompClient = null;

function connect() {
    var socket = new SockJS('/chat');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/public', function (response) {
            showMessage(JSON.parse(response.body));
        });
    });
}

function sendMessage() {
    var messageContent = $("#message").val();
    var messageSender = $("#sender").val();
    stompClient.send("/app/chat.sendMessage", {}, JSON.stringify({ 'content': messageContent, 'sender': messageSender }));
    $("#message").val('');
}

function showMessage(message) {
    $("#chat").append("<tr><td>" + message.sender + ": " + message.content + "</td></tr>");
}

$(function () {
    connect();
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $("#sendBtn").click(function() {
        sendMessage();
    });
});
