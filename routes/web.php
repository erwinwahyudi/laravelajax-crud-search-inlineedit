<?php

Route::get('/', 'ItemController@index');
Route::get('/item/getitem', 'ItemController@getitem');
Route::post('/item/create', 'ItemController@create');
Route::post('/item/edit', 'ItemController@edit');
Route::post('/item/delete', 'ItemController@delete');
Route::get('/item/search', 'ItemController@search');


Route::get('/item', 'IndexController@readItems');
Route::post('addItem', 'IndexController@addItem');
Route::post('editItem', 'IndexController@editItem');
Route::post('deleteItem', 'IndexController@deleteItem');


