<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Item;
use Validator;
use Response;
use Illuminate\Support\Facades\Input;

class IndexController extends Controller
{
    public function addItem(Request $request)
    {
        $rules = array(
                'name' => 'required|alpha_num',
        );
        $validator = Validator::make(Input::all(), $rules);
        if ($validator->fails()) {
            return Response::json(array(

                    'errors' => $validator->getMessageBag()->toArray(),
            ));
        } else {
            $data = new Item();
            $data->name = $request->name;
            $data->save();

            return response()->json($data);
        }
    }
    public function readItems(Request $req)
    {
        $data = Item::all();

        return view('welcome')->withData($data);
    }
    public function editItem(Request $req)
    {
        $data = Item::find($req->id);
        $data->name = $req->name;
        $data->save();

        return response()->json($data);
    }
    public function deleteItem(Request $req)
    {
        Item::find($req->id)->delete();

        return response()->json();
    }
}
