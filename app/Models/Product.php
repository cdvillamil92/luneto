<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'sku',
        'short_description',
        'description',
        'price',
        'sale_price',
        'currency',
        'category_id',
        'main_image_id',
        'gallery',
        'variants',
        'availability',
        'status',
        'featured',
        'order',
        'seo',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'sale_price' => 'decimal:2',
        'gallery' => 'array',
        'variants' => 'array',
        'seo' => 'array',
        'featured' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function mainImage()
    {
        return $this->belongsTo(Media::class, 'main_image_id');
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function getGalleryImagesAttribute()
    {
        $gallery = $this->gallery ?? [];
        $images = [];
        foreach ($gallery as $item) {
            $media = isset($item['image_id']) ? Media::find($item['image_id']) : null;
            if ($media) {
                $images[] = [
                    'url' => $media->url,
                    'alt' => $item['alt'] ?? $media->alt ?? $this->name,
                ];
            }
        }
        return $images;
    }
}
