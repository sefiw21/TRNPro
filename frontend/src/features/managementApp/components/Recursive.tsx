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
        <div className="p-8 bg-green-950">
            <ul className="pl-6">
                {nodes.map((folder) => (
                    <Folder folder={folder} key={folder.name} />
                ))}
            </ul>
        </div>

    );
};


function Folder({ folder }: { folder: Folder }) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <li className="my-1.5" >
            <span className="flex items-start w-max px-2 bg-blue-900 rounded-bl-sm gap-1">
                {folder.folders && folder.folders?.length > 0 && (
                    <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                        <ChevronRightIcon className="size-6 pt-0.5 " />
                    </button>

                )}

                {folder.folders ? (
                    <button onClick={() => setIsOpen(!isOpen)} className=" cursor-pointer">
                        <FolderIcon className="size-6 text-sky-300 " />
                    </button>

                ) : <FileIcon className="size-6 ml-6 text-green-500" />
                }

                <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer ">
                    {folder.name}
                </button>

            </span>
            {isOpen && (
                <ul className="pl-6">
                    {folder.folders?.map((folder) => (
                        <Folder folder={folder} />
                    ))}
                </ul>
            )}


        </li>
    )
}
export default Recursive;
