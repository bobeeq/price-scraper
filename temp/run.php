<?php

echo md5('9788375941722'); exit;
use GuzzleHttp\Client;

require_once 'vendor/autoload.php';

$client = new Client();

try {
    $response = $client->request("GET", "https://bookland.com.pl/search/9788375941722", [
        'headers' => [
            'Host' => 'bookland.com.pl',
            'User-Agent' => 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.97 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
        ]
    ]);

} catch (GuzzleHttp\Exception\ClientException $e) {
    echo "błąd.";
    $res = $e->getResponse();
    $body = $res->getBody();
    file_put_contents('body.html', $body);
}

