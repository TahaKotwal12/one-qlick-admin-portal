import { useState, useEffect } from 'react';
import { supportApi } from '../api/support.api';
import type { SupportTicket, TicketStatus } from '../types';
import {
    TicketStatus as TicketStatusConst,
    TicketPriority as TicketPriorityConst
} from '../types';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { MessageSquare, Filter } from 'lucide-react';
import { toast } from 'sonner';

const statusMap: Record<TicketStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
    "open": { label: "Open", variant: "destructive" },
    "in_progress": { label: "In Progress", variant: "secondary" },
    "resolved": { label: "Resolved", variant: "default" },
    "closed": { label: "Closed", variant: "outline" },
};

const SupportTicketsPage = () => {
    const navigate = useNavigate();
    const [tickets, setTickets] = useState<SupportTicket[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<TicketStatus | "ALL">("ALL");
    const [page, setPage] = useState(1);
    const [, setTotalPages] = useState(1);

    const fetchTickets = async () => {
        try {
            setLoading(true);
            const data = await supportApi.getTickets(page, 10, statusFilter === "ALL" ? undefined : statusFilter);
            setTickets(data.tickets);
            setTotalPages(data.total_pages);
        } catch (error) {
            toast.error("Failed to fetch tickets");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, [page, statusFilter]);

    return (
        <div className="space-y-6 p-6 font-sans">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 italic">Support Tickets</h1>
                    <p className="text-muted-foreground">Manage and respond to customer inquiries</p>
                </div>
                <div className="flex items-center gap-4">
                    <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v as any); setPage(1); }}>
                        <SelectTrigger className="w-[200px] bg-white border-slate-200 shadow-sm transition-all focus:ring-2 focus:ring-indigo-500/20">
                            <Filter className="mr-2 h-4 w-4 text-slate-500" />
                            <SelectValue placeholder="Filter by Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All Status</SelectItem>
                            <SelectItem value={TicketStatusConst.OPEN}>Open</SelectItem>
                            <SelectItem value={TicketStatusConst.IN_PROGRESS}>In Progress</SelectItem>
                            <SelectItem value={TicketStatusConst.RESOLVED}>Resolved</SelectItem>
                            <SelectItem value={TicketStatusConst.CLOSED}>Closed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Card className="border-none shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm">
                <CardHeader className="bg-slate-50/50 border-b">
                    <CardTitle className="text-lg font-semibold text-slate-800">Support Inflow</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50/30">
                            <TableRow>
                                <TableHead className="w-[30%]">Subject</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Priority</TableHead>
                                <TableHead>Last Updated</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-12">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="h-6 w-6 border-2 border-indigo-500 border-t-transparent animate-spin rounded-full"></div>
                                            <span className="text-sm text-muted-foreground">Fetching records...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : tickets.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                                        No support tickets match your filter criteria.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                tickets.map((ticket) => (
                                    <TableRow key={ticket.ticket_id} className="hover:bg-indigo-50/30 transition-colors">
                                        <TableCell className="font-medium">
                                            <div className="flex flex-col">
                                                <span className="text-slate-900 group-hover:text-indigo-600 transition-colors">{ticket.subject}</span>
                                                <span className="text-[10px] text-muted-foreground font-mono">#{ticket.ticket_id.split('-')[0]}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="capitalize text-slate-600 italic">{ticket.category.replace('_', ' ')}</TableCell>
                                        <TableCell>
                                            <Badge variant={statusMap[ticket.status].variant} className="shadow-none">
                                                {statusMap[ticket.status].label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={ticket.priority === TicketPriorityConst.URGENT ? "destructive" : "secondary"} className="bg-opacity-10 shadow-none">
                                                {ticket.priority.toUpperCase()}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-slate-500 text-sm">{format(new Date(ticket.updated_at), 'MMM dd, HH:mm')}</TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => navigate(`/support/${ticket.ticket_id}`)}
                                                className="hover:bg-indigo-100 hover:text-indigo-700 font-semibold"
                                            >
                                                <MessageSquare className="mr-2 h-4 w-4" />
                                                RESPOND
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default SupportTicketsPage;
