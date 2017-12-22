<?php

Route::get('/', 'ItemController@index');
Route::get('/item/getitem', 'ItemController@getitem');
Route::get('/item/search', 'ItemController@search');

Route::post('/chart/create', 'ChartController@create');
Route::post('/chart/edit', 'ChartController@edit');
Route::post('/chart/delete', 'ChartController@delete');



