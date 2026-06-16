import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react";
import { useState } from "react";

type Folder = {
    name: string,
    folders?: Folder[],
    file?: string
}

let nodes: Folder[] = [
    {
        name: "Home",
        folders: [
            {
                name: "Actions",
                folders: [
                    {
                        name: "spritual",
                        folders: [{
                            name: "2018", folders: [
                                { name: "file.tsx" },
                                { name: "file.tsx" },
                                { name: "file.tsx" }
                            ]
                        }]
                    },
                    { name: "Phisycal", folders: [] }]
            },
            {
                name: "Systems",
                folders: [
                    {
                        name: "family",
                        folders: [{ name: "2030", folders: [{ name: "file.tsx" }] }]
                    },
                    { name: "Official", folders: [{ name: "file.tsx" }] }
                ]
            },
            { name: "Positions", folders: [{ name: "Organiztional", folders: [] }, { name: "Family", folders: [] }] },
            { name: "Documents", folders: [{ name: "work", folders: [] },] },
            { name: "file.tsx" }
        ],
    }
];

const Recursive = () => {
    return (
        // 1. Removed the harsh green bg. Kept padding, but let it inherit the app's background.
        <div className="p-4 sm:p-8 w-full max-w-sm">
            <ul className="flex flex-col gap-1">
                {nodes.map((folder) => (
                    <Folder folder={folder} key={folder.name} />
                ))}
            </ul>
        </div>
    );
};

function Folder({ folder }: { folder: Folder }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li className="flex flex-col">
            {/* 2. THE ROW WRAPPER: Added 3-tier hover effects and removed the blocky blue background */}
            <span className="flex items-center w-full px-2 py-1.5 rounded-lg transition-colors duration-200 group
                hover:bg-slate-200/60 
                dark:hover:bg-white/10 
                oled:hover:bg-white/5
            ">
                {folder.folders && folder.folders?.length > 0 && (
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="cursor-pointer p-0.5 mr-1 rounded-md outline-none transition-colors
                            text-slate-400 hover:text-slate-800 hover:bg-slate-300/50
                            dark:text-slate-500 dark:hover:text-white dark:hover:bg-white/10
                            oled:text-slate-600 oled:hover:text-white oled:hover:bg-white/10
                        "
                    >
                        <ChevronRightIcon className={`size-4 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
                    </button>
                )}

                {folder.folders ? (
                    <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer outline-none mr-2">
                        {/* 3. Folder Icon styling */}
                        <FolderIcon className="size-4.5 text-blue-500 dark:text-blue-400 oled:text-slate-400" />
                    </button>
                ) : (
                    // 4. File Icon styling (ml-6 perfectly aligns it with folders since it has no chevron)
                    <FileIcon className="size-4.5 ml-6 mr-2 transition-colors text-slate-400 dark:text-slate-500 oled:text-slate-600 group-hover:text-slate-600 dark:group-hover:text-slate-300 oled:group-hover:text-slate-400" />
                )}

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="cursor-pointer outline-none text-sm font-medium transition-colors text-left truncate
                        text-slate-700 group-hover:text-slate-900 
                        dark:text-slate-300 dark:group-hover:text-white 
                        oled:text-slate-400 oled:group-hover:text-white
                    "
                >
                    {folder.name}
                </button>
            </span>

            {isOpen && (
                // 5. Nested list alignment with a subtle VS Code style vertical guide line
                <ul className="pl-6 flex flex-col gap-1 mt-1 relative">
                    <div className="absolute left-3 top-0 bottom-0 w-px transition-colors bg-slate-200 dark:bg-white/10 oled:bg-white/5" />

                    {folder.folders?.map((childFolder) => (
                        <Folder folder={childFolder} key={childFolder.name} />
                    ))}
                </ul>
            )}
        </li>
    );
}

export default Recursive;