<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and fetch form inputs
    $first_name = htmlspecialchars(trim($_POST['first-name'] ?? ''));
    $last_name = htmlspecialchars(trim($_POST['last-name'] ?? ''));
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars(trim($_POST['phone'] ?? ''));
    $message = htmlspecialchars(trim($_POST['message'] ?? ''));

    // Basic validation (you can add more)
    if (empty($first_name) || empty($last_name) || empty($email) || empty($message)) {
        echo json_encode(["success" => false, "error" => "Please fill in all required fields."]);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["success" => false, "error" => "Invalid email address."]);
        exit;
    }

    $email_to = "info@mhntechworld.com";  // Replace with your actual email address
    $email_subject = "New Message from: " . $first_name . " " . $last_name;

    $email_message = "First Name: " . $first_name . "\n";
    $email_message .= "Last Name: " . $last_name . "\n";
    $email_message .= "Email: " . $email . "\n";
    $email_message .= "Phone: " . $phone . "\n";
    $email_message .= "Message: " . $message . "\n";

    $headers = "From: " . $email . "\r\n" .
               "Reply-To: " . $email . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    $mail_sent = mail($email_to, $email_subject, $email_message, $headers);

    if ($mail_sent) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => "Failed to send email."]);
    }
}
?>
