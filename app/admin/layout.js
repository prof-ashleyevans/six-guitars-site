export const metadata = {
    title: 'Admin – 6 Guitars',
    description: 'Manage tour dates',
};

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            {children}
        </div>
    );
}
