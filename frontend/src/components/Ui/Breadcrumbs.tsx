import { ChevronRight, HomeIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';


export const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((path) => path);

    if (pathnames.length === 0) return null;

    return (
        <nav aria-label="breadcrumb" className="w-full">
            <ol className="flex items-center gap-1 text-[13px] font-medium text-slate-500 dark:text-slate-400 oled:text-slate-500">

                {/* Static Home Link */}
                <li className="flex items-center">
                    <Link
                        to="/"
                        // hover: background highlighting instead of just text color changing
                        className="px-2 py-1 rounded-md transition-all hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-slate-200 oled:hover:bg-white/10 oled:hover:text-slate-200 flex items-center gap-1.5"
                    >
                        {/*  A small Home icon looks very modern */}
                        <HomeIcon className='h-3 w-3' />
                        <span className="hidden sm:inline">Home</span>
                    </Link>
                </li>

                {/* Dynamic Path Links */}
                {pathnames.map((segment, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;

                    // Format text
                    const formattedLabel = segment
                        .replace(/-/g, ' ')
                        .replace(/\b\w/g, (char) => char.toUpperCase());

                    return (
                        <li key={routeTo} className="flex items-center ">
                            {/* 4. Using an SVG Chevron instead of a slash */}
                            <ChevronRight className='h-5' />

                            {isLast ? (
                                // 5. Current page: brighter text, no hover effect, truncated if it's a long ID
                                <span
                                    className="px-2 py-1 text-slate-900 dark:text-slate-200 oled:text-slate-200 cursor-default truncate max-w-[150px] sm:max-w-[250px]"
                                    aria-current="page"
                                    title={formattedLabel} // Shows full text on hover if truncated
                                >
                                    {formattedLabel}
                                </span>
                            ) : (
                                // 6. Intermediate pages: interactive hover state
                                <Link
                                    to={routeTo}
                                    className="px-2 py-1 rounded-md transition-all hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-slate-200 oled:hover:bg-white/10 oled:hover:text-slate-200 truncate max-w-[120px]"
                                >
                                    {formattedLabel}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};