<?php
$host = 'localhost';
$db = 'db_pos';
$user = 'root';
$pass = '';

$dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
    echo "Connected successfully to the database.";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    throw new PDOException($e->getMessage(), (int)$e->getCode());
}
?>
