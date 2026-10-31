<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource\RelationManagers;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-bag';

    protected static ?string $navigationGroup = 'Catálogo';

    protected static ?string $navigationLabel = 'Productos';

    protected static ?string $modelLabel = 'Producto';

    protected static ?string $pluralModelLabel = 'Productos';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Información básica')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label('Nombre')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function ($state, callable $set) {
                                $set('slug', \Illuminate\Support\Str::slug($state));
                            }),
                        Forms\Components\TextInput::make('slug')
                            ->label('Slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true),
                        Forms\Components\TextInput::make('sku')
                            ->label('SKU / Referencia')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true),
                        Forms\Components\Textarea::make('short_description')
                            ->label('Descripción corta')
                            ->rows(3)
                            ->columnSpanFull(),
                        Forms\Components\RichEditor::make('description')
                            ->label('Descripción completa')
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Precio')
                    ->schema([
                        Forms\Components\TextInput::make('price')
                            ->label('Precio (COP)')
                            ->required()
                            ->numeric()
                            ->prefix('$')
                            ->minValue(0),
                        Forms\Components\TextInput::make('sale_price')
                            ->label('Precio promocional (COP)')
                            ->numeric()
                            ->prefix('$')
                            ->minValue(0),
                        Forms\Components\TextInput::make('currency')
                            ->label('Moneda')
                            ->default('COP')
                            ->disabled()
                            ->dehydrated(),
                    ])
                    ->columns(3),

                Forms\Components\Section::make('Categoría e imágenes')
                    ->schema([
                        Forms\Components\Select::make('category_id')
                            ->label('Categoría')
                            ->relationship('category', 'name')
                            ->searchable()
                            ->preload(),
                        Forms\Components\FileUpload::make('main_image')
                            ->label('Imagen principal')
                            ->image()
                            ->imageEditor()
                            ->directory('media')
                            ->visibility('public')
                            ->dehydrated()
                            ->helperText('Sube la fotografía principal del producto. Se guardará automáticamente en la biblioteca de medios.'),
                        Forms\Components\FileUpload::make('gallery_upload')
                            ->label('Galería de fotografías')
                            ->image()
                            ->multiple()
                            ->reorderable()
                            ->directory('media')
                            ->visibility('public')
                            ->dehydrated()
                            ->helperText('Sube varias fotografías. Puedes arrastrarlas para reordenarlas. Se guardarán automáticamente en la biblioteca de medios.')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('Variantes')
                    ->schema([
                        Forms\Components\CheckboxList::make('variants.sizes')
                            ->label('Tallas')
                            ->options([
                                'xs' => 'XS',
                                's' => 'S',
                                'm' => 'M',
                                'l' => 'L',
                                'xl' => 'XL',
                            ]),
                        Forms\Components\TagsInput::make('variants.colors')
                            ->label('Colores'),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Publicación')
                    ->schema([
                        Forms\Components\Select::make('availability')
                            ->label('Disponibilidad')
                            ->options([
                                'in_stock' => 'Disponible',
                                'out_of_stock' => 'Agotado',
                                'on_order' => 'Bajo pedido',
                            ])
                            ->default('in_stock')
                            ->required(),
                        Forms\Components\Select::make('status')
                            ->label('Estado de publicación')
                            ->options([
                                'draft' => 'Borrador',
                                'published' => 'Publicado',
                            ])
                            ->default('draft')
                            ->required(),
                        Forms\Components\Toggle::make('featured')
                            ->label('Producto destacado')
                            ->default(false),
                        Forms\Components\TextInput::make('order')
                            ->label('Orden de presentación')
                            ->numeric()
                            ->default(0),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('SEO')
                    ->schema([
                        Forms\Components\TextInput::make('seo.title')
                            ->label('Título SEO'),
                        Forms\Components\Textarea::make('seo.description')
                            ->label('Descripción SEO')
                            ->rows(3),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('mainImage.url')
                    ->label('Imagen'),
                Tables\Columns\TextColumn::make('name')
                    ->label('Nombre')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('sku')
                    ->label('SKU')
                    ->searchable(),
                Tables\Columns\TextColumn::make('price')
                    ->label('Precio')
                    ->money('COP')
                    ->sortable(),
                Tables\Columns\TextColumn::make('category.name')
                    ->label('Categoría')
                    ->sortable(),
                Tables\Columns\TextColumn::make('status')
                    ->label('Estado')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'published' => 'success',
                        'draft' => 'gray',
                    }),
                Tables\Columns\IconColumn::make('featured')
                    ->label('Destacado')
                    ->boolean(),
                Tables\Columns\TextColumn::make('order')
                    ->label('Orden')
                    ->numeric()
                    ->sortable(),
            ])
            ->defaultSort('order')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'published' => 'Publicado',
                        'draft' => 'Borrador',
                    ]),
                Tables\Filters\SelectFilter::make('category_id')
                    ->label('Categoría')
                    ->relationship('category', 'name'),
                Tables\Filters\SelectFilter::make('availability')
                    ->options([
                        'in_stock' => 'Disponible',
                        'out_of_stock' => 'Agotado',
                        'on_order' => 'Bajo pedido',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
