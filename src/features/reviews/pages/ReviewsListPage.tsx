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
import { useReviewForms } from '../hooks/useReviewForms';
import { ReviewFormsTable } from '../components/ReviewFormsTable';

export default function ReviewsListPage() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');

    const { data, isLoading } = useReviewForms(filterStatus === 'archived');

    const filteredForms = data?.data || [];

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="border-b bg-background px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Review Forms</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Create and manage dynamic review forms for the app
                        </p>
                    </div>
                    <Button onClick={() => navigate('/reviews/new')}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Form
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
                                placeholder="Search forms..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                    </div>

                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-[180px]">
                            <Filter className="h-4 w-4 mr-2" />
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Active Only</SelectItem>
                            <SelectItem value="archived">Including Archived</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto px-6 py-4">
                <ReviewFormsTable
                    forms={filteredForms}
                    isLoading={isLoading}
                    searchQuery={search}
                />
            </div>
        </div>
    );
}
