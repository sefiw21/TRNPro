import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { DropZone } from './DropZone';
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
    maxSizeMB = 5,
    acceptedFormats,
    onFileChange,
    error,
    previewShape = 'rectangle',
    previewFit = 'cover'
}: MediaUploaderProps) => {

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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
    // const onDrop= (acceptedFiles, fileRejections) => {
    //             if (fileRejections.length > 0) {
    //                 setInternalError("Invalid file type.");
    //                 return;
    //             }

    //             if (acceptedFiles.length > 0) {
    //                 const newFile = acceptedFiles[0];
    //                 const validationError = validateFile(newFile, maxSizeMB);

    //                 if (validationError) {
    //                     setInternalError(validationError);
    //                     return;
    //                 }

    //                 setInternalError(null);
    //                 onFileChange(newFile); 
    //             }
    //         }
    // 2. Dropzone Logic
    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        accept: acceptedFormats,
        multiple: false,
        onDrop: (acceptedFiles, fileRejections) => {
            if (fileRejections.length > 0) {
                setInternalError("Invalid file type.");
                return;
            }

            if (acceptedFiles.length > 0) {
                const newFile = acceptedFiles[0];
                const validationError = validateFile(newFile, maxSizeMB);

                if (validationError) {
                    setInternalError(validationError);
                    return;
                }

                setInternalError(null);
                onFileChange(newFile);
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

            {/* This ternary is the professional way to handle Edit Mode */}
            {!value ? (
                <DropZone
                    isDragActive={isDragActive}
                    isDragReject={isDragReject}
                    isError={!!displayError}
                />
            ) : (
                <ImagePreview
                    file={value}
                    previewUrl={previewUrl!}
                    onClear={handleClear}
                    previewShape={previewShape}
                    previewFit={previewFit}
                    isDragActive={isDragActive}
                />
            )}

            {displayError && <p className="text-xs text-red-500 mt-1">{displayError}</p>}
        </div>
    );
};