<?php

namespace App\Filament\Resources\ProductResource\Pages;

use App\Filament\Resources\ProductResource;
use App\Models\Media;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Storage;

class EditProduct extends EditRecord
{
    protected static string $resource = ProductResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        return $this->processImages($data);
    }

    protected function mutateFormDataBeforeFill(array $data): array
    {
        // Cargar la imagen principal existente en el campo FileUpload
        if (!empty($data['main_image_id'])) {
            $media = Media::find($data['main_image_id']);
            if ($media) {
                $data['main_image'] = $media->path;
            }
        }

        // Cargar la galería existente en el campo FileUpload múltiple
        $galleryPaths = [];
        if (!empty($data['gallery']) && is_array($data['gallery'])) {
            foreach ($data['gallery'] as $item) {
                if (!empty($item['image_id'])) {
                    $media = Media::find($item['image_id']);
                    if ($media) {
                        $galleryPaths[] = $media->path;
                    }
                }
            }
        }
        $data['gallery_upload'] = $galleryPaths;

        return $data;
    }

    /**
     * Procesa las imágenes subidas: crea los registros Media y
     * construye la relación main_image_id y la galería.
     */
    protected function processImages(array $data): array
    {
        // Imagen principal
        if (!empty($data['main_image'])) {
            $data['main_image_id'] = $this->createMediaFromUpload($data['main_image']);
        }
        unset($data['main_image']);

        // Galería
        $gallery = [];
        if (!empty($data['gallery_upload']) && is_array($data['gallery_upload'])) {
            foreach ($data['gallery_upload'] as $path) {
                $mediaId = $this->createMediaFromUpload($path);
                if ($mediaId) {
                    $gallery[] = ['image_id' => $mediaId, 'alt' => $data['name'] ?? ''];
                }
            }
        }
        unset($data['gallery_upload']);

        if (count($gallery) > 0) {
            $data['gallery'] = $gallery;
        }

        return $data;
    }

    /**
     * Crea un registro Media a partir de una ruta de archivo subida.
     */
    protected function createMediaFromUpload(string $path): ?int
    {
        if (empty($path)) {
            return null;
        }

        // Si ya existe un Media con esta ruta, reutilizarlo
        $existing = Media::where('path', $path)->first();
        if ($existing) {
            return $existing->id;
        }

        $fullPath = Storage::disk('public')->path($path);
        if (!file_exists($fullPath)) {
            return null;
        }

        $media = new Media();
        $media->filename = basename($path);
        $media->path = $path;
        $media->mime_type = mime_content_type($fullPath) ?: 'image/jpeg';
        $media->size = filesize($fullPath);
        $media->alt = pathinfo($path, PATHINFO_FILENAME);
        $media->save();

        return $media->id;
    }
}
