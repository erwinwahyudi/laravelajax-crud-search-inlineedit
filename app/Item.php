<?php

namespace app;

use Illuminate\Database\Eloquent\Model;
// use Laravel\Scout\Searchable;


class Item extends Model
{
    // use Searchable;
    protected $table    = 'ds';
    public $timestamps  = false;
    protected $fillable = ['name', 'price', 'total'];
    
}
