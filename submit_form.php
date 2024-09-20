<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $msg = $_POST["msg"];
    
    // Compose the email
    $to = "riya.munot13@example.com";
    $subject = "New Contact Form Submission";
    $message = "Name: $name\nEmail: $email\nMessage: $msg";
    $headers = "From: $email";

    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        header("Location: index.html?status=success");
    } else {
        header("Location: index.html?status=error");
    }
    exit();
}
?>