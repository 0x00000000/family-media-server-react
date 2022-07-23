<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    
    $ds = DIRECTORY_SEPARATOR;
    $photoalbumData = array();
    $baseDirectory = '../photo';
    $directoriesList = scandir($baseDirectory);
    foreach ($directoriesList as $photosDirectory) {
        if ($photosDirectory !== '.' && $photosDirectory !== '..') {
            $photoItem = [
                'photoalbum' => $photosDirectory,
                'photos' => [],
            ];
            if (is_dir($baseDirectory . $ds . $photosDirectory)) {
                $filesList = scandir($baseDirectory . $ds . $photosDirectory);
                foreach ($filesList as $filename) {
                    if (
                        strripos($filename, '.jpg') !== false
                        || strripos($filename, '.jpeg') !== false
                        || strripos($filename, '.png') !== false
                    ) {
                        $photoItem['photos'][] = $filename;
                    }
                }
            }
            if ($photoItem['photos']) {
                $photoalbumData[] = $photoItem;
            }
        }
    }
    echo json_encode($photoalbumData);
?>

