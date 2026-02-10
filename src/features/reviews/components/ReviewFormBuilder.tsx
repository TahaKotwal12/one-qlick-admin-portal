import { useFieldArray } from 'react-hook-form';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';

interface ReviewFormBuilderProps {
    control: any;
}

export function ReviewFormBuilder({ control }: ReviewFormBuilderProps) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'fields',
    });

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Form Fields</h3>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({
                        id: crypto.randomUUID(),
                        type: 'star_rating',
                        label: '',
                        required: true
                    })}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Field
                </Button>
            </div>

            {fields.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed rounded-lg text-muted-foreground font-medium">
                    No fields added yet. Click "Add Field" to start building your form.
                </div>
            )}

            <div className="space-y-3">
                {fields.map((field, index) => (
                    <Card key={field.id} className="relative group">
                        <CardContent className="p-4 flex gap-4">
                            <div className="mt-2 text-muted-foreground">
                                <GripVertical className="h-5 w-5 cursor-grab" />
                            </div>

                            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4">
                                <div className="md:col-span-3">
                                    <FormField
                                        control={control}
                                        name={`fields.${index}.type`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs">Type</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="star_rating">Star Rating</SelectItem>
                                                        <SelectItem value="text_area">Text Area</SelectItem>
                                                        <SelectItem value="text_input">Text Input</SelectItem>
                                                        <SelectItem value="select">Select Menu</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="md:col-span-6">
                                    <FormField
                                        control={control}
                                        name={`fields.${index}.label`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs">Question Label</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="E.g. How would you rate our app?" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="md:col-span-2 flex items-center justify-center pt-5">
                                    <FormField
                                        control={control}
                                        name={`fields.${index}.required`}
                                        render={({ field }) => (
                                            <FormItem className="flex items-center gap-2 space-y-0">
                                                <FormControl>
                                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <FormLabel className="text-xs cursor-pointer">Required</FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="md:col-span-1 flex items-center justify-end pt-5">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => remove(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
