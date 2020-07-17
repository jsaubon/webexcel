<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ClientEmployee extends Model
{
    protected $guarded = [];

    public function other_info()
    {
        return $this->morphMany('App\OtherInfo', 'other_infoable');
    }
}