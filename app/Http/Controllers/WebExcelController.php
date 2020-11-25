<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WebExcelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $googleClient = \Google::getClient();;
        $googleClient->setApplicationName('Web Excel');
        $googleClient->setScopes([\Google_Service_Sheets::SPREADSHEETS]);
        $googleClient->setAccessType('offline');
        $googleClient->setAuthConfig(storage_path('credentials.json'));
        $service = new \Google_Service_Sheets($googleClient);
        $spreadsheet_id = '10wXgXm1SyXDkDhccch8jYOEIkINZB_DK7mvsuhVCVUw';

        // UPDATE 
        $range = "Joshua testing!E13";
        $update_values = [
            [(int)$request->e13]
        ];

        $body = new \Google_Service_Sheets_ValueRange([
            'values' => $update_values
        ]);
        $params = [
            'valueInputOption' => 'RAW'
        ];
        $result = $service->spreadsheets_values->update(
            $spreadsheet_id,
            $range,
            $body,
            $params
        );


        // GET RESULT
        $range = 'Joshua testing!S11';
        $response = $service->spreadsheets_values->get($spreadsheet_id, $range);
        $values = $response->getValues();
        if(empty($values)) {
            $response_data = 'no data found';
        } else {
            $response_data = $values;
        }

        return response()->json([
            'success' => true,
            'data' => $response_data,
            'request' => $request->all(),
            'update_values' => $update_values
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
