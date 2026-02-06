import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

interface ColorPickerProps {
    value: string;
    onChange: (value: string) => void;
}

const PRESET_COLORS = [
    '#4F46E5', '#6366F1', '#818CF8', // Indigo
    '#10B981', '#34D399', '#6EE7B7', // Green
    '#3B82F6', '#60A5FA', '#93C5FD', // Blue
    '#8B5CF6', '#A78BFA', '#C4B5FD', // Purple
    '#FB923C', '#FDBA74', '#FED7AA', // Orange
    '#F43F5E', '#FB7185', '#FDA4AF', // Rose
];

export function ColorPicker({ value, onChange }: ColorPickerProps) {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    type="button"
                >
                    <div
                        className="h-6 w-6 rounded border"
                        style={{ backgroundColor: value }}
                    />
                    <span className="font-mono text-sm">{value}</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Hex Color</label>
                        <Input
                            value={value}
                            onChange={(e) => onChange(e.target.value.toUpperCase())}
                            placeholder="#4F46E5"
                            className="font-mono mt-2"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Presets</label>
                        <div className="grid grid-cols-6 gap-2 mt-2">
                            {PRESET_COLORS.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    className="h-8 w-8 rounded border-2 hover:scale-110 transition-transform"
                                    style={{
                                        backgroundColor: color,
                                        borderColor: value === color ? '#000' : 'transparent',
                                    }}
                                    onClick={() => {
                                        onChange(color);
                                        setOpen(false);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
