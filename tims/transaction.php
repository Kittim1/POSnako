<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

// $servername = "localhost";
// $username = "root";
// $password = "";
// $dbname = "tims";

// $conn = new mysqli($servername, $username, $password, $dbname);

// if ($conn->connect_error) {
//     die("Connection failed: " . $conn->connect_error);
// }

$user = isset($_GET['user']) ? $_GET['user'] : '';

$sql = "SELECT * FROM transactions WHERE user = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $user);
$stmt->execute();
$result = $stmt->get_result();

$transactions = array();
while($row = $result->fetch_assoc()) {
    $transactions[] = $row;
}

echo json_encode($transactions);

$stmt->close();
$conn->close();
?>
