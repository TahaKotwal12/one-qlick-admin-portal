export const TicketCategory = {
    ORDER_ISSUE: "order_issue",
    PAYMENT: "payment",
    APP_FEEDBACK: "app_feedback",
    TECHNICAL_ISSUE: "technical_issue",
    OTHER: "other"
} as const;

export type TicketCategory = typeof TicketCategory[keyof typeof TicketCategory];

export const TicketStatus = {
    OPEN: "open",
    IN_PROGRESS: "in_progress",
    RESOLVED: "resolved",
    CLOSED: "closed"
} as const;

export type TicketStatus = typeof TicketStatus[keyof typeof TicketStatus];

export const TicketPriority = {
    LOW: "low",
    MEDIUM: "medium",
    HIGH: "high",
    URGENT: "urgent"
} as const;

export type TicketPriority = typeof TicketPriority[keyof typeof TicketPriority];

export const SupportSenderType = {
    CUSTOMER: "customer",
    PARTNER: "partner",
    ADMIN: "admin",
    SYSTEM: "system"
} as const;

export type SupportSenderType = typeof SupportSenderType[keyof typeof SupportSenderType];

export interface SupportMessage {
    message_id: string;
    ticket_id: string;
    sender_id: string;
    sender_type: SupportSenderType;
    content: string;
    attachment_url?: string;
    is_read: boolean;
    created_at: string;
}

export interface SupportTicket {
    ticket_id: string;
    user_id: string;
    order_id?: string;
    subject: string;
    category: TicketCategory;
    status: TicketStatus;
    priority: TicketPriority;
    created_at: string;
    updated_at: string;
}

export interface SupportTicketDetail extends SupportTicket {
    messages: SupportMessage[];
}

export interface TicketListResponse {
    tickets: SupportTicket[];
    total: number;
    page: number;
    page_size: number;
    total_pages: number;
}

export interface SupportStats {
    total_tickets: number;
    open_tickets: number;
    in_progress_tickets: number;
    resolved_tickets: number;
    tickets_by_category: Record<string, number>;
    avg_resolution_time?: number;
}
