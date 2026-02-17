import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    type SortingState,
    type PaginationState,
    type ColumnDef,
} from '@tanstack/react-table';
import { MoreHorizontal, Store, Search } from 'lucide-react';
// Components
import apiClient from '@/api/client';
import { RESTAURANT_ENDPOINTS } from '@/api/endpoints';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDate, getInitials } from '@/lib/utils';
// --- Types ---
interface AdminRestaurantListItem {
    restaurant_id: string;
    name: string;
    image: string | null;
    status: string;
    owner_name: string;
    owner_id: string;
    is_veg: boolean;
    city: string;
    area: string;
    created_at: string;
}
interface AdminRestaurantListResponse {
    items: AdminRestaurantListItem[];
    total_count: number;
    page: number;
    page_size: number;
    total_pages: number;
}
interface RestaurantListParams {
    page: number;
    page_size: number;
    status?: string;
    is_veg?: boolean;
    area?: string;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
}
// --- API Service ---
const getRestaurants = async (params: RestaurantListParams) => {
    const response = await apiClient.get<{ data: AdminRestaurantListResponse }>(
        RESTAURANT_ENDPOINTS.LIST,
        { params }
    );
    return response.data.data;
};
// --- Page Component ---
export default function RestaurantsListPage() {
    // 1. State Management
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    // Filter States
    const [areaFilter, setAreaFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [vegFilter, setVegFilter] = useState('all');

    // Reset pagination when filters change
    const onFilterChange = () => {
        setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    };
    // 2. Data Fetching (React Query)
    const apiParams: RestaurantListParams = {
        page: pagination.pageIndex + 1,
        page_size: pagination.pageSize,
        sort_by: sorting.length > 0 ? sorting[0].id : 'created_at',
        sort_order: sorting.length > 0 ? (sorting[0].desc ? 'desc' : 'asc') : 'desc',
        area: areaFilter || undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        is_veg: vegFilter !== 'all' ? (vegFilter === 'true') : undefined,
    };
    const { data, isLoading } = useQuery({
        queryKey: ['restaurants', apiParams],
        queryFn: () => getRestaurants(apiParams),
        placeholderData: keepPreviousData,
    });
    // 3. Columns Definition
    const columns: ColumnDef<AdminRestaurantListItem>[] = [
        {
            accessorKey: 'image',
            header: 'Logo',
            cell: ({ row }) => (
                <Avatar className="h-9 w-9">
                    <AvatarImage src={row.original.image || ''} alt={row.original.name} />
                    <AvatarFallback>{getInitials(row.original.name)}</AvatarFallback>
                </Avatar>
            ),
        },
        {
            accessorKey: 'name',
            header: 'Name',
            cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
        },
        {
            accessorKey: 'owner_name',
            header: 'Owner',
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => {
                const status = row.getValue('status') as string;
                return (
                    <Badge variant={status === 'active' ? 'default' : 'secondary'}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                );
            },
        },
        {
            accessorKey: 'is_veg',
            header: 'Type',
            cell: ({ row }) => {
                const isVeg = row.getValue('is_veg') as boolean;
                return (
                    <Badge variant="outline" className={isVeg ? 'border-green-500 text-green-600' : 'text-red-700 border-red-200'}>
                        {isVeg ? 'Pure Veg' : 'Non-Veg'}
                    </Badge>
                );
            },
        },
        {
            accessorKey: 'area',
            header: 'Location',
            cell: ({ row }) => (
                <div className="max-w-[150px] truncate" title={`${row.original.area}, ${row.original.city}`}>
                    {row.original.area}, {row.original.city}
                </div>
            ),
        },
        {
            accessorKey: 'created_at',
            header: 'Registered',
            cell: ({ row }) => formatDate(row.getValue('created_at')),
        },
        {
            id: 'actions',
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.original.restaurant_id)}>
                            Copy ID
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];
    // 4. Table Configuration
    const table = useReactTable({
        data: data?.items ?? [],
        columns,
        rowCount: data?.total_count ?? 0,
        state: { sorting, pagination },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        manualSorting: true,
    });
    // 5. Render
    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Restaurants</h2>
                    <p className="text-muted-foreground mt-1">Manage all restaurants, view status, and filter by location.</p>
                </div>
            </div>
            <Card className="border-none shadow-md bg-white">
                <CardHeader>
                    <div className="flex items-center space-x-2">
                        <div className="bg-orange-100 p-2 rounded-lg">
                            <Store className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                            <CardTitle>All Restaurants</CardTitle>
                            <CardDescription>Overview of active and inactive restaurants.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Toolbar */}
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <div className="relative max-w-sm w-full">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Filter by area..."
                                value={areaFilter}
                                onChange={(e) => {
                                    setAreaFilter(e.target.value);
                                    onFilterChange();
                                }}
                                className="pl-8"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Select
                                value={statusFilter}
                                onValueChange={(value) => {
                                    setStatusFilter(value);
                                    onFilterChange();
                                }}
                            >
                                <SelectTrigger className="w-[150px]"><SelectValue placeholder="Status" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select
                                value={vegFilter}
                                onValueChange={(value) => {
                                    setVegFilter(value);
                                    onFilterChange();
                                }}
                            >
                                <SelectTrigger className="w-[150px]"><SelectValue placeholder="Type" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="true">Pure Veg</SelectItem>
                                    <SelectItem value="false">Non-Veg</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {/* Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    [...Array(5)].map((_, i) => (
                                        <TableRow key={i}>
                                            <TableCell colSpan={columns.length}><Skeleton className="h-12 w-full" /></TableCell>
                                        </TableRow>
                                    ))
                                ) : table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">No results found.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    {/* Pagination */}
                    <div className="flex items-center justify-end space-x-2">
                        <div className="text-sm text-muted-foreground">
                            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
                        </div>
                        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button>
                        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}