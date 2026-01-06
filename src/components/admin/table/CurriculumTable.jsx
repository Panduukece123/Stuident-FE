import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, MoreHorizontal, Pencil, Trash } from 'lucide-react';
import * as React from 'react';

const CurriculumTable = ({
    curriculums,
    onView,
    onEdit,
    onDelete
}) => {
    return (
        <div className="rounded-md border bg-white">
            {/* Table */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Section</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {curriculums.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center">
                                <p className='text-muted-foreground font-light'>No results...</p>
                            </TableCell>
                        </TableRow>
                    )}
                    {curriculums?.map((curriculum) => (
                        <React.Fragment key={curriculum.id}>
                            <TableRow>
                                <TableCell>{curriculum.section}</TableCell>
                                <TableCell className={"font-medium"}>{curriculum.title}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button size="icon" variant="ghost">
                                                <MoreHorizontal />
                                            </Button>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem onClick={() => onView(curriculum)}>
                                                <Eye/>
                                                View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => onEdit(curriculum)}>
                                                <Pencil />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => onDelete(curriculum)}>
                                                <Trash />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
            
            {/* Pagination */}
        </div>
    )
}

export default CurriculumTable;