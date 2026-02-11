import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supportApi } from '../api/support.api';
import type { SupportTicketDetail } from '../types';
import { SupportSenderType as SupportSenderTypeConst } from '../types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { ChevronLeft, Send, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const SupportChatPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState<SupportTicketDetail | null>(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const fetchDetails = async () => {
        if (!id) return;
        try {
            const data = await supportApi.getTicketDetails(id);
            setTicket(data);
        } catch (error) {
            toast.error("Failed to fetch ticket details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [id]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [ticket?.messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id || !message.trim()) return;

        try {
            setSending(true);
            const newMessage = await supportApi.sendMessage(id, message);
            setTicket(prev => prev ? { ...prev, messages: [...prev.messages, newMessage] } : null);
            setMessage("");
        } catch (error) {
            toast.error("Failed to send message");
        } finally {
            setSending(false);
        }
    };

    const handleResolve = async () => {
        if (!id) return;
        try {
            await supportApi.resolveTicket(id);
            toast.success("Ticket marked as resolved");
            fetchDetails();
        } catch (error) {
            toast.error("Failed to resolve ticket");
        }
    };

    if (loading) return <div className="p-10 text-center">Loading chat...</div>;
    if (!ticket) return <div className="p-10 text-center">Ticket not found</div>;

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] p-6 gap-6">
            <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={() => navigate('/support')}>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back to Tickets
                </Button>
                <div className="flex items-center gap-4">
                    {ticket.status !== "resolved" && (
                        <Button variant="outline" size="sm" onClick={handleResolve}>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Mark as Resolved
                        </Button>
                    )}
                    <Badge variant={ticket.status === "open" ? "destructive" : "secondary"}>
                        {ticket.status.toUpperCase()}
                    </Badge>
                </div>
            </div>

            <div className="flex gap-6 flex-1 min-h-0">
                {/* Chat Section */}
                <Card className="flex-1 flex flex-col min-h-0 overflow-hidden">
                    <CardHeader className="border-b">
                        <CardTitle className="flex justify-between items-center">
                            <span>{ticket.subject}</span>
                            <span className="text-sm font-normal text-muted-foreground">ID: {ticket.ticket_id}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 min-h-0">
                        <ScrollArea className="h-full">
                            <div className="p-4 space-y-4">
                                {ticket.messages.map((msg) => (
                                    <div
                                        key={msg.message_id}
                                        className={`flex ${msg.sender_type === SupportSenderTypeConst.ADMIN ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-[80%] p-3 rounded-lg ${msg.sender_type === SupportSenderTypeConst.ADMIN
                                                ? 'bg-indigo-600 text-white rounded-br-none'
                                                : 'bg-slate-100 text-slate-900 rounded-bl-none'
                                            }`}>
                                            <p className="text-sm">{msg.content}</p>
                                            <span className="text-[10px] opacity-70 mt-1 block">
                                                {format(new Date(msg.created_at), 'HH:mm')}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                <div ref={scrollRef} />
                            </div>
                        </ScrollArea>
                    </CardContent>
                    <CardFooter className="border-t p-4 mt-auto">
                        <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                            <Input
                                placeholder="Type your response..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                disabled={sending || ticket.status === "closed"}
                            />
                            <Button type="submit" disabled={sending || !message.trim() || ticket.status === "closed"}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>

                {/* Sidebar Info */}
                <Card className="w-80 border-none bg-transparent shadow-none">
                    <CardHeader className="px-0 pt-0">
                        <CardTitle className="text-lg">Ticket Context</CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 space-y-4">
                        <div className="bg-white p-4 rounded-lg border">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Customer</p>
                            <p className="text-sm font-mono truncate">{ticket.user_id}</p>
                        </div>
                        {ticket.order_id && (
                            <div className="bg-white p-4 rounded-lg border">
                                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Order Ref</p>
                                <Button variant="link" className="p-0 h-auto text-sm" onClick={() => navigate(`/orders/${ticket.order_id}`)}>
                                    {ticket.order_id}
                                </Button>
                            </div>
                        )}
                        <div className="bg-white p-4 rounded-lg border">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Category</p>
                            <p className="text-sm capitalize">{ticket.category.replace('_', ' ')}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Opened On</p>
                            <p className="text-sm">{format(new Date(ticket.created_at), 'PPP p')}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SupportChatPage;
