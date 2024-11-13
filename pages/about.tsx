"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin, Coffee, Music, Book, Target, Menu, X , Dumbbell, LucideProps} from 'lucide-react';
import { useTranslations } from 'next-intl';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('Header');

  return (
    <header className="fixed w-full z-50 bg-black bg-opacity-70 py-2">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-white text-2xl font-bold">
            {t('portfolioTitle')}
          </Link>
          <ul className="hidden md:flex space-x-6">
            {['About', 'Skills', 'Projects', 'Curriculum', 'Contact'].map((item) => (
              <li key={item} className="hover:scale-110 transition-transform">
                <Link href={`/${item.toLowerCase()}`} className="text-white hover:text-purple-300 transition-colors">
                  {t(item.toLowerCase())}
                </Link>
              </li>
            ))}
          </ul>
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-black bg-opacity-90 absolute top-full left-0 right-0"
          >
            <nav className="container mx-auto py-4">
              <ul className="flex flex-col items-center space-y-4">
                {['About', 'Skills', 'Projects', 'Curriculum', 'Contact'].map((item) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: 0.1 * ['About', 'Skills', 'Projects', 'Curriculum', 'Contact'].indexOf(item) }}
                  >
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="text-white hover:text-purple-300 transition-colors text-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      {t(item.toLowerCase())}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Footer = () => {
  const t = useTranslations('Footer');
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8 relative z-40">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} {t('copyright')}</p>
      </div>
    </footer>
  );
};

const CreativeFrame: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <div className="relative p-2">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 transform rotate-2 rounded-lg"></div>
    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-teal-500 to-green-500 transform -rotate-2 rounded-lg"></div>
    <div className="relative bg-gray-900 p-2 rounded-lg z-10">
      {children}
    </div>
  </div>
);

export interface SectionProps {
  title?: string;
  text?: string;
  label?: string;
  href?: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  children?: React.ReactNode;
}

const AboutSection: React.FC<SectionProps> = ({ title, icon: Icon, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mb-8"
  >
    <h2 className="text-2xl font-bold mb-4 flex items-center">
      <span className="bg-purple-500 w-8 h-8 rounded-full flex items-center justify-center mr-3">
        <Icon size={20} />
      </span>
      {title}
    </h2>
    {children}
  </motion.div>
);

export default function About() {
  const t = useTranslations('About');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-900 text-white flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-24">
        <h1 className="text-5xl font-bold text-center mb-12">{t('title')}</h1>

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="md:w-2/3">
            <AboutSection title={t('whoAmI.title')} icon={User}>
              <p className="mb-4">{t('whoAmI.paragraph1')}</p>
              <p>{t('whoAmI.paragraph2')}</p>
            </AboutSection>

            <AboutSection title={t('myJourney.title')} icon={MapPin}>
              <p className="mb-4">{t('myJourney.paragraph1')}</p>
              <p>{t('myJourney.paragraph2')}</p>
            </AboutSection>
          </div>

          <div className="md:w-1/3">
            <CreativeFrame>
              <Image
                src="/flags/Image (2).jpeg"
                alt={t('image1Alt')}
                width={400}
                height={600}
                className="rounded-lg"
              />
            </CreativeFrame>
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse gap-8">
          <div className="md:w-2/3">
            <AboutSection title={t('interests.title')} icon={Coffee}>
              <p className="mb-4">{t('interests.intro')}</p>
              <ul className="list-disc list-inside space-y-2">
                <li className="flex items-center"><Dumbbell className="mr-2" size={16} /> {t('interests.interest1')}</li>
                <li className="flex items-center"><Music className="mr-2" size={16} /> {t('interests.interest2')}</li>
                <li className="flex items-center"><Book className="mr-2" size={16} /> {t('interests.interest3')}</li>
              </ul>
              <p className="mt-4">{t('interests.conclusion')}</p>
            </AboutSection>

            <AboutSection title={t('futureGoals.title')} icon={Target}>
              <p className="mb-4">{t('futureGoals.intro')}</p>
              <ul className="list-disc list-inside space-y-2">
                <li>{t('futureGoals.goal1')}</li>
                <li>{t('futureGoals.goal2')}</li>
                <li>{t('futureGoals.goal3')}</li>
                <li>{t('futureGoals.goal4')}</li>
              </ul>
              <p className="mt-4">{t('futureGoals.conclusion')}</p>
            </AboutSection>
          </div>

          <div className="md:w-1/3">
            <CreativeFrame>
              <Image
                src="/flags/Image (1).jpeg"
                alt={t('image2Alt')}
                width={400}
                height={600}
                className="rounded-lg"
              />
            </CreativeFrame>
          </div>
        </div>

        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">{t('connect.title')}</h2>
          <p className="mb-4">{t('connect.description')}</p>
          <div className="flex justify-center space-x-4">
            <a href="mailto:your.email@example.com" className="flex items-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              {t('connect.emailButton')}
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
              </svg>
              {t('connect.linkedinButton')}
            </a>
          </div>
        </motion.div> */}
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
}