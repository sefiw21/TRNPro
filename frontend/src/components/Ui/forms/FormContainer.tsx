import { type ReactNode } from 'react';

type FormContainerProps = {
    title?: string;
    description?: string;
    children: ReactNode;
};

export const FormContainer = ({ title, description, children }: FormContainerProps) => {
    return (

        <section className="w-full max-w-xl mx-auto p-6 md:p-8 bg-bg-main border border-secondary rounded-md shadow-md transition-colors duration-300">

            {(title || description) && (
                <div className="mb-6 space-y-1.5">
                    {title && (

                        <h2 className="text-lg font-medium tracking-wide text-text-main transition-colors duration-300">
                            {title}
                        </h2>
                    )}
                    {description && (
                        <p className="text-sm text-secondary transition-colors duration-300">
                            {description}
                        </p>
                    )}
                </div>
            )}

            <div className="space-y-5">
                {children}
            </div>

        </section>
    );
};

