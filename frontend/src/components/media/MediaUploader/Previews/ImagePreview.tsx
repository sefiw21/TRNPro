// Previews/ImagePreview.tsx
import { Upload, X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import type { PreviewProps } from '../types';


export const ImagePreview = ({
    file,
    previewUrl,
    onClear,
    previewShape = 'rectangle',
    previewFit = 'cover',
    isDragActive
}: PreviewProps) => {

    const shapeClasses = {
        circle: 'rounded-full aspect-square w-32 mx-auto',
        square: 'rounded-lg aspect-square w-32 mx-auto',
        rectangle: 'rounded-lg w-full h-32'
    };

    const fitClasses = {
        cover: 'object-cover',
        contain: 'object-contain bg-slate-100 dark:bg-slate-800/50'
    };

    return (
        <div className="flex flex-col items-center gap-3 w-full">
            <div className={twMerge(
                "relative group overflow-hidden border border-slate-200 dark:border-white/10 transition-all duration-200",
                shapeClasses[previewShape],
                isDragActive && "ring-4 ring-blue-500 ring-opacity-50" // Visual cue when dragging over existing image!
            )}>
                <img
                    src={previewUrl}
                    // If it's a File, use the name. If it's a string (URL), use a fallback string.
                    alt={file instanceof File ? file.name : "System Logo"}
                    className={twMerge("w-full h-full pointer-events-none", fitClasses[previewFit])}
                />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 relative z-10">
                <button
                    className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 pointer-events-none"
                    type="button"
                >
                    <Upload className="w-4 h-4" />
                    Change Logo
                </button>

                <span className="text-slate-300 dark:text-slate-700">|</span>

                <button
                    onClick={(e) => { e.stopPropagation(); onClear(); }} // stopPropagation prevents the file picker from opening when clicking remove!
                    className="flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-600"
                    type="button"
                >
                    <X className="w-4 h-4" />
                    Remove
                </button>
            </div>
        </div>
    );
};