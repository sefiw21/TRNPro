
interface PageTitleProps {
    title: string;
    subtitle?: string;
}

export const PageTitle = ({ title, subtitle }: PageTitleProps) => {
    return (

        <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white oled:text-white">
                {title}
            </h1>

            {/* Only render the subtitle if one was provided */}
            {subtitle && (
                <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 oled:text-slate-500 max-w-2xl">
                    {subtitle}
                </p>
            )}
        </div>
    );
};