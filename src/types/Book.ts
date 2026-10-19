export type BookHue = 'burgundy' | 'navy' | 'forest' | 'amber' | 'sand' | 'charcoal';
export type BookSize = 'tall' | 'medium' | 'short';
export type BookWidth = 'wide' | 'normal' | 'thin';

export type Book = {
    id: number;
    title: string;
    rating: number;
    author?: string;
    year?: number;
    genre: string;
    isFavorite: boolean;
    hue: BookHue;
    addedAt: string;
    bookmark?: boolean;
    size?: BookSize;
    width?: BookWidth;
}

