export default async function StoresLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="w-full flex flex-col">
            
            {children}
        </main>
    );
}