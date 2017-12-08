<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Item;

class ItemController extends Controller
{
    public function index()
    {
        $items = Item::limit(10)->orderBy('id', 'desc')->get();
        return view('item.index', compact('items'));
    }

    public function getitem()
    {
        $items = Item::limit(10)->orderBy('id', 'desc')->get();
        return response()->json($items);
    }

    public function search(Request $request)
    {        
        $term = $request->get('term');
        
        $items = Item::where('name', 'LIKE', '%'.$term.'%')->limit(5)->get();
        
        $getItems = [];
        foreach ($items as $item) {
            $getItems[] = [
                            'id'    => $item->id, 
                            'name'  => $item->name,
                            'label' => $item->name." | price:".$item->price." | total: ".$item->total,
                            'price' => $item->price,
                            'total' => $item->total,
                          ];
        }

        return response()->json($getItems);
    }

    public function create(Request $request)
    {
        $item = new Item();
        $item->name     = $request->name;
        $item->price    = $request->price;
        $item->total    = $request->total;
        $item->save();

        return response()->json($item);
    }

    public function edit(Request $request)
    {
        $item = Item::find($request->id);
        $item->name     = $request->name;
        $item->price    = $request->price;
        $item->total    = $request->total;
        $item->save();

        return response()->json($item);
    }

    public function delete(Request $request)
    {
        $id = $request->id;
        Item::find($id)->delete();

        return response()->json();
    }
}
