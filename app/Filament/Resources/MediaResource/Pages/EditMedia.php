<?php

namespace App\Filament\Resources\MediaResource\Pages;

use App\Filament\Resources\MediaResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditMedia extends EditRecord
{
    protected static string $resource = MediaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        if (!empty($data['file'])) {
            $path = $data['file'];
            $fullPath = storage_path('app/public/' . $path);
            $data['path'] = $path;
            $data['filename'] = basename($path);
            if (file_exists($fullPath)) {
                $data['mime_type'] = mime_content_type($fullPath);
                $data['size'] = filesize($fullPath);
            }
        }
        return $data;
    }
}
