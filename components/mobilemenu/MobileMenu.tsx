import { sidebarConfig } from '@/lib/sidebarLinks';
import { useMobileMenuStore } from '@/store/mobilemenu/useMenuStore';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Router } from 'next/router';
import React, { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

interface Props {}

const MobileMenu: React.FC<Props> = (props) => {
    const onClose = useMobileMenuStore((state) => state.close);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    useEffect(() => {
        Router.events.on('routeChangeComplete', () => {
            onClose();
        });

        return () => {
            Router.events.off('routeChangeComplete', () => {
                onClose();
            });
        };
    }, [onClose]);

    return (
        <motion.div
            initial={{ left: '-100%', opacity: 50 }}
            animate={{ left: 0, opacity: 1 }}
            exit={{ left: '-100%', opacity: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 max-w-full bg-white "
        >
            <header className="relative flex h-20 items-center justify-center shadow">
                <Image src="/logo/logo_black.svg" alt="logo" width={102} height={30} />

                <button className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70" onClick={onClose}>
                    <IoClose size={30} />
                </button>
            </header>

            <div className="mt-4">
                {sidebarConfig.length > 0 &&
                    sidebarConfig.map(({ id: mainId, menus, type }) => {
                        if (!menus || menus.length === 0) return null;

                        return menus.map(({ id, icon: Icon, path, title }) => {
                            return (
                                <Link href={path} key={id} className="block border-b border-gray-100">
                                    <div className="flex items-center gap-4 p-4 font-medium text-gray-500">
                                        <Icon size={20} />
                                        <span>{title}</span>
                                    </div>
                                </Link>
                            );
                        });
                    })}
            </div>
        </motion.div>
    );
};

export default MobileMenu;
