export type ReviewFieldType = 'star_rating' | 'text_area' | 'text_input' | 'select' | 'checkbox';

export interface ReviewField {
    id: string;
    type: ReviewFieldType;
    label: string;
    required: boolean;
    options?: string[]; // For select/checkbox
    validation?: Record<string, any>;
}

export interface ReviewForm {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    fields: ReviewField[];
    status: 'draft' | 'published' | 'archived';
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export type ReviewFormCreate = Omit<ReviewForm, 'id' | 'created_at' | 'updated_at' | 'is_active'>;
export type ReviewFormUpdate = Partial<ReviewFormCreate> & { is_active?: boolean };

export interface ReviewResponse {
    id: string;
    user_id: string;
    form_id: string;
    response_data: Record<string, any>;
    created_at: string;
}

export interface ApiResponse<T> {
    code: number;
    message: string;
    message_id: string;
    data: T;
}
