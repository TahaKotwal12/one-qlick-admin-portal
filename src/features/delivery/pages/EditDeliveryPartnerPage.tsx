import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDeliveryPartner, useUpdateDeliveryPartner } from '../api';
import { ArrowLeft, UserCircle } from 'lucide-react';
import { toast } from 'sonner';

const updateSchema = z.object({
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    vehicle_type: z.enum(['bicycle', 'motorcycle', 'car']),
    vehicle_number: z.string().min(1, 'Vehicle number is required'),
    license_number: z.string().min(1, 'License number is required'),
    availability_status: z.enum(['available', 'busy', 'offline']),
});

type UpdateFormValues = z.infer<typeof updateSchema>;

export default function EditDeliveryPartnerPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: partner, isLoading, error } = useDeliveryPartner(id || '');
    const updateMutation = useUpdateDeliveryPartner();

    const form = useForm<UpdateFormValues>({
        resolver: zodResolver(updateSchema),
        defaultValues: {
            first_name: '',
            last_name: '',
            phone: '',
            vehicle_type: 'motorcycle',
            vehicle_number: '',
            license_number: '',
            availability_status: 'offline',
        },
    });

    useEffect(() => {
        if (partner) {
            form.reset({
                first_name: partner.first_name || '',
                last_name: partner.last_name || '',
                phone: partner.phone || '',
                vehicle_type: (partner.vehicle_type as any) || 'motorcycle',
                vehicle_number: partner.vehicle_number || '',
                license_number: partner.license_number || '',
                availability_status: (partner.availability_status as any) || 'offline',
            });
        }
    }, [partner, form]);

    if (isLoading) return <div className="p-8">Loading...</div>;
    if (error || !partner) return <div className="p-8 text-red-500">Failed to load partner.</div>;

    const isDirty = form.formState.isDirty;

    const onSubmit = (data: UpdateFormValues) => {
        if (!isDirty) {
            navigate(`/delivery-partners/${id}`);
            return;
        }

        updateMutation.mutate(
            { id: partner.delivery_partner_id, data },
            {
                onSuccess: () => {
                    toast.success('Partner updated successfully!');
                    navigate(`/delivery-partners/${id}`);
                },
                onError: (error: any) => {
                    toast.error('Failed to update: ' + error?.message);
                }
            }
        );
    };

    const onInvalid = () => {
        toast.error('Please fix the highlighted errors in the form.');
    };

    return (
        <div className="p-8 space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" onClick={() => navigate(`/delivery-partners/${id}`)}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h2 className="text-2xl font-bold">Edit Delivery Partner</h2>
                    <p className="text-muted-foreground mt-1">Update {partner.first_name}'s details</p>
                </div>
            </div>

            <Card>
                <form onSubmit={form.handleSubmit(onSubmit, onInvalid)}>
                    <CardHeader>
                        <CardTitle className="flex items-center text-lg"><UserCircle className="w-5 h-5 mr-2" /> Partner Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 pb-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="mb-1 block">First Name</Label>
                                <Input {...form.register('first_name')} />
                                {form.formState.errors.first_name && <p className="text-red-500 text-xs mt-1">{form.formState.errors.first_name.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label className="mb-1 block">Last Name</Label>
                                <Input {...form.register('last_name')} />
                                {form.formState.errors.last_name && <p className="text-red-500 text-xs mt-1">{form.formState.errors.last_name.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="mb-1 block">Phone Number</Label>
                            <Input {...form.register('phone')} />
                            {form.formState.errors.phone && <p className="text-red-500 text-xs mt-1">{form.formState.errors.phone.message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 flex flex-col">
                                <Label className="mb-1 block">Vehicle Type</Label>
                                <Select onValueChange={(val) => form.setValue('vehicle_type', val as any, { shouldDirty: true, shouldValidate: true })} defaultValue={form.getValues('vehicle_type')} value={form.watch('vehicle_type')}>
                                    <SelectTrigger className="w-full"><SelectValue placeholder="Select vehicle type" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="bicycle">Bicycle</SelectItem>
                                        <SelectItem value="motorcycle">Motorcycle</SelectItem>
                                        <SelectItem value="car">Car</SelectItem>
                                    </SelectContent>
                                </Select>
                                {form.formState.errors.vehicle_type && <p className="text-red-500 text-xs mt-1">{form.formState.errors.vehicle_type.message}</p>}
                            </div>
                            <div className="space-y-2 flex flex-col">
                                <Label className="mb-1 block">Status</Label>
                                <Select onValueChange={(val) => form.setValue('availability_status', val as any, { shouldDirty: true, shouldValidate: true })} defaultValue={form.getValues('availability_status')} value={form.watch('availability_status')}>
                                    <SelectTrigger className="w-full"><SelectValue placeholder="Select status" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="available">Available</SelectItem>
                                        <SelectItem value="busy">Busy</SelectItem>
                                        <SelectItem value="offline">Offline</SelectItem>
                                    </SelectContent>
                                </Select>
                                {form.formState.errors.availability_status && <p className="text-red-500 text-xs mt-1">{form.formState.errors.availability_status.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="mb-1 block">Vehicle Plate Number</Label>
                            <Input {...form.register('vehicle_number')} />
                            {form.formState.errors.vehicle_number && <p className="text-red-500 text-xs mt-1">{form.formState.errors.vehicle_number.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label className="mb-1 block">License Number</Label>
                            <Input {...form.register('license_number')} />
                            {form.formState.errors.license_number && <p className="text-red-500 text-xs mt-1">{form.formState.errors.license_number.message}</p>}
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2 border-t pt-6">
                        <Button type="button" variant="outline" onClick={() => navigate(`/delivery-partners/${id}`)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={!isDirty || updateMutation.isPending}>
                            {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
