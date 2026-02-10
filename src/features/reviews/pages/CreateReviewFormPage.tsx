import { useNavigate } from 'react-router-dom';
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
import { useCreateReviewForm } from '../hooks/useReviewForms';
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

export default function CreateReviewFormPage() {
    const navigate = useNavigate();
    const { mutate: createForm, isPending } = useCreateReviewForm();

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

    const onSubmit = (data: ReviewFormValues) => {
        createForm(data as any, {
            onSuccess: () => navigate('/reviews'),
        });
    };

    return (
        <div className="flex flex-col h-full bg-muted/30">
            <div className="border-b bg-background px-6 py-4">
                <h1 className="text-2xl font-bold">Create Review Form</h1>
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
                                                    <Input placeholder="E.g. App Satisfaction Survey" {...field} />
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
                                                    <Input placeholder="e.g. app-survey-2026" {...field} />
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
                                                <Textarea
                                                    placeholder="Tell users what this review is for..."
                                                    {...field}
                                                />
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
                                            <FormLabel>Initial Status</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="published">Published</SelectItem>
                                                    <SelectItem value="draft">Draft</SelectItem>
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
                                {isPending ? 'Creating...' : 'Create Form'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
