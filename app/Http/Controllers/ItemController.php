<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Item;
use App\Chart;
use DB;

class ItemController extends Controller
{

    ######## BLOCK ITEM ############
    public function search(Request $request)
    {        
        $term = $request->get('term');
        
        $items = Item::where('name', 'LIKE', '%'.$term.'%')->limit(10)->get();
        
        $getItems = [];
        foreach ($items as $item) {
            $getItems[] = [
                            'id'        => $item->id, 
                            'name'      => $item->name,
                            'label'     => $item->name." | price:".$item->price." | quantity: ".$item->quantity,
                            'price'     => $item->price,
                            'quantity'  => $item->quantity,
                          ];
        }

        return response()->json($getItems);
    }
    ######## BLOCK ITEM ############

    public function index()
    {
        // tampilkan data dari chart
        $charts = Chart::orderBy('id', 'desc')->get();

        // hitung total chart
        $get_total = DB::table('chart')->sum('total');

        return view('item.index', compact('charts', 'get_total'));
    }

    public function getitem()
    {
        $charts = Chart::limit(10)->orderBy('id', 'desc')->get();
        return response()->json($charts);
    }    
    
}
