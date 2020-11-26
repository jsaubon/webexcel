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

        if($request->action == 'getInputsAndResultsByRange') {
            // INPUTS
            $range = [
                        $request->inputs
                    ];
            $params = [
                'valueRenderOption' => 'UNFORMATTED_VALUE'
            ];
            $response = $service->spreadsheets_values->get($spreadsheet_id, $range, $params);
            $data['inputs'] = $response->getValues();
            
            // RESULTS
            $range = [
                        $request->results
                    ];
            $response = $service->spreadsheets_values->get($spreadsheet_id, $range);
            $data['results'] = $response->getValues();

            return response()->json([
                'success' => true,
                'data' => $data,
                'request' => $request->all(),
            ]);
        } else {
        // UPDATE 
            $range = "Joshua testing!".$request->cell;
            $update_values = [
                [(float)$request->value]
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

            return response()->json([
                'success' => true,
                'request' => $request->all(),
                'update_values' => $update_values
            ]);
        }
        
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
