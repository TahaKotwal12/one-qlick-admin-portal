import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Download, RefreshCw, Plus } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';
import { UsersTable } from '../components/UsersTable';
import { UsersFiltersBar } from '../components/UsersFiltersBar';
import { UserDetailSheet } from '../components/UserDetailSheet';

export default function UsersListPage() {
    const {
        users,
        loading,
        error,
        totalCount,
        page,
        pageSize,
        filters,
        isExporting,
        setPage,
        updateFilters,
        updateUserStatus,
        fetchUsers,
        exportUsers,
    } = useUsers();

    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const handleViewDetails = (userId: string) => {
        setSelectedUserId(userId);
        setIsDetailOpen(true);
    };

    const handleExport = async () => {
        try {
            await exportUsers();
        } catch (err) {
            console.error('Export error:', err);
        }
    };

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">User Management</h2>
                    <p className="text-muted-foreground mt-1">
                        View, search, and manage all platform users
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        onClick={handleExport}
                        disabled={isExporting}
                    >
                        {isExporting ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                        ) : (
                            <Download className="w-4 h-4 mr-2" />
                        )}
                        {isExporting ? 'Exporting...' : 'Export'}
                    </Button>
                    <Button variant="outline" onClick={fetchUsers}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                    </Button>
                    <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0">
                        <Plus className="w-4 h-4 mr-2" />
                        Add User
                    </Button>
                </div>
            </div>

            {/* Filters & Table Card */}
            <Card className="border-none shadow-md">
                <CardContent className="p-6">
                    {/* Filters */}
                    <div className="mb-6">
                        <UsersFiltersBar
                            filters={filters}
                            onFiltersChange={updateFilters}
                            onSearch={fetchUsers}
                        />
                    </div>

                    {/* Table */}
                    {error && (
                        <div className="text-center py-12 rounded-lg border border-red-100 bg-red-50">
                            <p className="text-red-500 mb-4">{error}</p>
                            <Button onClick={fetchUsers} variant="outline" className="border-red-200 text-red-600 hover:bg-red-100">
                                Try Again
                            </Button>
                        </div>
                    )}

                    {loading && !error && (
                        <div className="text-center py-24">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                            <p className="text-gray-500 mt-4">Loading users...</p>
                        </div>
                    )}

                    {!loading && !error && users.length === 0 && (
                        <div className="text-center py-24 rounded-lg border-2 border-dashed border-gray-200">
                            <Users className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">No users found</h3>
                            <p className="text-gray-500 mt-1 max-w-sm mx-auto">
                                No users match your current filter criteria. Try adjusting your filters or search query.
                            </p>
                        </div>
                    )}

                    {!loading && !error && users.length > 0 && (
                        <>
                            <div className="rounded-md border border-gray-100 overflow-hidden">
                                <UsersTable
                                    users={users}
                                    onStatusChange={updateUserStatus}
                                    onViewDetails={handleViewDetails}
                                />
                            </div>

                            {/* Pagination */}
                            <div className="flex items-center justify-between mt-6 border-t border-gray-100 pt-6">
                                <p className="text-sm text-gray-500">
                                    Showing <span className="font-medium">{(page - 1) * pageSize + 1}</span> to <span className="font-medium">{Math.min(page * pageSize, totalCount)}</span> of <span className="font-medium">{totalCount}</span> users
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
                                        disabled={page * pageSize >= totalCount}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* User Detail Sheet */}
            <UserDetailSheet
                userId={selectedUserId}
                open={isDetailOpen}
                onOpenChange={setIsDetailOpen}
            />
        </div>
    );
}
