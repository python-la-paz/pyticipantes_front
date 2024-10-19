// src/app/clientLayout.tsx
'use client';

import { usePathname } from 'next/navigation';
import MenuAppBar from './components/nav';
import FooterBar from './components/footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/login';

    return (
        <>
            {!isLoginPage && <MenuAppBar children={undefined} />}
            {children}
            {!isLoginPage && <FooterBar />}
        </>
    );
}