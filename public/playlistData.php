<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    
    $options = array(
        'random' => 'options-random',
    );
    
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
                foreach ($filesList as $filename) {
                    if (strpos($filename, '.mp4') !== false) {
                        $videoItem['videos'][] = $filename;
                    } else if ($filename === $options['random']) {
                        $videoItem['options']['random'] = true;
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

