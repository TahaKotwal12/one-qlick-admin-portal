import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    type ColumnDef,
    type SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
    MoreHorizontal,
    Eye,
    Ban,
    CheckCircle,
    UserCog,
    ArrowUpDown,
    Mail,
    Phone,
    Copy
} from 'lucide-react';
import type { User } from '../types';

interface UsersTableProps {
    users: User[];
    onStatusChange: (userId: string, status: string) => Promise<void>;
    onViewDetails: (userId: string) => void;
}

export function UsersTable({ users, onStatusChange, onViewDetails }: UsersTableProps) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState({});

    const columns = useMemo<ColumnDef<User>[]>(() => [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                    className="translate-y-[2px]"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                    className="translate-y-[2px]"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: 'first_name',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="-ml-4 h-8 text-xs uppercase tracking-wider font-semibold text-gray-500 hover:text-gray-900"
                >
                    User Details
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
            ),
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border border-gray-100">
                            <AvatarImage src={user.profile_image} alt={user.first_name} />
                            <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-500 text-white font-medium">
                                {user.first_name?.[0]}{user.last_name?.[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="font-semibold text-sm text-gray-900 leading-none">
                                {user.first_name} {user.last_name}
                            </span>
                            <span className="text-xs text-muted-foreground mt-1 font-mono">
                                ID: {user.user_id.slice(0, 8)}
                            </span>
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: 'email',
            header: () => <div className="text-xs uppercase tracking-wider font-semibold text-gray-500">Contact Info</div>,
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center text-sm text-gray-700">
                            <Mail className="w-3 h-3 mr-2 text-gray-400" />
                            {user.email}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                            <Phone className="w-3 h-3 mr-2 text-gray-400" />
                            {user.phone}
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: 'role',
            header: () => <div className="text-xs uppercase tracking-wider font-semibold text-gray-500">Role</div>,
            cell: ({ row }) => {
                const role = row.original.role;
                const styles: Record<string, string> = {
                    admin: 'bg-purple-50 text-purple-700 border-purple-200 ring-purple-100',
                    customer: 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-100',
                    restaurant_owner: 'bg-orange-50 text-orange-700 border-orange-200 ring-orange-100',
                    delivery_partner: 'bg-teal-50 text-teal-700 border-teal-200 ring-teal-100',
                };
                return (
                    <Badge variant="outline" className={`capitalize font-medium shadow-sm ${styles[role] || 'bg-gray-50 text-gray-700'}`}>
                        {role.replace('_', ' ')}
                    </Badge>
                );
            },
        },
        {
            accessorKey: 'status',
            header: () => <div className="text-xs uppercase tracking-wider font-semibold text-gray-500">Status</div>,
            cell: ({ row }) => {
                const status = row.original.status;
                return (
                    <div className="flex items-center gap-2">
                        <span className={`relative flex h-2 w-2`}>
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status === 'active' ? 'bg-green-400' : 'bg-red-400'}`}></span>
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        </span>
                        <span className={`text-sm font-medium ${status === 'active' ? 'text-green-700' : status === 'suspended' ? 'text-red-700' : 'text-gray-600'}`}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                    </div>
                );
            },
        },
        {
            accessorKey: 'created_at',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="-ml-4 h-8 text-xs uppercase tracking-wider font-semibold text-gray-500 hover:text-gray-900"
                >
                    Joined
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="text-sm text-gray-600 font-medium">
                    {new Date(row.original.created_at).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })}
                </div>
            ),
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100 data-[state=open]:bg-gray-100">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4 text-gray-500" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[180px] p-2">
                            <DropdownMenuLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.user_id)} className="cursor-pointer text-xs">
                                <Copy className="mr-2 h-3.5 w-3.5 text-gray-400" />
                                Copy ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="my-1.5" />
                            <DropdownMenuItem onClick={() => onViewDetails(user.user_id)} className="cursor-pointer font-medium text-gray-700 focus:bg-indigo-50 focus:text-indigo-600">
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer font-medium text-gray-700">
                                <UserCog className="mr-2 h-4 w-4" />
                                Edit Role
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="my-1.5" />
                            {user.status === 'active' ? (
                                <DropdownMenuItem onClick={() => onStatusChange(user.user_id, 'suspended')} className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700">
                                    <Ban className="mr-2 h-4 w-4" />
                                    Suspend Access
                                </DropdownMenuItem>
                            ) : (
                                <DropdownMenuItem onClick={() => onStatusChange(user.user_id, 'active')} className="cursor-pointer text-green-600 focus:bg-green-50 focus:text-green-700">
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Activate Access
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ], [onStatusChange, onViewDetails]);

    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            rowSelection,
        },
    });

    return (
        <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <Table className="table-fixed w-full">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="bg-gray-50/50 hover:bg-gray-50/50 border-gray-100">
                                {headerGroup.headers.map((header) => {
                                    // Dynamic width based on column ID
                                    let widthClass = "w-auto";
                                    if (header.id === 'select') widthClass = "w-[50px]";
                                    if (header.id === 'first_name') widthClass = "w-[250px]";
                                    if (header.id === 'email') widthClass = "w-[250px]";
                                    if (header.id === 'role') widthClass = "w-[150px]";
                                    if (header.id === 'status') widthClass = "w-[140px]";
                                    if (header.id === 'created_at') widthClass = "w-[140px]";
                                    if (header.id === 'actions') widthClass = "w-[80px]";

                                    return (
                                        <TableHead key={header.id} className={`h-10 py-3 ${widthClass}`}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="group hover:bg-gray-50/50 transition-colors border-gray-100"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="py-3 align-middle whitespace-nowrap overflow-hidden text-ellipsis">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between px-4 py-4 border-t border-gray-100 bg-gray-50/30">
                <div className="text-xs text-muted-foreground">
                    {Object.keys(rowSelection).length} of {users.length} row(s) selected.
                </div>
            </div>
        </div>
    );
}
