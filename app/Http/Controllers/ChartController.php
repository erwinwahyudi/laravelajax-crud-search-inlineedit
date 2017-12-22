<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Item;
use App\Chart;

class ChartController extends Controller
{
    public function create(Request $request)
    {
        $chart = new Chart();
        $chart->name     = $request->name;
        $chart->price    = $request->price;
        $chart->quantity = $request->quantity;
        $chart->discount = $request->discount;
        $chart->total    = $request->total;
        $chart->save();

        return response()->json($chart);
    }

    public function edit(Request $request)
    {
        $chart = Chart::find($request->id);
        // $chart->name     = $request->name;
        $chart->price    = $request->price;
        $chart->quantity = $request->quantity;
        $chart->discount = $request->discount;
        $chart->total    = $request->total;
        $chart->save();

        return response()->json($chart);
    }

    public function delete(Request $request)
    {
        $id = $request->id;
        Chart::find($id)->delete();

        return response()->json();
    }
}
