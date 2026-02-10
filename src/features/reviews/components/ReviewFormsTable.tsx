import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
} from '@tanstack/react-table';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import { MoreHorizontal, Edit, Trash2, Eye, MessageSquare } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { format } from 'date-fns';
import type { ReviewForm } from '../types';
import { useDeleteReviewForm } from '../hooks/useReviewForms';

interface ReviewFormsTableProps {
    forms: ReviewForm[];
    isLoading: boolean;
    searchQuery: string;
}

export function ReviewFormsTable({ forms, isLoading, searchQuery }: ReviewFormsTableProps) {
    const navigate = useNavigate();
    const [sorting, setSorting] = useState<SortingState>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedForm, setSelectedForm] = useState<ReviewForm | null>(null);

    const deleteMutation = useDeleteReviewForm();

    const columns: ColumnDef<ReviewForm>[] = useMemo(
        () => [
            {
                accessorKey: 'title',
                header: 'Title',
                cell: ({ row }) => (
                    <div>
                        <div className="font-medium">{row.original.title}</div>
                        <div className="text-sm text-muted-foreground font-mono">
                            {row.original.slug}
                        </div>
                    </div>
                ),
            },
            {
                accessorKey: 'fields',
                header: 'Fields',
                cell: ({ row }) => (
                    <Badge variant="outline">
                        {row.original.fields.length} questions
                    </Badge>
                ),
            },
            {
                accessorKey: 'status',
                header: 'Status',
                cell: ({ row }) => {
                    const status = row.original.status;
                    let variant: 'default' | 'secondary' | 'outline' = 'default';

                    if (status === 'draft') variant = 'secondary';
                    if (status === 'archived') variant = 'outline';

                    return (
                        <Badge variant={variant} className="capitalize">
                            {status}
                        </Badge>
                    );
                },
            },
            {
                accessorKey: 'created_at',
                header: 'Created At',
                cell: ({ row }) => format(new Date(row.original.created_at), 'MMM dd, yyyy'),
            },
            {
                id: 'actions',
                cell: ({ row }) => (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigate(`/reviews/${row.original.id}/responses`)}>
                                <MessageSquare className="h-4 w-4 mr-2" />
                                View Responses
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/reviews/${row.original.id}/edit`)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Form
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => {
                                    setSelectedForm(row.original);
                                    setDeleteDialogOpen(true);
                                }}
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Archive
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ),
            },
        ],
        [navigate]
    );

    const filteredData = useMemo(() => {
        if (!searchQuery) return forms;

        const query = searchQuery.toLowerCase();
        return forms.filter(
            (form) =>
                form.title.toLowerCase().includes(query) ||
                form.slug.toLowerCase().includes(query) ||
                form.description?.toLowerCase().includes(query)
        );
    }, [forms, searchQuery]);

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        state: {
            sorting,
        },
    });

    const handleDelete = () => {
        if (selectedForm) {
            deleteMutation.mutate(selectedForm.id);
            setDeleteDialogOpen(false);
            setSelectedForm(null);
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                ))}
            </div>
        );
    }

    return (
        <>
            <div className="rounded-md border bg-background">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No review forms found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Archive Review Form</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to archive "{selectedForm?.title}"? Users will no longer be able to submit responses to this form.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                            Archive
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
