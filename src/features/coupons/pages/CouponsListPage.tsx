import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useCoupons } from '../hooks/useCoupons';
import { CouponsTable } from '../components/CouponsTable';

export default function CouponsListPage() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [filterActive, setFilterActive] = useState<string>('all');
    const [filterCarousel, setFilterCarousel] = useState<string>('all');

    const { data, isLoading } = useCoupons({
        is_active: filterActive === 'all' ? undefined : filterActive === 'active',
        show_in_carousel: filterCarousel === 'all' ? undefined : filterCarousel === 'carousel',
    });

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="border-b bg-background px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Coupons</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Manage discount coupons and carousel promotions
                        </p>
                    </div>
                    <Button onClick={() => navigate('/coupons/new')}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Coupon
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <div className="border-b bg-background px-6 py-4">
                <div className="flex items-center gap-4">
                    <div className="flex-1 max-w-sm">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search coupons..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                    </div>

                    <Select value={filterActive} onValueChange={setFilterActive}>
                        <SelectTrigger className="w-[180px]">
                            <Filter className="h-4 w-4 mr-2" />
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={filterCarousel} onValueChange={setFilterCarousel}>
                        <SelectTrigger className="w-[180px]">
                            <Filter className="h-4 w-4 mr-2" />
                            <SelectValue placeholder="Carousel" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Coupons</SelectItem>
                            <SelectItem value="carousel">In Carousel</SelectItem>
                            <SelectItem value="not-carousel">Not in Carousel</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto px-6 py-4">
                <CouponsTable
                    coupons={data?.coupons || []}
                    isLoading={isLoading}
                    searchQuery={search}
                />
            </div>
        </div>
    );
}
