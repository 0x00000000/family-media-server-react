<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    
    $ds = DIRECTORY_SEPARATOR;
    $photoalbumData = array();
    $baseDirectory = 'photo';
    $directoriesList = scandir($baseDirectory);
    foreach ($directoriesList as $photosDirectory) {
        if ($photosDirectory !== '.' && $photosDirectory !== '..') {
            $photoItem = [
                'photoalbum' => $photosDirectory,
                'photos' => [],
            ];
            if (is_dir($baseDirectory . $ds . $photosDirectory)) {
                $filesList = scandir($baseDirectory . $ds . $photosDirectory);
                foreach ($filesList as $photoFile) {
                    if (
                        strripos($photoFile, '.jpg') !== false
                        || strripos($photoFile, '.jpeg') !== false
                        || strripos($photoFile, '.png') !== false
                    ) {
                        $photoItem['photos'][] = $photoFile;
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

