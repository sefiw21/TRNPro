import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { DropZone } from './DropZone';
import { resizeImage } from './imageUtils';
import { ImagePreview } from './Previews/ImagePreview';
import type { MediaUploaderProps } from './types';
import { validateFile } from './uploaderUtils';

export type MediaType = 'image' | 'video' | 'audio' | 'file';
export type PreviewShape = 'circle' | 'square' | 'rectangle';
export type PreviewFit = 'cover' | 'contain';


export const MediaUploader = ({
    mediaType,
    label,
    value,
    maxSizeMB = 10,
    acceptedFormats,
    onFileChange,
    error,
    previewShape = 'rectangle',
    previewFit = 'cover'
}: MediaUploaderProps) => {

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [internalError, setInternalError] = useState<string | null>(null);

    // 1. Unified Preview Logic (The Brain)
    useEffect(() => {
        let objectUrl: string | null = null;

        if (value instanceof File && mediaType !== 'file') {
            objectUrl = URL.createObjectURL(value);
            setPreviewUrl(objectUrl);
        } else if (typeof value === 'string') {
            setPreviewUrl(value);
        } else {
            setPreviewUrl(null);
        }

        return () => {
            if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
    }, [value, mediaType]);

    // 2. Dropzone Logic
    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        accept: acceptedFormats,
        multiple: false,
        onDrop: async (acceptedFiles, fileRejections) => {
            if (fileRejections.length > 0) {
                setInternalError("Invalid file type.");
                return;
            }

            if (acceptedFiles.length > 0) {
                const rawFile = acceptedFiles[0];

                setIsProcessing(true);
                // This forces JS to pause for 10ms, allowing the spinner to appear!
                await new Promise((resolve) => setTimeout(resolve, 10));
                // Validation Size
                const validationError = validateFile(rawFile, maxSizeMB);
                if (validationError) {
                    setIsProcessing(false);
                    setInternalError(validationError);
                    return;
                }

                setInternalError(null);

                // 3. The Resize Pipeline
                try {
                    // If it's an image, resize it before setting the state
                    if (mediaType === 'image') {
                        const resizedFile = await resizeImage(rawFile, 800);
                        onFileChange(resizedFile);
                    } else {
                        // For non-images (files/videos), just pass through
                        onFileChange(rawFile);
                    }
                } catch (error) {
                    console.error("Resize process failed, falling back to original:", error);
                    onFileChange(rawFile);
                } finally {
                    setIsProcessing(false);
                    console.log(isProcessing)
                }
            }
        }
    });

    // 3. Clean HandleClear
    const handleClear = () => {
        setInternalError(null);
        onFileChange(null);
    };

    const displayError = error || internalError;

    return (
        <div className="space-y-1.5 w-full" {...getRootProps()}>
            <input {...getInputProps()} />

            {label && (
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {label}
                </label>
            )}

            {/* This ternary is the  way to handle Edit Mode */}
            {value && !isProcessing && !displayError ? (
                <ImagePreview
                    file={value}
                    previewUrl={previewUrl!}
                    onClear={handleClear}
                    previewShape={previewShape}
                    previewFit={previewFit}
                    isDragActive={isDragActive}
                />
            ) : (
                <DropZone
                    isDragActive={isDragActive}
                    isDragReject={isDragReject}
                    isError={!!displayError}
                    isProcessing={isProcessing}
                />
            )}

            {displayError && <p className="text-xs text-red-500 mt-1">{displayError}</p>}
        </div>
    );
};