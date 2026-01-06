import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
    Mail,
    Phone,
    MapPin,
    Calendar,
    Shield,
    Award,
    Clock,
    User as UserIcon,
    AlertTriangle,
    CheckCircle,
    Copy,
    ExternalLink
} from 'lucide-react';
import { userService } from '../api/userService';
import type { User, Address } from '../types';

interface UserDetailSheetProps {
    userId: string | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function UserDetailSheet({ userId, open, onOpenChange }: UserDetailSheetProps) {
    const [user, setUser] = useState<User | null>(null);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (open && userId) {
            fetchUserDetails();
        } else {
            setUser(null);
            setAddresses([]);
        }
    }, [open, userId]);

    const fetchUserDetails = async () => {
        if (!userId) return;
        setLoading(true);
        setError(null);
        try {
            const [userData, addressData] = await Promise.all([
                userService.getUserById(userId),
                userService.getUserAddresses(userId)
            ]);
            setUser(userData);
            setAddresses(addressData);
        } catch (err) {
            setError('Failed to load user details');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-lg p-0 overflow-hidden flex flex-col h-full">
                {loading ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-4">
                        <div className="relative">
                            <div className="h-12 w-12 rounded-full border-4 border-slate-200"></div>
                            <div className="h-12 w-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin absolute inset-0"></div>
                        </div>
                        <p className="text-sm text-slate-600 font-medium">Loading user details...</p>
                    </div>
                ) : error ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                        <div className="rounded-full bg-red-50 p-4 mb-4">
                            <AlertTriangle className="h-8 w-8 text-red-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Unable to Load Profile</h3>
                        <p className="text-sm text-slate-500 mb-6 max-w-xs">{error}</p>
                        <Button onClick={fetchUserDetails} className="bg-indigo-600 hover:bg-indigo-700">
                            Try Again
                        </Button>
                    </div>
                ) : user ? (
                    <>
                        {/* Header Section */}
                        <div className="bg-gradient-to-br from-indigo-50 via-white to-violet-50 border-b flex-shrink-0">
                            <SheetHeader className="p-6 pb-0 text-center">
                                <SheetTitle className="sr-only">User Profile</SheetTitle>

                                <div className="flex flex-col items-center">
                                    <div className="relative mb-5">
                                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-violet-400 rounded-full blur-lg opacity-20 animate-pulse"></div>
                                        <Avatar className="relative h-28 w-28 border-4 border-white shadow-xl ring-4 ring-slate-100">
                                            <AvatarImage src={user.profile_image} className="object-cover" />
                                            <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-violet-600 text-white text-3xl font-bold">
                                                {user.first_name?.[0]}{user.last_name?.[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className={`absolute bottom-1 right-1 h-7 w-7 rounded-full border-4 border-white shadow-lg ${
                                            user.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'
                                        }`} title={user.status}>
                                            <div className={`absolute inset-0 rounded-full ${user.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'} animate-ping opacity-75`}></div>
                                        </div>
                                    </div>

                                    <h2 className="text-2xl font-bold text-slate-900 mb-1">
                                        {user.first_name} {user.last_name}
                                    </h2>
                                    <p className="text-sm text-slate-600 mb-4">{user.email}</p>

                                    <div className="flex items-center gap-2 flex-wrap justify-center">
                                        <Badge className="px-3 py-1.5 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-0 font-medium">
                                            <Shield className="w-3.5 h-3.5 mr-1.5" />
                                            <span className="capitalize">{user.role?.replace('_', ' ')}</span>
                                        </Badge>
                                        {user.phone_verified && (
                                            <Badge className="px-3 py-1.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-0 font-medium">
                                                <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                                                Verified
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </SheetHeader>

                            {/* Stats Row */}
                            <div className="grid grid-cols-2 gap-4 p-6 pt-8">
                                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 text-center">
                                    <div className="flex items-center justify-center gap-2 text-slate-500 mb-2">
                                        <Award className="w-4 h-4" />
                                        <span className="text-xs font-semibold uppercase tracking-wider">Loyalty Points</span>
                                    </div>
                                    <span className="text-3xl font-bold text-slate-900">{user.loyalty_points || 0}</span>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 text-center">
                                    <div className="flex items-center justify-center gap-2 text-slate-500 mb-2">
                                        <Calendar className="w-4 h-4" />
                                        <span className="text-xs font-semibold uppercase tracking-wider">Member Since</span>
                                    </div>
                                    <span className="text-3xl font-bold text-slate-900">
                                        {new Date(user.created_at).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto bg-slate-50">
                            <Tabs defaultValue="overview" className="w-full">
                                <div className="px-6 pt-6 pb-4 bg-slate-50 sticky top-0 z-10">
                                    <TabsList className="w-full grid grid-cols-3 h-11 bg-white shadow-sm">
                                        <TabsTrigger value="overview" className="font-medium data-[state=active]:bg-indigo-600 data-[state=active]:text-white">Overview</TabsTrigger>
                                        <TabsTrigger value="addresses" className="font-medium data-[state=active]:bg-indigo-600 data-[state=active]:text-white">Addresses</TabsTrigger>
                                        <TabsTrigger value="activity" className="font-medium data-[state=active]:bg-indigo-600 data-[state=active]:text-white">Activity</TabsTrigger>
                                    </TabsList>
                                </div>

                                <div className="px-6 pb-8">
                                    <TabsContent value="overview" className="space-y-5 mt-0 outline-none">
                                        {/* Contact Card */}
                                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                                            <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200">
                                                <h3 className="text-sm font-semibold text-slate-700">Contact Information</h3>
                                            </div>
                                            <div className="divide-y divide-slate-100">
                                                <div className="p-5 hover:bg-slate-50 transition-colors group">
                                                    <div className="flex items-start gap-4">
                                                        <div className="rounded-lg bg-blue-100 p-2.5 text-blue-600 shrink-0">
                                                            <Mail className="w-5 h-5" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Email Address</p>
                                                            <div className="flex items-center gap-2">
                                                                <p className="text-sm font-medium text-slate-900 truncate">{user.email}</p>
                                                                {user.email_verified && (
                                                                    <div className="shrink-0">
                                                                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <Button 
                                                            variant="ghost" 
                                                            size="icon" 
                                                            className="h-9 w-9 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-slate-600 hover:bg-slate-100" 
                                                            onClick={() => navigator.clipboard.writeText(user.email)}
                                                        >
                                                            <Copy className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>

                                                <div className="p-5 hover:bg-slate-50 transition-colors group">
                                                    <div className="flex items-start gap-4">
                                                        <div className="rounded-lg bg-emerald-100 p-2.5 text-emerald-600 shrink-0">
                                                            <Phone className="w-5 h-5" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Phone Number</p>
                                                            <div className="flex items-center gap-2">
                                                                <p className="text-sm font-medium text-slate-900">{user.phone}</p>
                                                                {user.phone_verified && (
                                                                    <div className="shrink-0">
                                                                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="p-5 hover:bg-slate-50 transition-colors group">
                                                    <div className="flex items-start gap-4">
                                                        <div className="rounded-lg bg-violet-100 p-2.5 text-violet-600 shrink-0">
                                                            <UserIcon className="w-5 h-5" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">User ID</p>
                                                            <p className="text-sm font-mono text-slate-700 break-all">{user.user_id}</p>
                                                        </div>
                                                        <Button 
                                                            variant="ghost" 
                                                            size="icon" 
                                                            className="h-9 w-9 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-slate-600 hover:bg-slate-100" 
                                                            onClick={() => navigator.clipboard.writeText(user.user_id)}
                                                        >
                                                            <Copy className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="addresses" className="mt-0 outline-none">
                                        {addresses.length > 0 ? (
                                            <div className="space-y-4">
                                                {addresses.map((addr) => (
                                                    <div key={addr.address_id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-200 overflow-hidden">
                                                        <div className="p-5">
                                                            <div className="flex items-center justify-between mb-4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className={`rounded-lg p-2 ${
                                                                        addr.address_type === 'home' 
                                                                            ? 'bg-blue-100 text-blue-600' 
                                                                            : 'bg-orange-100 text-orange-600'
                                                                    }`}>
                                                                        <MapPin className="w-4 h-4" />
                                                                    </div>
                                                                    <span className="font-semibold text-slate-900">{addr.title}</span>
                                                                </div>
                                                                {addr.is_default && (
                                                                    <Badge className="px-2.5 py-1 bg-indigo-100 text-indigo-700 border-0 text-xs font-semibold">
                                                                        Default
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <div className="ml-11 space-y-1">
                                                                <p className="text-sm text-slate-600 leading-relaxed">
                                                                    {addr.address_line1}
                                                                    {addr.address_line2 && <span>, {addr.address_line2}</span>}
                                                                </p>
                                                                <p className="text-sm font-medium text-slate-900">
                                                                    {addr.city}, {addr.state} {addr.postal_code}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center py-16 px-6 bg-white rounded-xl border-2 border-dashed border-slate-200">
                                                <div className="rounded-full bg-slate-100 p-4 mb-4">
                                                    <MapPin className="w-8 h-8 text-slate-400" />
                                                </div>
                                                <p className="text-base font-semibold text-slate-900 mb-1">No Addresses Found</p>
                                                <p className="text-sm text-slate-500 text-center max-w-xs">
                                                    This user hasn't added any shipping or billing addresses yet.
                                                </p>
                                            </div>
                                        )}
                                    </TabsContent>

                                    <TabsContent value="activity" className="mt-0 outline-none">
                                        <div className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-xl border-2 border-dashed border-slate-200">
                                            <div className="rounded-full bg-slate-100 p-4 mb-4">
                                                <Clock className="w-8 h-8 text-slate-400" />
                                            </div>
                                            <p className="text-base font-semibold text-slate-900 mb-1">Activity History</p>
                                            <p className="text-sm text-slate-500 text-center max-w-xs">
                                                Recent orders and user actions will appear here.
                                            </p>
                                        </div>
                                    </TabsContent>
                                </div>
                            </Tabs>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-slate-500">No user selected</p>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}