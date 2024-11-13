import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { ChevronDown, X } from 'lucide-react';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations('Index');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (locale) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  const navItems = ['About', 'Skills', 'Projects', 'Curriculum', 'Contact'];

  const languageItems = [
    { label: 'English', locale: 'en', flag: '/flags/twemoji--flag-united-states.svg' },
    { label: 'Português', locale: 'pt', flag: '/flags/twemoji--flag-brazil.svg' },
    { label: 'Español', locale: 'es', flag: '/flags/fxemoji--spanishflag.svg' },
  ];

  return (
    <div className="relative min-h-screen">
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('description')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        >
          <source src="/video-home.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <header className={`fixed w-full z-10 transition-all duration-300 ${isScrolled ? 'bg-black bg-opacity-70 py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center">
            <Link href="/" className="text-white text-2xl font-bold">
              {t('portfolioTitle')}
            </Link>
            <ul className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="text-white hover:text-purple-300 transition-colors">
                    {t(item.toLowerCase())}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-white hover:text-purple-300 transition-colors">
                  <Image 
                    src={languageItems.find(item => item.locale === router.locale)?.flag || languageItems[0].flag}
                    alt={languageItems.find(item => item.locale === router.locale)?.label || languageItems[0].label}
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                  {languageItems.find(item => item.locale === router.locale)?.label || languageItems[0].label}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 border-gray-700">
                  {languageItems.map((item) => (
                    <DropdownMenuItem 
                      key={item.locale} 
                      onSelect={() => changeLanguage(item.locale)}
                      className="text-white hover:bg-gray-700"
                    >
                      <Image src={item.flag} alt={item.label} width={24} height={24} className="mr-2" />
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <button 
                className="md:hidden text-white"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 md:hidden">
          <div className="flex flex-col items-center justify-center h-full relative">
            <button 
              className="absolute top-4 right-4 text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
            {navItems.map((item, index) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-white text-2xl mb-6 hover:text-purple-300 transition-colors transform hover:scale-110"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                {t(item.toLowerCase())}
              </Link>
            ))}
          </div>
        </div>
      )}

      <main className="relative z-1 flex flex-col items-center justify-center min-h-screen text-white text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">{t('welcome')}</h1>
        <p className="text-xl md:text-2xl mb-8">{t('tagline')}</p>
      </main>

      <footer className="absolute bottom-0 w-full z-10 bg-black bg-opacity-70 py-4">
        <div className="container mx-auto px-4 text-center text-white">
          <p>&copy; {new Date().getFullYear()} {t('portfolioTitle')}. {t('rightsReserved')}</p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
}