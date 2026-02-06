import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CouponForm } from '../components/CouponForm';
import { useCreateCoupon } from '../hooks/useCoupons';
import type { CreateCouponRequest } from '../types';

export default function CreateCouponPage() {
    const navigate = useNavigate();
    const createMutation = useCreateCoupon();

    const handleSubmit = async (data: CreateCouponRequest) => {
        await createMutation.mutateAsync(data);
        navigate('/coupons');
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="border-b bg-background px-6 py-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate('/coupons')}
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">Create Coupon</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Create a new discount coupon
                        </p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="flex-1 overflow-auto px-6 py-6">
                <CouponForm
                    onSubmit={handleSubmit}
                    isLoading={createMutation.isPending}
                />
            </div>
        </div>
    );
}
