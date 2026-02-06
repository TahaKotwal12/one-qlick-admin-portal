import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CouponType } from '../types';
import type { CreateCouponRequest } from '../types';
import { CarouselPreview } from './CarouselPreview';
import { ColorPicker } from './ColorPicker';
import { IconSelector } from './IconSelector';

const couponSchema = z.object({
    code: z.string().min(3).max(50).regex(/^[A-Z0-9]+$/, 'Code must be uppercase letters and numbers only'),
    title: z.string().min(3).max(255),
    description: z.string().optional(),
    coupon_type: z.nativeEnum(CouponType),
    discount_value: z.number().min(0),
    min_order_amount: z.number().min(0),
    max_discount_amount: z.number().min(0).optional(),
    usage_limit: z.number().min(1).optional(),
    valid_from: z.string(),
    valid_until: z.string(),
    is_active: z.boolean(),

    // Carousel fields
    show_in_carousel: z.boolean(),
    carousel_priority: z.number().min(0).max(100),
    carousel_title: z.string().max(100).optional(),
    carousel_subtitle: z.string().max(100).optional(),
    carousel_badge: z.string().max(50).optional(),
    carousel_icon: z.string().max(50).optional(),
    carousel_gradient_start: z.string().regex(/^#[0-9A-F]{6}$/i),
    carousel_gradient_middle: z.string().regex(/^#[0-9A-F]{6}$/i),
    carousel_gradient_end: z.string().regex(/^#[0-9A-F]{6}$/i),
    carousel_action_text: z.string().max(50),
});

type CouponFormValues = z.infer<typeof couponSchema>;

interface CouponFormProps {
    initialValues?: Partial<CouponFormValues>;
    onSubmit: (data: CreateCouponRequest) => void;
    isLoading?: boolean;
}

export function CouponForm({ initialValues, onSubmit, isLoading }: CouponFormProps) {
    const navigate = useNavigate();

    const form = useForm<CouponFormValues>({
        resolver: zodResolver(couponSchema),
        defaultValues: {
            code: '',
            title: '',
            description: '',
            coupon_type: CouponType.PERCENTAGE,
            discount_value: 0,
            min_order_amount: 0,
            max_discount_amount: undefined,
            usage_limit: undefined,
            valid_from: new Date().toISOString().split('T')[0],
            valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            is_active: true,
            show_in_carousel: false,
            carousel_priority: 0,
            carousel_title: '',
            carousel_subtitle: '',
            carousel_badge: '',
            carousel_icon: 'percent',
            carousel_gradient_start: '#4F46E5',
            carousel_gradient_middle: '#6366F1',
            carousel_gradient_end: '#818CF8',
            carousel_action_text: 'Order Now',
            ...initialValues,
        },
    });

    const showInCarousel = form.watch('show_in_carousel');
    const formValues = form.watch();

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                                <CardDescription>Enter the basic coupon details</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Coupon Code</FormLabel>
                                            <FormControl>
                                                <Input placeholder="MEGA50" {...field} className="font-mono uppercase" />
                                            </FormControl>
                                            <FormDescription>
                                                Unique code users will enter (uppercase letters and numbers only)
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="50% OFF on first order" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Get 50% discount on your first order above ₹299"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        {/* Discount Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Discount Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="coupon_type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Type</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value={CouponType.PERCENTAGE}>Percentage</SelectItem>
                                                        <SelectItem value={CouponType.FIXED_AMOUNT}>Fixed Amount</SelectItem>
                                                        <SelectItem value={CouponType.FREE_DELIVERY}>Free Delivery</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="discount_value"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Discount Value</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        {...field}
                                                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="min_order_amount"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Min Order Amount (₹)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        {...field}
                                                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="max_discount_amount"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Max Discount (₹) - Optional</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        {...field}
                                                        value={field.value || ''}
                                                        onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="usage_limit"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Usage Limit - Optional</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                    value={field.value || ''}
                                                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Maximum number of times this coupon can be used
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        {/* Validity Period */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Validity Period</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="valid_from"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Valid From</FormLabel>
                                                <FormControl>
                                                    <Input type="date" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="valid_until"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Valid Until</FormLabel>
                                                <FormControl>
                                                    <Input type="date" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="is_active"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">Active</FormLabel>
                                                <FormDescription>
                                                    Make this coupon available for use
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        {/* Carousel Settings */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Carousel Settings</CardTitle>
                                <CardDescription>Display this coupon in the home screen carousel</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="show_in_carousel"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">Show in Carousel</FormLabel>
                                                <FormDescription>
                                                    Display this coupon in the home screen carousel
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                {showInCarousel && (
                                    <>
                                        <Separator />

                                        <FormField
                                            control={form.control}
                                            name="carousel_priority"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Priority (0-100)</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            min={0}
                                                            max={100}
                                                            {...field}
                                                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Higher priority coupons appear first (0 = lowest, 100 = highest)
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="carousel_title"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Carousel Title</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="MEGA SALE" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="carousel_subtitle"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Carousel Subtitle</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Up to 60% OFF" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="carousel_badge"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Badge Text</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="LIMITED TIME" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="carousel_action_text"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Action Button Text</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Order Now" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="carousel_icon"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Icon</FormLabel>
                                                    <FormControl>
                                                        <IconSelector value={field.value || ''} onChange={field.onChange} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="space-y-2">
                                            <FormLabel>Gradient Colors</FormLabel>
                                            <div className="grid grid-cols-3 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="carousel_gradient_start"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-sm text-muted-foreground">Start</FormLabel>
                                                            <FormControl>
                                                                <ColorPicker value={field.value} onChange={field.onChange} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="carousel_gradient_middle"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-sm text-muted-foreground">Middle</FormLabel>
                                                            <FormControl>
                                                                <ColorPicker value={field.value} onChange={field.onChange} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="carousel_gradient_end"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-sm text-muted-foreground">End</FormLabel>
                                                            <FormControl>
                                                                <ColorPicker value={field.value} onChange={field.onChange} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Preview Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Preview</CardTitle>
                                    <CardDescription>
                                        {showInCarousel ? 'Carousel preview' : 'Coupon preview'}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {showInCarousel ? (
                                        <CarouselPreview coupon={formValues as any} />
                                    ) : (
                                        <div className="text-sm text-muted-foreground text-center py-8">
                                            Enable carousel to see preview
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => navigate('/coupons')}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save Coupon'}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
