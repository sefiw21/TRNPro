export const resizeImage = (file: File, maxWidth: number): Promise<File> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            console.log("file size to be resized: ", file.size)
            img.onload = () => {
                const scale = maxWidth / img.width;
                // Only resize if the image is actually larger than maxWidth
                if (img.width <= maxWidth) {
                    img.src = ""; // Clean up memory
                    return resolve(file);
                }

                const newWidth = maxWidth;
                const newHeight = img.height * scale;

                const canvas = document.createElement('canvas');
                canvas.width = newWidth;
                canvas.height = newHeight;

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    img.src = "";
                    return reject(new Error("Canvas context failed"));
                }

                ctx.drawImage(img, 0, 0, newWidth, newHeight);

                canvas.toBlob((blob) => {
                    if (!blob) {
                        reject(new Error("Canvas to Blob failed"));
                    } else {
                        const resizedFile = new File([blob], file.name, {
                            type: file.type,
                            lastModified: Date.now(),
                        });
                        resolve(resizedFile);
                    }

                    // --- PROFESSIONAL CLEANUP ---
                    img.src = ""; // Stop the image from consuming memory
                    canvas.width = 0; // Force-clear the canvas size
                    canvas.height = 0;
                }, file.type, 0.8);
            };

            img.onerror = () => {
                img.src = "";
                reject(new Error("Image load failed"));
            };
        };
        reader.onerror = () => reject(new Error("FileReader failed"));
    });
};