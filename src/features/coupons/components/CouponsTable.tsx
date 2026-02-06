import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    getFilteredRowModel,
} from '@tanstack/react-table';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import { useState } from 'react';
import { MoreHorizontal, Edit, Trash2, Eye, Star, StarOff } from 'lucide-react';
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
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { CouponType } from '../types';
import type { Coupon } from '../types';
import { useDeleteCoupon, useToggleCarousel } from '../hooks/useCoupons';
import { format } from 'date-fns';

interface CouponsTableProps {
    coupons: Coupon[];
    isLoading: boolean;
    searchQuery: string;
}

export function CouponsTable({ coupons, isLoading, searchQuery }: CouponsTableProps) {
    const navigate = useNavigate();
    const [sorting, setSorting] = useState<SortingState>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

    const deleteMutation = useDeleteCoupon();
    const toggleCarouselMutation = useToggleCarousel();

    const columns: ColumnDef<Coupon>[] = useMemo(
        () => [
            {
                accessorKey: 'code',
                header: 'Code',
                cell: ({ row }) => (
                    <div className="font-mono font-semibold">{row.original.code}</div>
                ),
            },
            {
                accessorKey: 'title',
                header: 'Title',
                cell: ({ row }) => (
                    <div className="max-w-[300px]">
                        <div className="font-medium">{row.original.title}</div>
                        {row.original.description && (
                            <div className="text-sm text-muted-foreground truncate">
                                {row.original.description}
                            </div>
                        )}
                    </div>
                ),
            },
            {
                accessorKey: 'coupon_type',
                header: 'Type',
                cell: ({ row }) => {
                    const type = row.original.coupon_type;
                    const value = row.original.discount_value;

                    let display = '';
                    let variant: 'default' | 'secondary' | 'outline' = 'default';

                    if (type === CouponType.PERCENTAGE) {
                        display = `${value}% OFF`;
                        variant = 'default';
                    } else if (type === CouponType.FIXED_AMOUNT) {
                        display = `₹${value} OFF`;
                        variant = 'secondary';
                    } else {
                        display = 'FREE DELIVERY';
                        variant = 'outline';
                    }

                    return <Badge variant={variant}>{display}</Badge>;
                },
            },
            {
                accessorKey: 'usage',
                header: 'Usage',
                cell: ({ row }) => (
                    <div className="text-sm">
                        <div>{row.original.used_count} used</div>
                        {row.original.usage_limit && (
                            <div className="text-muted-foreground">
                                of {row.original.usage_limit} limit
                            </div>
                        )}
                    </div>
                ),
            },
            {
                accessorKey: 'valid_until',
                header: 'Valid Until',
                cell: ({ row }) => {
                    const date = new Date(row.original.valid_until);
                    const isExpired = date < new Date();

                    return (
                        <div className={isExpired ? 'text-destructive' : ''}>
                            {format(date, 'MMM dd, yyyy')}
                        </div>
                    );
                },
            },
            {
                accessorKey: 'show_in_carousel',
                header: 'Carousel',
                cell: ({ row }) => (
                    <div className="flex items-center gap-2">
                        <Switch
                            checked={row.original.show_in_carousel}
                            onCheckedChange={(checked) => {
                                toggleCarouselMutation.mutate({
                                    id: row.original.coupon_id,
                                    show: checked,
                                });
                            }}
                        />
                        {row.original.show_in_carousel && (
                            <Badge variant="outline" className="text-xs">
                                P{row.original.carousel_priority}
                            </Badge>
                        )}
                    </div>
                ),
            },
            {
                accessorKey: 'is_active',
                header: 'Status',
                cell: ({ row }) => (
                    <Badge variant={row.original.is_active ? 'default' : 'secondary'}>
                        {row.original.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                ),
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
                            <DropdownMenuItem onClick={() => navigate(`/coupons/${row.original.coupon_id}`)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/coupons/${row.original.coupon_id}/edit`)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => {
                                    toggleCarouselMutation.mutate({
                                        id: row.original.coupon_id,
                                        show: !row.original.show_in_carousel,
                                    });
                                }}
                            >
                                {row.original.show_in_carousel ? (
                                    <>
                                        <StarOff className="h-4 w-4 mr-2" />
                                        Remove from Carousel
                                    </>
                                ) : (
                                    <>
                                        <Star className="h-4 w-4 mr-2" />
                                        Add to Carousel
                                    </>
                                )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => {
                                    setSelectedCoupon(row.original);
                                    setDeleteDialogOpen(true);
                                }}
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ),
            },
        ],
        [navigate, toggleCarouselMutation]
    );

    const filteredData = useMemo(() => {
        if (!searchQuery) return coupons;

        const query = searchQuery.toLowerCase();
        return coupons.filter(
            (coupon) =>
                coupon.code.toLowerCase().includes(query) ||
                coupon.title.toLowerCase().includes(query) ||
                coupon.description?.toLowerCase().includes(query)
        );
    }, [coupons, searchQuery]);

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        state: {
            sorting,
        },
    });

    const handleDelete = () => {
        if (selectedCoupon) {
            deleteMutation.mutate(selectedCoupon.coupon_id);
            setDeleteDialogOpen(false);
            setSelectedCoupon(null);
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
            <div className="rounded-md border">
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
                                    No coupons found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Coupon</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete coupon "{selectedCoupon?.code}"? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
