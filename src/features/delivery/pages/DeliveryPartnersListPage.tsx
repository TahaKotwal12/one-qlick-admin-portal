import { useState } from 'react';
import { useDeliveryPartners } from '../api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { Search, Eye } from 'lucide-react';

export default function DeliveryPartnersListPage() {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const limit = 10;

    // Filters state
    const [search, setSearch] = useState('');
    const [availability, setAvailability] = useState('all');

    // Fetch data from React Query
    const { data: response, isLoading } = useDeliveryPartners({
        skip: page * limit,
        limit,
        search: search || undefined,
        availability: availability !== 'all' ? availability : undefined,
    });

    const partners = response?.delivery_partners || [];
    const totalCount = response?.total_count || 0;

    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Delivery Partners</h2>
                    <p className="text-muted-foreground mt-1">Manage all delivery fleet drivers</p>
                </div>
            </div>

            <Card className="border-none shadow-md">
                <CardContent className="p-6">
                    {/* Filters */}
                    <div className="flex space-x-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                placeholder="Search name, bike plate, or location..."
                                className="pl-9"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <Select value={availability} onValueChange={setAvailability}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="available">Available</SelectItem>
                                <SelectItem value="busy">Busy</SelectItem>
                                <SelectItem value="offline">Offline</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Table */}
                    <div className="rounded-md border border-gray-100 overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Vehicle</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Deliveries</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {isLoading ? (
                                    <tr><td colSpan={5} className="text-center py-8">Loading...</td></tr>
                                ) : partners.length === 0 ? (
                                    <tr><td colSpan={5} className="text-center py-8 text-gray-500">No delivery partners found.</td></tr>
                                ) : (
                                    partners.map((p) => (
                                        <tr key={p.delivery_partner_id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium">
                                                {p.first_name} {p.last_name}
                                                <div className="text-xs text-gray-500 font-normal">{p.phone}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="capitalize">{p.vehicle_type}</span>
                                                <div className="text-xs text-gray-500">{p.vehicle_number}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                                    ${p.availability_status === 'available' ? 'bg-green-100 text-green-800' :
                                                        p.availability_status === 'busy' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-gray-100 text-gray-800'
                                                    } capitalize`}>
                                                    {p.availability_status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">{p.total_deliveries}</td>
                                            <td className="px-6 py-4 text-right">
                                                <Button variant="ghost" size="sm" onClick={() => navigate(`/delivery-partners/${p.delivery_partner_id}`)}>
                                                    <Eye className="w-4 h-4 mr-2" /> View
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-6">
                        <p className="text-sm text-gray-500">
                            Showing <span className="font-medium">{page * limit + 1}</span> to <span className="font-medium">{Math.min((page + 1) * limit, totalCount)}</span> of <span className="font-medium">{totalCount}</span>
                        </p>
                        <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>
                                Previous
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setPage(p => p + 1)} disabled={(page + 1) * limit >= totalCount}>
                                Next
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
