<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::post('login', 'PassportController@login');
Route::post('register', 'PassportController@register');

Route::middleware('auth:api')->group(function () {
    Route::get('user', 'PassportController@details');

    Route::apiResource('user','UserController');
    Route::apiResource('webexcel','WebExcelController');

});

// Route::post('webexcel', function($request) {
//     $googleClient = Google::getClient();;
//     // dd($googleClient);
//     $googleClient->setApplicationName('Web Excel');
//     $googleClient->setScopes([\Google_Service_Sheets::SPREADSHEETS]);
//     $googleClient->setAccessType('offline');
//     $googleClient->setAuthConfig(storage_path('credentials.json'));
//     $service = new Google_Service_Sheets($googleClient);
//     $spreadsheet_id = '10wXgXm1SyXDkDhccch8jYOEIkINZB_DK7mvsuhVCVUw';

//     // UPDATE 
//     $range = "Joshua testing!E13";
//     $values = [
//         [1500]
//     ];

//     $body = new Google_Service_Sheets_ValueRange([
//         'values' => $values
//     ]);
//     $params = [
//         'valueInputOption' => 'RAW'
//     ];
//     $result = $service->spreadsheets_values->update(
//         $spreadsheet_id,
//         $range,
//         $body,
//         $params
//     );


//     // GET RESULT
//     $range = 'Joshua testing!S11';
//     $response = $service->spreadsheets_values->get($spreadsheet_id, $range);
//     $values = $response->getValues();
//     if(empty($values)) {
//         echo 'no data found';
//     } else {
//         dd($values);
//     }
// });