import { Toaster as HotToaster } from 'react-hot-toast';

const Toaster = () => {
    return (
        <HotToaster
            position="top-right"
            toastOptions={{
                duration: 4000,
                // The base styles for BOTH light and dark modes
                className: 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 shadow-xl rounded-xl p-4 font-sans backdrop-blur-md',

                success: {
                    // Adds a very subtle green border glow in dark mode for success
                    className: 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-green-200 dark:border-green-500/30 shadow-xl rounded-xl p-4 backdrop-blur-md',
                    iconTheme: {
                        primary: '#22c55e', // Tailwind green-500
                        secondary: '#ffffff', // Checkmark color
                    },
                },

                error: {
                    // Adds a very subtle red border glow in dark mode for errors
                    className: 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-red-200 dark:border-red-500/30 shadow-xl rounded-xl p-4 backdrop-blur-md',
                    iconTheme: {
                        primary: '#ef4444', // Tailwind red-500
                        secondary: '#ffffff', // X color
                    },
                },
            }}
        />
    );
};

export default Toaster;