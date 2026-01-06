import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import type { UsersFilters } from '../types';

interface UsersFiltersProps {
    filters: UsersFilters;
    onFiltersChange: (filters: Partial<UsersFilters>) => void;
    onSearch: () => void;
}

export function UsersFiltersBar({ filters, onFiltersChange, onSearch }: UsersFiltersProps) {
    return (
        <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder="Search by name, email, or phone..."
                        value={filters.search}
                        onChange={(e) => onFiltersChange({ search: e.target.value })}
                        onKeyPress={(e) => e.key === 'Enter' && onSearch()}
                        className="pl-10"
                    />
                </div>
            </div>
            <Select value={filters.role} onValueChange={(value) => onFiltersChange({ role: value })}>
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="restaurant_owner">Restaurant Owner</SelectItem>
                    <SelectItem value="delivery_partner">Delivery Partner</SelectItem>
                </SelectContent>
            </Select>
            <Select value={filters.status} onValueChange={(value) => onFiltersChange({ status: value })}>
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
            </Select>
            <Button onClick={onSearch}>
                <Filter className="w-4 h-4 mr-2" />
                Apply
            </Button>
        </div>
    );
}
