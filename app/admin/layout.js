import { redirect } from 'next/navigation';

export const metadata = {
    title: 'Admin – 6 Guitars',
    description: 'Manage tour dates',
};

/** Admin dashboard is disabled for now. Redirect to home. Re-enable by restoring the layout to render {children}. */
export default function AdminLayout() {
    redirect('/');
}
