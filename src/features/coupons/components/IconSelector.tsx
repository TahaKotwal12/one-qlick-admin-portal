import { useState } from 'react';
import { Search } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { IconFlame, IconTruck, IconPercentage, IconWallet, IconToolsKitchen2, IconChevronRight } from '@tabler/icons-react';

interface IconSelectorProps {
    value: string;
    onChange: (value: string) => void;
}

const AVAILABLE_ICONS = [
    { name: 'fire', label: 'Fire', Icon: IconFlame },
    { name: 'truck-delivery', label: 'Delivery', Icon: IconTruck },
    { name: 'percent', label: 'Percent', Icon: IconPercentage },
    { name: 'wallet', label: 'Wallet', Icon: IconWallet },
    { name: 'food-variant', label: 'Food', Icon: IconToolsKitchen2 },
    { name: 'arrow-right', label: 'Arrow', Icon: IconChevronRight },
];

export function IconSelector({ value, onChange }: IconSelectorProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');

    const selectedIcon = AVAILABLE_ICONS.find((icon) => icon.name === value);
    const SelectedIconComponent = selectedIcon?.Icon || IconPercentage;

    const filteredIcons = AVAILABLE_ICONS.filter((icon) =>
        icon.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start gap-2" type="button">
                        <SelectedIconComponent className="h-5 w-5" />
                        <span>{selectedIcon?.label || 'Select icon'}</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0">
                    <div className="p-3 border-b">
                        <div className="relative">
                            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search icons..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                    </div>
                    <ScrollArea className="h-72">
                        <div className="p-3 grid grid-cols-3 gap-2">
                            {filteredIcons.map((icon) => {
                                const IconComponent = icon.Icon;
                                return (
                                    <button
                                        key={icon.name}
                                        type="button"
                                        className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all hover:border-primary hover:bg-accent ${value === icon.name ? 'border-primary bg-accent' : 'border-transparent'
                                            }`}
                                        onClick={() => {
                                            onChange(icon.name);
                                            setOpen(false);
                                        }}
                                    >
                                        <IconComponent className="h-6 w-6" />
                                        <span className="text-xs font-medium text-center">{icon.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </ScrollArea>
                </PopoverContent>
            </Popover>

            {/* Quick Reference */}
            <div className="text-xs text-muted-foreground">
                <span className="font-medium">Available icons:</span> Fire, Delivery, Percent, Wallet, Food, Arrow
            </div>
        </div>
    );
}
