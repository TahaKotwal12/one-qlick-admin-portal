import { useParams, useNavigate } from 'react-router-dom';
import { useDeliveryPartner } from '../api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Bike, UserCircle } from 'lucide-react';

export default function DeliveryPartnerDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: partner, isLoading, error } = useDeliveryPartner(id || '');

    if (isLoading) return <div className="p-8">Loading details...</div>;
    if (error || !partner) return <div className="p-8 text-red-500">Failed to load partner details.</div>;

    return (
        <div className="p-8 space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate('/delivery-partners')}>
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <h2 className="text-2xl font-bold">{partner.first_name} {partner.last_name}</h2>
                </div>
                {/* THIS BUTTON NAVIGATES TO THE NEW EDIT PAGE */}
                <Button onClick={() => navigate(`/delivery-partners/${partner.delivery_partner_id}/edit`)}>
                    <Edit className="w-4 h-4 mr-2" /> Edit Partner
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center text-lg"><UserCircle className="w-5 h-5 mr-2" /> Contact</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500">Email Address</p>
                            <p className="font-medium">{partner.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Phone Number</p>
                            <p className="font-medium">{partner.phone}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Address</p>
                            <p className="font-medium text-sm leading-relaxed max-w-[250px]">{partner.address || 'No address provided'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Current Status</p>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize mt-1
                                ${partner.availability_status === 'available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                {partner.availability_status}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center text-lg"><Bike className="w-5 h-5 mr-2" /> Vehicle Info</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-500">Vehicle Type</span>
                            <span className="font-medium capitalize">{partner.vehicle_type}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-500">Plate Number</span>
                            <span className="font-medium">{partner.vehicle_number}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-500">License Number</span>
                            <span className="font-medium">{partner.license_number}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-500">Total Deliveries Completed</span>
                            <span className="font-medium text-indigo-600">{partner.total_deliveries} times</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
