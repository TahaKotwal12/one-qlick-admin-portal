import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const OrdersFiltersBar = ({ filters, onFiltersChange }: any) => {
    return (
        <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            {/* Location Filter */}
            <div className="relative flex-1 min-w-[200px]">
                <Input
                    placeholder="City or State..."
                    value={filters.location}
                    onChange={(e) => onFiltersChange({ location: e.target.value })}
                    className="max-w-[200px]"
                />
            </div>

            {/* Price Range */}
            <div className="flex items-center space-x-2">
                <Input
                    type="number"
                    placeholder="Min Price"
                    value={filters.min_price}
                    onChange={(e) => onFiltersChange({ min_price: e.target.value })}
                    className="w-24"
                />
                <span className="text-gray-400">-</span>
                <Input
                    type="number"
                    placeholder="Max Price"
                    value={filters.max_price}
                    onChange={(e) => onFiltersChange({ max_price: e.target.value })}
                    className="w-24"
                />
            </div>

            {/* Status Dropdown */}
            <Select
                value={filters.status_filter}
                onValueChange={(val) => onFiltersChange({ status_filter: val })}
            >
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};
