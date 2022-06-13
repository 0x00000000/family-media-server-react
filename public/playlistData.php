<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    
    $ds = DIRECTORY_SEPARATOR;
    $playlistData = array();
    $baseDirectory = 'video';
    $directoriesList = scandir($baseDirectory);
    foreach ($directoriesList as $videosDirectory) {
        if ($videosDirectory !== '.' && $videosDirectory !== '..') {
            $videoItem = [
                'playlist' => $videosDirectory,
                'videos' => [],
            ];
            if (is_dir($baseDirectory . $ds . $videosDirectory)) {
                $filesList = scandir($baseDirectory . $ds . $videosDirectory);
                foreach ($filesList as $videoFile) {
                    if (strpos($videoFile, '.mp4') !== false) {
                        $videoItem['videos'][] = $videoFile;
                    }
                }
            }
            if ($videoItem['videos']) {
                $playlistData[] = $videoItem;
            }
        }
    }
    echo json_encode($playlistData);
?>

