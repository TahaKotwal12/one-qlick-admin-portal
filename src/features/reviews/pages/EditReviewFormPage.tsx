import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useReviewForms, useUpdateReviewForm } from '../hooks/useReviewForms';
import { ReviewFormBuilder } from '../components/ReviewFormBuilder';

const reviewFormSchema = z.object({
    title: z.string().min(3).max(255),
    slug: z.string().min(3).max(100).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
    description: z.string().optional(),
    status: z.enum(['draft', 'published', 'archived']),
    fields: z.array(z.object({
        id: z.string(),
        type: z.string(),
        label: z.string().min(1, 'Label is required'),
        required: z.boolean(),
        options: z.array(z.string()).optional(),
    })).min(1, 'Add at least one field'),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

export default function EditReviewFormPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // We fetch all to find the one we need since we don't have a direct GET BY ID yet
    // (though we implemented repository.get_form, the service/api uses slug)
    // Actually, I'll just use the list for now or assumed the backend supports GET by ID 
    // since I added FORM_UPDATE(id) in endpoints.
    // For simplicity, let's fetch all forms.
    const { data: formsData, isLoading } = useReviewForms(true);
    const { mutate: updateForm, isPending } = useUpdateReviewForm();

    const currentForm = formsData?.data.find(f => f.id === id);

    const form = useForm<ReviewFormValues>({
        resolver: zodResolver(reviewFormSchema),
        defaultValues: {
            title: '',
            slug: '',
            description: '',
            status: 'published',
            fields: [],
        },
    });

    useEffect(() => {
        if (currentForm) {
            form.reset({
                title: currentForm.title,
                slug: currentForm.slug,
                description: currentForm.description || '',
                status: currentForm.status as any,
                fields: currentForm.fields as any[],
            });
        }
    }, [currentForm, form]);

    const onSubmit = (data: ReviewFormValues) => {
        if (!id) return;
        updateForm({ id, data: data as any }, {
            onSuccess: () => navigate('/reviews'),
        });
    };

    if (isLoading) {
        return <div className="p-8"><Skeleton className="h-10 w-1/4 mb-4" /><Skeleton className="h-64 w-full" /></div>;
    }

    if (!currentForm) {
        return <div className="p-8 text-center">Form not found</div>;
    }

    return (
        <div className="flex flex-col h-full bg-muted/30">
            <div className="border-b bg-background px-6 py-4">
                <h1 className="text-2xl font-bold">Edit Review Form</h1>
            </div>

            <div className="flex-1 overflow-auto p-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-6 pb-20">
                        <Card>
                            <CardHeader>
                                <CardTitle>General Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Form Title</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="slug"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Slug (Unique ID)</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem className="max-w-[200px]">
                                            <FormLabel>Status</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="published">Published</SelectItem>
                                                    <SelectItem value="draft">Draft</SelectItem>
                                                    <SelectItem value="archived">Archived</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <ReviewFormBuilder control={form.control} />
                                {form.formState.errors.fields?.message && (
                                    <p className="text-sm font-medium text-destructive mt-2">
                                        {form.formState.errors.fields.message}
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-3">
                            <Button type="button" variant="outline" onClick={() => navigate('/reviews')}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
