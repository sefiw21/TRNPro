
import { type Accept } from 'react-dropzone'; // Import the type from the library
// types.ts
export type MediaType = 'image' | 'video' | 'audio' | 'file';
export type PreviewShape = 'circle' | 'square' | 'rectangle';
export type PreviewFit = 'cover' | 'contain';

export interface MediaUploaderProps {
    mediaType: MediaType;
    label?: string;
    value?: string | File | null;
    isOptional?: boolean;
    maxSizeMB?: number;
    acceptedFormats?: Accept; // Use the official type !
    onFileChange: (file: File | null) => void;
    error?: string;
    previewShape?: PreviewShape;
    previewFit?: PreviewFit;
}

export interface PreviewProps {
    file: string | File | null;
    previewUrl: string;
    onClear: () => void;
    previewShape?: 'circle' | 'square' | 'rectangle';
    previewFit?: 'cover' | 'contain';
    isDragActive?: boolean;
}
