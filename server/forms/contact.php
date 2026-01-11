<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Database configuration (for production)
$host = 'localhost';
$dbname = 'marketing_db';
$username = 'root';
$password = '';

// For demo purposes, we'll use JSON file storage
// In production, you would use MySQL

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

// If no JSON data, check form data
if (empty($data)) {
  $data = $_POST;
}

// Validate required fields
$required = ['firstName', 'lastName', 'email', 'message'];
$errors = [];

foreach ($required as $field) {
  if (empty($data[$field])) {
    $errors[$field] = "The $field field is required.";
  }
}

// Validate email
if (!empty($data['email']) && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
  $errors['email'] = "Please enter a valid email address.";
}

// If there are errors, return them
if (!empty($errors)) {
  http_response_code(400);
  echo json_encode([
    'success' => false,
    'message' => 'Validation failed',
    'errors' => $errors
  ]);
  exit;
}

// Prepare contact data
$contactData = [
  'firstName' => htmlspecialchars($data['firstName']),
  'lastName' => htmlspecialchars($data['lastName']),
  'email' => htmlspecialchars($data['email']),
  'phone' => isset($data['phone']) ? htmlspecialchars($data['phone']) : '',
  'company' => isset($data['company']) ? htmlspecialchars($data['company']) : '',
  'service' => isset($data['service']) ? htmlspecialchars($data['service']) : '',
  'budget' => isset($data['budget']) ? htmlspecialchars($data['budget']) : '',
  'message' => htmlspecialchars($data['message']),
  'newsletter' => isset($data['newsletter']) ? true : false,
  'timestamp' => date('Y-m-d H:i:s'),
  'ip' => $_SERVER['REMOTE_ADDR']
];

// In production, you would:
// 1. Save to database
// 2. Send email notification
// 3. Send confirmation email to user

// For demo, save to JSON file
$filename = 'contacts.json';
$contacts = [];

if (file_exists($filename)) {
  $contacts = json_decode(file_get_contents($filename), true);
}

$contacts[] = $contactData;

if (file_put_contents($filename, json_encode($contacts, JSON_PRETTY_PRINT))) {
  // Send email notification (for demo, just simulate)
  $to = "info@primemarketers.com";
  $subject = "New Contact Form Submission";
  $message = "New contact form submission:\n\n";
  $message .= "Name: {$contactData['firstName']} {$contactData['lastName']}\n";
  $message .= "Email: {$contactData['email']}\n";
  $message .= "Phone: {$contactData['phone']}\n";
  $message .= "Company: {$contactData['company']}\n";
  $message .= "Service: {$contactData['service']}\n";
  $message .= "Budget: {$contactData['budget']}\n";
  $message .= "Message: {$contactData['message']}\n";
  $message .= "Subscribed to newsletter: " . ($contactData['newsletter'] ? 'Yes' : 'No') . "\n";

  // In production, uncomment the following:
  // $headers = "From: contact-form@primemarketers.com\r\n";
  // $headers .= "Reply-To: {$contactData['email']}\r\n";
  // mail($to, $subject, $message, $headers);

  // Return success response
  echo json_encode([
    'success' => true,
    'message' => 'Thank you for your message! We will get back to you within 24 hours.',
    'data' => [
      'name' => $contactData['firstName'] . ' ' . $contactData['lastName'],
      'email' => $contactData['email']
    ]
  ]);
} else {
  http_response_code(500);
  echo json_encode([
    'success' => false,
    'message' => 'Failed to save contact information. Please try again.'
  ]);
}
