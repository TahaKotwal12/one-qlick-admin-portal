import { useMemo } from 'react';
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import type { ReviewResponse } from '../types';

interface ReviewResponsesTableProps {
    responses: ReviewResponse[];
    isLoading: boolean;
}

export function ReviewResponsesTable({ responses, isLoading }: ReviewResponsesTableProps) {
    const columns: ColumnDef<ReviewResponse>[] = useMemo(
        () => [
            {
                accessorKey: 'user_id',
                header: 'User ID',
                cell: ({ row }) => <span className="font-mono text-xs">{row.original.user_id}</span>,
            },
            {
                accessorKey: 'response_data',
                header: 'Response Data',
                cell: ({ row }) => (
                    <div className="max-w-[500px] overflow-auto">
                        <pre className="text-xs bg-muted p-2 rounded">
                            {JSON.stringify(row.original.response_data, null, 2)}
                        </pre>
                    </div>
                ),
            },
            {
                accessorKey: 'created_at',
                header: 'Submitted At',
                cell: ({ row }) => format(new Date(row.original.created_at), 'MMM dd, yyyy HH:mm'),
            },
        ],
        []
    );

    const table = useReactTable({
        data: responses,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

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
                                No responses found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
