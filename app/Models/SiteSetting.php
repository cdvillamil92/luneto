<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    protected $fillable = [
        'logo_image_id',
        'logo_url',
        'hero_title',
        'hero_subtitle',
        'hero_image_id',
        'about_title',
        'about_text',
        'whatsapp',
        'email',
        'social_instagram',
        'social_facebook',
        'social_tiktok',
        'social_pinterest',
    ];

    public function logoImage()
    {
        return $this->belongsTo(Media::class, 'logo_image_id');
    }

    public function heroImage()
    {
        return $this->belongsTo(Media::class, 'hero_image_id');
    }

    /**
     * Get the singleton settings record, creating it with defaults if needed.
     */
    public static function get(): self
    {
        return static::query()->firstOrCreate(
            ['id' => 1],
            [
                'hero_title' => 'Ropa con personalidad para tu perro',
                'hero_subtitle' => 'Comodidad, estilo y mucho amor para tu mejor amigo.',
                'about_title' => 'Sobre Luneto',
                'about_text' => 'En Luneto diseñamos y confeccionamos ropa para mascotas con personalidad, comodidad y mucho estilo. Cada prenda está pensada para que tu perro se sienta cómodo y se vea increíble.',
                'whatsapp' => config('luneto.whatsapp'),
                'email' => config('luneto.email'),
                'social_instagram' => 'https://instagram.com/luneto',
                'social_facebook' => 'https://facebook.com/luneto',
                'social_tiktok' => 'https://tiktok.com/@luneto',
                'social_pinterest' => 'https://pinterest.com/luneto',
            ]
        );
    }
}