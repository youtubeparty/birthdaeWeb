<?php

$servername = "default";
$usernmae = "default";
$password = "default";
$dbname = "gossipScores";

try {
	$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PD0::ERRMODE_EXCEPTION);
	
	$paparazzo = strtoupper($_POST['paparazzo']);
    $celebrity = strtoupper($_POST['celebrity']);
		
	
	$stmt = $conn->prepare("
        INSERT INTO your_table_name (player, post_submitted, posts_about)
        VALUES (:paparazzo, 1, 0)
        ON DUPLICATE KEY UPDATE post_submitted = post_submitted + 1
    ");
    $stmt->execute([':paparazzo' => $paparazzo]);
	
	$stmt = $conn->prepare("
        INSERT INTO your_table_name (player, post_submitted, posts_about)
        VALUES (:celebrity, 0, 1)
        ON DUPLICATE KEY UPDATE posts_about = posts_about + 1
    ");
    $stmt->execute([':celebrity' => $celebrity]);

    echo "Records updated successfully.";
		
	
}

catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}

?>