<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OtherInfo extends Model
{
    protected $guarded = [];
    public function other_infoable()
    {
        return $this->morphTo();
    }
}
