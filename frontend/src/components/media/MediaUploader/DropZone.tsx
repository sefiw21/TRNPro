
import { UploadCloud } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface DropZoneProps {
    isDragActive: boolean;
    isDragReject: boolean;
    isError: boolean;
}

export const DropZone = ({ isDragActive, isDragReject, isError }: DropZoneProps) => {
    return (
        <div className={twMerge(
            "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 pointer-events-none",
            isDragActive && !isDragReject ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10" : "",
            (isDragReject || isError) ? "border-red-500 bg-red-50 dark:bg-red-500/10" : "",
            !isDragActive && !isDragReject && !isError ? "border-slate-300 bg-slate-50 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:bg-slate-800" : ""
        )}>
            <UploadCloud className={twMerge(
                "mb-2 transition-all duration-200",
                isDragActive && !isDragReject ? "text-blue-500 scale-110" : "text-slate-400",
                (isDragReject || isError) ? "text-red-500" : ""
            )} />

            <span className={twMerge(
                "text-sm font-medium",
                (isDragReject || isError) ? "text-red-500 dark:text-red-400" : "text-slate-500 dark:text-slate-400"
            )}>
                {isDragReject ? "File type not supported!" :
                    isDragActive ? "Release the file here" :
                        "Click or drag file here"}
            </span>
        </div>
    );
};