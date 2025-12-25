import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronDown, ChevronUp, Edit, Trash } from 'lucide-react';
import * as React from 'react';

const CurriculumTable = ({
    curriculums,
    onRefresh
}) => {
    const [expandedId, setExpandedId] = React.useState(null);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div>
            {/* Table */}
            <Table className={"border border-neutral-200 rounded bg-white"}>
                <TableHeader>
                    <TableRow className={"bg-neutral-50 hover:bg-neutral-50"}>
                        <TableHead>Section</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {curriculums?.map((curriculum) => (
                        <React.Fragment key={curriculum.id}>
                            <TableRow>
                                <TableCell>{curriculum.section}</TableCell>
                                <TableCell className={"font-medium"}>{curriculum.title}</TableCell>
                                <TableCell className={"flex flex-row gap-2 align-middle"}>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        title={expandedId === curriculum.id ? "Collapse details" : "Expand details"}
                                        onClick={() => toggleExpand(curriculum.id)}
                                    >
                                        Details
                                        {expandedId === curriculum.id ? (<ChevronUp />): (<ChevronDown />)}
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        title="Update curriculum"
                                    >
                                        <Edit />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        title="Delete curriculum"
                                    >
                                        <Trash />
                                    </Button>
                                </TableCell>
                            </TableRow>

                            {expandedId === curriculum.id && (
                                <TableRow className={"bg-white hover:bg-white"}>
                                    <TableCell colSpan={3}>
                                        <div className={"p-2 md:p-4 grid grid-cols-2"}>
                                            <div>
                                                <p className={"font-medium"}>Description</p>
                                                <p>{curriculum.description}</p>
                                                <p className={"font-medium"}>Duration</p>
                                                <p>{curriculum.duration}</p>
                                            </div>
                                            <div>
                                                <p className={"font-medium"}>Video URL</p>
                                                <iframe
                                                    src={curriculum.video_url}
                                                    allow="encrypted-media"
                                                    allowFullScreen
                                                    className="w-64 aspect-video rounded-lg"
                                                ></iframe>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
            
            {/* Pagination */}
        </div>
    )
}

export default CurriculumTable;