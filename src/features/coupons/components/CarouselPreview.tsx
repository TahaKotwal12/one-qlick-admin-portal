import { IconFlame, IconTruck, IconPercentage, IconWallet, IconToolsKitchen2, IconChevronRight } from '@tabler/icons-react';
import type { Coupon } from '../types';

interface CarouselPreviewProps {
    coupon: Partial<Coupon>;
}

const ICON_MAP: Record<string, any> = {
    'fire': IconFlame,
    'truck-delivery': IconTruck,
    'percent': IconPercentage,
    'wallet': IconWallet,
    'food-variant': IconToolsKitchen2,
    'arrow-right': IconChevronRight,
};

export function CarouselPreview({ coupon }: CarouselPreviewProps) {
    const IconComponent = ICON_MAP[coupon.carousel_icon || 'percent'] || IconPercentage;

    // Use carousel-specific values or fall back to main coupon values
    const title = coupon.carousel_title || coupon.title || 'Coupon Title';
    const subtitle = coupon.carousel_subtitle || 'Coupon Subtitle';
    const badge = coupon.carousel_badge || '';
    const actionText = coupon.carousel_action_text || 'Order Now';

    const gradientStart = coupon.carousel_gradient_start || '#4F46E5';
    const gradientMiddle = coupon.carousel_gradient_middle || '#6366F1';
    const gradientEnd = coupon.carousel_gradient_end || '#818CF8';

    return (
        <div className="w-full max-w-sm mx-auto">
            <div
                className="relative rounded-2xl p-6 text-white shadow-lg overflow-hidden"
                style={{
                    background: `linear-gradient(135deg, ${gradientStart} 0%, ${gradientMiddle} 50%, ${gradientEnd} 100%)`,
                }}
            >
                {/* Badge */}
                {badge && (
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-xs font-semibold">{badge}</span>
                    </div>
                )}

                {/* Icon */}
                <div className="mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <IconComponent className="h-6 w-6" />
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{title}</h3>
                    <p className="text-white/90 text-sm">{subtitle}</p>
                </div>

                {/* Action Button */}
                <button className="mt-6 w-full bg-white text-gray-900 font-semibold py-3 px-4 rounded-lg hover:bg-white/90 transition-colors">
                    {actionText}
                </button>

                {/* Decorative circles */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute -top-8 -left-8 w-24 h-24 bg-white/10 rounded-full blur-xl" />
            </div>

            {/* Live Update Indicator */}
            <div className="mt-2 text-center">
                <span className="text-xs text-muted-foreground">
                    ✨ Live Preview - Updates as you type
                </span>
            </div>
        </div>
    );
}
