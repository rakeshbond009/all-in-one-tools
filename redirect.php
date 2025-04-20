<?php
// Get the short code from URL
$code = trim($_SERVER['REQUEST_URI'], '/');

// Path to our URL database
$db_file = __DIR__ . '/tools/urls.json';

// Check if database exists
if (!file_exists($db_file)) {
    die('URL database not found');
}

// Load URLs
$urls = json_decode(file_get_contents($db_file), true);

// Check if code exists
if (!isset($urls[$code])) {
    die('Short URL not found');
}

// Get original URL
$original_url = $urls[$code]['url'];

// Redirect to original URL
header("Location: $original_url");
exit;
?> 