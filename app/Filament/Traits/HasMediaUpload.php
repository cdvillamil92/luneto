<?php

namespace App\Filament\Traits;

use App\Models\Media;
use Filament\Forms\Components\FileUpload;
use Illuminate\Support\Facades\Storage;

trait HasMediaUpload
{
    /**
     * Build a FileUpload field that stores a Media record id in the database.
     *
     * @param  string  $statePath  The form state path (e.g. 'logo_image_id').
     * @param  string  $directory  The storage directory for uploaded files.
     * @param  string  $label      The field label.
     */
    protected static function mediaUpload(string $statePath, string $directory, string $label, bool $allowSvg = false): FileUpload
    {
        $field = FileUpload::make($statePath)
            ->label($label)
            ->directory($directory)
            ->visibility('public')
            ->dehydrated();

        if ($allowSvg) {
            $field->acceptedFileTypes(['image/svg+xml', 'image/png', 'image/jpeg', 'image/webp']);
        } else {
            $field->image()->imageEditor();
        }

        return $field
            ->afterStateHydrated(function (FileUpload $component, $state) {
                if (is_numeric($state)) {
                    $media = Media::find($state);
                    if ($media) {
                        $component->state([$media->path]);
                    }
                }
            })
            ->dehydrateStateUsing(function ($state) {
                if (is_numeric($state)) {
                    return (int) $state;
                }

                // FileUpload state is an array of file paths.
                if (is_array($state)) {
                    $path = reset($state);

                    if (is_string($path) && $path !== '') {
                        $media = Media::where('path', $path)->first();

                        if (! $media) {
                            $media = Media::create([
                                'filename' => basename($path),
                                'path' => $path,
                                'mime_type' => Storage::disk('public')->mimeType($path),
                                'size' => Storage::disk('public')->size($path),
                                'alt' => '',
                            ]);
                        }

                        return $media->id;
                    }
                }

                return null;
            });
    }
}