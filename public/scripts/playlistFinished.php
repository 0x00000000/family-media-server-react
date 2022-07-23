<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    
    $email = 'parent@example.com';
    
    $ds = DIRECTORY_SEPARATOR;
    $baseDirectory = 'video';
    
    $playlist = $_GET['playlist'];
    if (is_dir($baseDirectory . $ds . $playlist)) {
        $topic = 'Playlist ' . $playlist . ' was finished';
        $body = $topic . "\n" . 'Please upload new episodes';
        mail($email, $topic, $body);
    }
    echo json_encode(array('data' => 'ok',));
?>

