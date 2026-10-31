<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'image_id',
        'status',
        'order',
    ];

    public function image()
    {
        return $this->belongsTo(Media::class, 'image_id');
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
