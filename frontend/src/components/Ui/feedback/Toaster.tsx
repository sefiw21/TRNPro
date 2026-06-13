import { Toaster as HotToaster } from 'react-hot-toast';


const Toaster = () => {
    return (
        <HotToaster
            position="top-right"
            toastOptions={{
                // Define base styles for all toasts using Tailwind classes
                className: 'bg-black text-gray-900 border border-gray-200 shadow-lg rounded-lg p-4 font-sans',

                // Define success-specific styles
                success: {
                    className: 'bg-green-50 text-green-800 border-green-200 shadow-lg rounded-lg p-4',
                },

                // Define error-specific styles
                error: {
                    className: 'bg-red-50 text-red-800 border-red-200 shadow-lg rounded-lg p-4',
                },
            }}
        />
    );
};

export default Toaster;