import { usePage } from '@inertiajs/react';
import { InertiaSharedProps } from '@/types';


export default function useTypedPage() {
    return usePage() as {
        props: {
            auth: {
                user: any;
            };
            flash: {
                success?: string;
                error?: string;
                warning?: string;
            };
        };
    };
}
