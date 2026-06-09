


export const validateFile = (value: string | File | null, maxSizeMB: number = 10): string | null => {
    // If it's a string, it's already in the DB, so it's valid!
    if (typeof value === 'string') return null;

    // If it's null, it's optional, so valid!
    if (!value) return null;

    // Otherwise, it's a File, so validate the size
    const maxBytes = maxSizeMB * 1024 * 1024;
    if (value.size > maxBytes) return "File is too large.";

    return null;
};