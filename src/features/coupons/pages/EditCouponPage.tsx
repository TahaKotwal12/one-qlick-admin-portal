import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { CouponForm } from '../components/CouponForm';
import { useCoupon, useUpdateCoupon } from '../hooks/useCoupons';
import type { UpdateCouponRequest } from '../types';

export default function EditCouponPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { data: coupon, isLoading } = useCoupon(id!);
    const updateMutation = useUpdateCoupon();

    const handleSubmit = async (data: UpdateCouponRequest) => {
        await updateMutation.mutateAsync({ id: id!, data });
        navigate('/coupons');
    };

    if (isLoading) {
        return (
            <div className="flex flex-col h-full">
                <div className="border-b bg-background px-6 py-4">
                    <Skeleton className="h-8 w-64" />
                </div>
                <div className="flex-1 overflow-auto px-6 py-6">
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} className="h-24 w-full" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!coupon) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Coupon not found</h2>
                    <Button onClick={() => navigate('/coupons')} className="mt-4">
                        Back to Coupons
                    </Button>
                </div>
            </div>
        );
    }

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
                        <h1 className="text-2xl font-bold">Edit Coupon</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Update coupon: {coupon.code}
                        </p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="flex-1 overflow-auto px-6 py-6">
                <CouponForm
                    initialValues={coupon}
                    onSubmit={handleSubmit}
                    isLoading={updateMutation.isPending}
                />
            </div>
        </div>
    );
}
