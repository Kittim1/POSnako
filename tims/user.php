<?php
header("Content-type: application/json");
header("Access-Control-Allow-Origin: *");

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

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        $username = $input['user'] ?? '';
        $password = $input['password'] ?? '';

        // Prepare and execute the query
        $stmt = $pdo->prepare('SELECT FirstName AS user, LastName AS fullName FROM employees WHERE FirstName = ? AND LastName = ?');
        $stmt->execute([$username, $password]);
        $user = $stmt->fetch();

        if ($user) {
            echo json_encode($user);
        } else {
            http_response_code(401);
            echo json_encode(['message' => 'Invalid username or password']);
        }
    } else {
        // If not POST, just return all users
        $stmt = $pdo->query('SELECT FirstName AS user, LastName AS fullName FROM employees');
        $users = $stmt->fetchAll();

        echo json_encode($users);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['message' => 'Connection failed: ' . $e->getMessage()]);
}
?>
