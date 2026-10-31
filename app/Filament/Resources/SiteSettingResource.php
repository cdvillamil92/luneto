<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SiteSettingResource\Pages;
use App\Filament\Traits\HasMediaUpload;
use App\Models\SiteSetting;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class SiteSettingResource extends Resource
{
    use HasMediaUpload;

    protected static ?string $model = SiteSetting::class;

    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected static ?string $navigationLabel = 'Ajustes del sitio';

    protected static ?string $navigationGroup = 'Contenido';

    protected static ?int $navigationSort = 4;

    protected static ?string $slug = 'ajustes';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Marca')
                    ->description('Logo de la marca que aparece en el encabezado y pie de página. Escribe la ruta de la imagen (ej: /storage/logo/mi-logo.svg).')
                    ->schema([
                        Forms\Components\TextInput::make('logo_url')
                            ->label('Logo (ruta de la imagen)')
                            ->placeholder('/storage/logo/mi-logo.svg')
                            ->helperText('Puedes usar SVG, PNG, JPG o WEBP. Sube el archivo a la carpeta public/storage y escribe su ruta aquí.'),
                    ]),

                Forms\Components\Section::make('Hero')
                    ->description('Texto e imagen de la portada principal.')
                    ->schema([
                        Forms\Components\TextInput::make('hero_title')
                            ->label('Título del hero')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('hero_subtitle')
                            ->label('Subtítulo del hero')
                            ->maxLength(255),
                        self::mediaUpload('hero_image_id', 'hero', 'Imagen del hero')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('Sobre Luneto')
                    ->description('La sección "Sobre Luneto" de la página de inicio.')
                    ->schema([
                        Forms\Components\TextInput::make('about_title')
                            ->label('Título')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\Textarea::make('about_text')
                            ->label('Texto')
                            ->rows(4)
                            ->required(),
                    ])->columns(1),

                Forms\Components\Section::make('Contacto')
                    ->description('Datos de contacto que aparecen en el pie de página.')
                    ->schema([
                        Forms\Components\TextInput::make('whatsapp')
                            ->label('WhatsApp')
                            ->tel()
                            ->placeholder('+57 300 000 0000'),
                        Forms\Components\TextInput::make('email')
                            ->label('Email')
                            ->email()
                            ->placeholder('hola@luneto.co'),
                    ])->columns(2),

                Forms\Components\Section::make('Redes sociales')
                    ->description('Enlaces a las redes sociales que aparecen en el pie de página.')
                    ->schema([
                        Forms\Components\TextInput::make('social_instagram')
                            ->label('Instagram')
                            ->url()
                            ->placeholder('https://instagram.com/luneto'),
                        Forms\Components\TextInput::make('social_facebook')
                            ->label('Facebook')
                            ->url()
                            ->placeholder('https://facebook.com/luneto'),
                        Forms\Components\TextInput::make('social_tiktok')
                            ->label('TikTok')
                            ->url()
                            ->placeholder('https://tiktok.com/@luneto'),
                        Forms\Components\TextInput::make('social_pinterest')
                            ->label('Pinterest')
                            ->url()
                            ->placeholder('https://pinterest.com/luneto'),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('hero_title')
                    ->label('Hero'),
                Tables\Columns\TextColumn::make('about_title')
                    ->label('Sobre Luneto'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->paginated(false);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSiteSettings::route('/'),
            'edit' => Pages\EditSiteSetting::route('/{record}/edit'),
        ];
    }
}