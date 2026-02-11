import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useReviewResponses } from '../hooks/useReviewResponses';
import { ReviewResponsesTable } from '../components/ReviewResponsesTable';
import { useReviewForms } from '../hooks/useReviewForms';

export default function ReviewResponsesPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Fetch all forms to find the title of this one
    const { data: formsData } = useReviewForms(true);
    const currentForm = formsData?.data.find(f => f.id === id);

    const { data: responsesData, isLoading } = useReviewResponses(id);
    const responses = responsesData?.data || [];

    const handleExport = () => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(responses, null, 2)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = `responses-${currentForm?.slug || id}.json`;
        link.click();
    };

    return (
        <div className="flex flex-col h-full">
            <div className="border-b bg-background px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => navigate('/reviews')}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">Responses</h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                {currentForm ? `Feedback for: ${currentForm.title}` : 'Viewing all feedback'}
                            </p>
                        </div>
                    </div>
                    <Button variant="outline" onClick={handleExport} disabled={responses.length === 0}>
                        <Download className="h-4 w-4 mr-2" />
                        Export JSON
                    </Button>
                </div>
            </div>

            <div className="flex-1 overflow-auto px-6 py-4">
                <ReviewResponsesTable
                    responses={responses}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}
