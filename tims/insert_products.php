<?php
include 'db.php'; // Include your database connection

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

// Fetch product data
$productData = [
    ["barcode" => "1001", "p_name" => "Bulad", "price" => 10],
    ["barcode" => "1002", "p_name" => "Mantika", "price" => 30],
    ["barcode" => "1003", "p_name" => "Noodles", "price" => 20],
    ["barcode" => "1004", "p_name" => "Sabon", "price" => 35],
    ["barcode" => "1005", "p_name" => "Shampoo", "price" => 15],
    ["barcode" => "1006", "p_name" => "Suka", "price" => 8],
    ["barcode" => "1007", "p_name" => "Toyo", "price" => 10],
    ["barcode" => "1008", "p_name" => "Bigas", "price" => 40],
    ["barcode" => "1009", "p_name" => "Gatas", "price" => 25],
    ["barcode" => "1010", "p_name" => "Asukal", "price" => 50],
    ["barcode" => "1011", "p_name" => "Kape", "price" => 5],
    ["barcode" => "1012", "p_name" => "Biskwit", "price" => 15],
    ["barcode" => "1013", "p_name" => "Pan de Sal", "price" => 2],
    ["barcode" => "1014", "p_name" => "Tuyo", "price" => 10],
    ["barcode" => "1015", "p_name" => "Delata", "price" => 20],
    ["barcode" => "1016", "p_name" => "Sardinas", "price" => 15],
    ["barcode" => "1017", "p_name" => "Instant Coffee", "price" => 5],
    ["barcode" => "1018", "p_name" => "Juice", "price" => 12],
    ["barcode" => "1019", "p_name" => "Mineral Water", "price" => 10],
    ["barcode" => "1020", "p_name" => "Softdrinks", "price" => 25],
    ["barcode" => "1021", "p_name" => "Tinapay", "price" => 30],
    ["barcode" => "1022", "p_name" => "Patis", "price" => 12],
    ["barcode" => "1023", "p_name" => "Pancit Canton", "price" => 15],
    ["barcode" => "1024", "p_name" => "Bagoong", "price" => 15],
    ["barcode" => "1025", "p_name" => "Corned Beef", "price" => 35],
    ["barcode" => "1026", "p_name" => "Hotdog", "price" => 50],
    ["barcode" => "1027", "p_name" => "Tocino", "price" => 60],
    ["barcode" => "1028", "p_name" => "Longganisa", "price" => 45],
    ["barcode" => "1029", "p_name" => "Ice Cream", "price" => 80],
    ["barcode" => "1030", "p_name" => "Cookies", "price" => 20],
    ["barcode" => "1031", "p_name" => "Cereal", "price" => 50],
    ["barcode" => "1032", "p_name" => "Oats", "price" => 35],
    ["barcode" => "1033", "p_name" => "Butter", "price" => 25],
    ["barcode" => "1034", "p_name" => "Margarine", "price" => 15],
    ["barcode" => "1035", "p_name" => "Cheese", "price" => 40],
    ["barcode" => "1036", "p_name" => "Creamer", "price" => 20],
    ["barcode" => "1037", "p_name" => "Peanut Butter", "price" => 30],
    ["barcode" => "1038", "p_name" => "Jam", "price" => 25],
    ["barcode" => "1039", "p_name" => "Mayonnaise", "price" => 35],
    ["barcode" => "1040", "p_name" => "Ketchup", "price" => 25],
    ["barcode" => "1041", "p_name" => "Vinegar", "price" => 10],
    ["barcode" => "1042", "p_name" => "Soy Sauce", "price" => 12],
    ["barcode" => "1043", "p_name" => "Salt", "price" => 5],
    ["barcode" => "1044", "p_name" => "Pepper", "price" => 20],
    ["barcode" => "1045", "p_name" => "Spices", "price" => 10],
    ["barcode" => "1046", "p_name" => "Onion", "price" => 60],
    ["barcode" => "1047", "p_name" => "Garlic", "price" => 70],
    ["barcode" => "1048", "p_name" => "Cooking Oil", "price" => 80],
    ["barcode" => "1049", "p_name" => "Detergent", "price" => 40],
    ["barcode" => "1050", "p_name" => "Fabric Softener", "price" => 50],
];


try {
    $stmt = $pdo->prepare("INSERT INTO Products (Barcode, Name, Price) VALUES (:barcode, :name, :price)");

    foreach ($productData as $product) {
        $stmt->execute([
            ':barcode' => $product['barcode'],
            ':name' => $product['p_name'],
            ':price' => $product['price']
        ]);
    }

    echo json_encode(["status" => "success", "message" => "Products inserted successfully."]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
