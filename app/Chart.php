<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chart extends Model
{
    protected $table    = 'chart';
    public $timestamps  = false;
    protected $fillable = ['name', 'price', 'quantity', 'total'];
}
