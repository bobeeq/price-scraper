<?php

$index = file_get_contents('dist/index.html');

$index = preg_replace("@/(js|css)/@", "/$1/", $index);



if (!file_put_contents('index.html', $index)) {
    echo "BŁĄD: NIE UDAŁO SIĘ POPRAWNIE ZBUDOWAĆ PLIKU INDEX.HTML.";
} else {
    echo "Poprawnie zbudowano plik index.html.";
}

echo "\n";