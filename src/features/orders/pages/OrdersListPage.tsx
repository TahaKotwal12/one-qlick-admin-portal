import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, RefreshCw } from 'lucide-react';
import { OrdersFiltersBar } from '../components/OrdersFiltersBar';
import { orderService } from '../api/orderService';
import type { Order, OrdersFilters } from '../types';

export default function OrdersListPage() {
    // --- Local Hook Logic ---
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [filters, setFilters] = useState<OrdersFilters>({
        search: '',
        status_filter: 'all',
        min_price: '',
        max_price: '',
        location: '',
    });

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await orderService.getOrders({ ...filters, page });
            setOrders(response.orders);
            setTotalCount(response.total_count);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    }, [filters, page]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const updateFilters = (newFilters: Partial<OrdersFilters>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
        setPage(1); // Reset to first page on filter change
    };

    // --- Component Logic ---
    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Orders Management</h2>
                    <p className="text-muted-foreground mt-1">
                        View and manage all customer orders across the platform
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" onClick={fetchOrders} disabled={loading}>
                        <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                </div>
            </div>

            <Card className="border-none shadow-md">
                <CardContent className="p-6">
                    <div className="mb-6">
                        <OrdersFiltersBar
                            filters={filters}
                            onFiltersChange={updateFilters}
                        />
                    </div>

                    {error && (
                        <div className="text-center py-12 bg-red-50 border border-red-100 rounded-lg">
                            <p className="text-red-600 mb-4">{error}</p>
                            <Button onClick={fetchOrders} variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                                Try Again
                            </Button>
                        </div>
                    )}

                    {loading && !error && (
                        <div className="text-center py-24">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                            <p className="text-gray-500 mt-4">Loading orders...</p>
                        </div>
                    )}

                    {!loading && !error && orders.length === 0 && (
                        <div className="text-center py-24 border-2 border-dashed border-gray-200 rounded-lg">
                            <ShoppingBag className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">No orders found</h3>
                            <p className="text-gray-500 mt-1">Try adjusting your filters.</p>
                        </div>
                    )}

                    {!loading && !error && orders.length > 0 && (
                        <>
                            <div className="rounded-md border border-gray-100 overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Order #</TableHead>
                                            <TableHead>Customer</TableHead>
                                            <TableHead>Restaurant</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Date</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {orders.map((order) => (
                                            <TableRow key={order.order_id}>
                                                <TableCell className="font-medium">{order.order_number}</TableCell>
                                                <TableCell>{order.customer_name}</TableCell>
                                                <TableCell>{order.restaurant?.name}</TableCell>

                                                <TableCell>{order.total_amount.toFixed(2)}</TableCell>

                                                <TableCell>
                                                    <Badge className={
                                                        order.order_status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                                            order.order_status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                                                    }>
                                                        {order.order_status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-gray-500 text-sm">
                                                    {new Date(order.created_at).toLocaleDateString()}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            <div className="flex items-center justify-between mt-6">
                                <p className="text-sm text-gray-500">
                                    Total {totalCount} orders found
                                </p>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setPage(p => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setPage(p => p + 1)}
                                        disabled={orders.length < 10} // Simple pagination check
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
