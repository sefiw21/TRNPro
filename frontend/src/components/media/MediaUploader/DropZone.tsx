import { Loader2, UploadCloud } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface DropZoneProps {
    isDragActive: boolean;
    isDragReject: boolean;
    isError: boolean;
    isProcessing?: boolean;
}

export const DropZone = ({ isDragActive, isDragReject, isError, isProcessing }: DropZoneProps) => {

    const getUIState = () => {
        // Active & Valid (The user is dragging a good file)
        if (isDragActive && !isDragReject) {
            return {
                text: "Drop it right here.",
                textColor: "text-emerald-600 dark:text-emerald-400 oled:text-emerald-300",
                iconColor: "text-emerald-500 scale-110 -translate-y-1",
            };
        }

        //  Error (The file was dropped, but it's too big) or  Drag Reject (The user is dragging the wrong file type)
        if (isError || isDragReject) {
            return {
                text: "Please use a supported image size and format.",
                textColor: "text-indigo-600 dark:text-indigo-400 oled:text-indigo-300",
                iconColor: "text-indigo-500 animate-pulse",
            };
        }

        //  Default 
        return {
            text: "Click or drag file here",
            textColor: "text-slate-600 dark:text-slate-300 oled:text-white",
            iconColor: "text-slate-400 dark:text-slate-500",
        };
    };

    const ui = getUIState();

    return (
        <div className={twMerge(
            "flex flex-col items-center justify-center w-full h-32 border-2 rounded-xl transition-all duration-300 pointer-events-none",

            // 2. Processing State (Solid border, subtle background)
            isProcessing
                ? "border-solid border-slate-200 bg-slate-50/80 dark:border-white/10 dark:bg-slate-800/50 oled:border-white/10 oled:bg-black"

                // 3. Drag Active State
                : isDragActive && !isDragReject
                    ? "border-dashed border-blue-500 bg-blue-50 dark:bg-blue-500/10 oled:bg-blue-500/10 scale-[1.02]"

                    // 4. Error/Reject State
                    : (isDragReject || isError)
                        ? "border-dashed border-e-blue-700 bg-red-50 dark:bg-red-500/10 oled:bg-red-500/10"

                        // 5. Default State
                        : "border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400 dark:border-white/20 dark:bg-slate-900 dark:hover:bg-slate-800 oled:border-white/20 oled:bg-black oled:hover:border-white/40"
        )}>
            {/* {isDragReject || isError && (
                <div>choose another file</div>
            )} */}
            {/* Conditional Rendering of Content */}
            {isProcessing ? (
                // --- THE PROCESSING UI ---
                <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600 dark:text-blue-400 mb-2" />
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                        Optimizing Image...
                    </span>
                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-1">
                        Just a second
                    </span>
                </div>
            ) : (
                // --- THE NORMAL UPLOAD UI ---
                <div className="flex flex-col items-center justify-center animate-in fade-in duration-300">
                    <UploadCloud
                        className={twMerge(
                            "w-8 h-8 mb-2 transition-all duration-300",
                            ui.iconColor // Injects the exact color and animation!
                        )}
                    />

                    <span
                        className={twMerge(
                            "text-sm font-semibold transition-colors duration-300",
                            ui.textColor // Injects the exact polite color!
                        )}
                    >
                        {ui.text} {/* Injects the exact polite phrase! */}
                    </span>
                </div>
            )}
        </div>
    );
};