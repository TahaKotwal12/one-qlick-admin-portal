import { useQuery } from '@tanstack/react-query';
import { reviewsApi } from '@/api/reviews.api';

const QUERY_KEYS = {
    responses: (formId?: string) => ['review-responses', formId] as const,
};

export const useReviewResponses = (formId?: string) => {
    return useQuery({
        queryKey: QUERY_KEYS.responses(formId),
        queryFn: () => reviewsApi.getResponses(formId),
    });
};
