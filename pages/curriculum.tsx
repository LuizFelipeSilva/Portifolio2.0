"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Briefcase, Globe, Award, FileText, Lightbulb, Menu, X, LucideProps } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SectionProps } from './about';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('Header');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed w-full z-10 bg-black bg-opacity-70 py-2">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-white text-xl sm:text-2xl font-bold">
            {t('portfolioTitle')}
          </Link>
          <ul className="hidden md:flex space-x-4 lg:space-x-6">
            {['about', 'skills', 'projects', 'curriculum', 'contact'].map((item) => (
              <li key={item} className="hover:scale-110 transition-transform">
                <Link href={`/${item}`} className="text-white hover:text-purple-300 transition-colors text-sm lg:text-base">
                  {t(item)}
                </Link>
              </li>
            ))}
          </ul>
          <button className="md:hidden text-white" onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black bg-opacity-90 overflow-hidden"
          >
            <nav className="container mx-auto py-4">
              <ul className="flex flex-col items-center space-y-4">
                {['about', 'skills', 'projects', 'curriculum', 'contact'].map((item) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: 0.1 * ['about', 'skills', 'projects', 'curriculum', 'contact'].indexOf(item) }}
                  >
                    <Link
                      href={`/${item}`}
                      className="text-white hover:text-purple-300 transition-colors text-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      {t(item)}
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
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} {t('copyright')}</p>
      </div>
    </footer>
  );
};

const Section: React.FC<SectionProps> = ({ title, icon: Icon, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white bg-opacity-10 rounded-lg p-4 sm:p-6 mb-6"
    >
      <div className="flex items-center mb-4">
        <Icon className="mr-3 text-purple-400" size={24} />
        <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
      </div>
      <div className="mt-4">
        {children}
      </div>
    </motion.div>
  );
};

const TimelineItem: React.FC<{
  title: string;
  subtitle: string;
  date: string;
  description: string;
}> = ({ title, subtitle, date, description }) => (
  <div className="mb-6 last:mb-0">
    <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
    <p className="text-purple-300 text-sm sm:text-base">{subtitle}</p>
    <p className="text-xs sm:text-sm text-gray-400">{date}</p>
    <p className="mt-2 text-sm sm:text-base">{description}</p>
  </div>
);

const Filter: React.FC<{
  sections: Section[];
  activeSection: string;
  setActiveSection: (s: string) => void;
}> = ({ sections, activeSection, setActiveSection }) => {
  const t = useTranslations('Curriculum');
  return (
    <div className="mb-6 flex flex-wrap justify-center gap-2">
      <button
        className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm ${activeSection === 'all' ? 'bg-purple-600' : 'bg-gray-700'} text-white`}
        onClick={() => setActiveSection('all')}
      >
        {t('all')}
      </button>
      {sections.map((section) => (
        <button
          key={section.id}
          className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm ${activeSection === section.title ? 'bg-purple-600' : 'bg-gray-700'} text-white`}
          onClick={() => setActiveSection(section.title)}
        >
          {section.title}
        </button>
      ))}
    </div>
  );
};

interface Section {
  id: string;
  title: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  content: React.JSX.Element;
}

export default function Curriculum() {
  const [activeSection, setActiveSection] = useState('all');
  const t = useTranslations('Curriculum');

  const sections: Section[] = [
    { 
      id: "education",
      title: t('sections.education.title'), 
      icon: Book, 
      content: (
        <>
          <TimelineItem
            title={t('sections.education.items.masters.title')}
            subtitle={t('sections.education.items.masters.subtitle')}
            date={t('sections.education.items.masters.date')}
            description={t('sections.education.items.masters.description')}
          />
          <TimelineItem
            title={t('sections.education.items.bachelors.title')}
            subtitle={t('sections.education.items.bachelors.subtitle')}
            date={t('sections.education.items.bachelors.date')}
            description={t('sections.education.items.bachelors.description')}
          />
          <TimelineItem
            title={t('sections.education.items.ensino.title')}
            subtitle={t('sections.education.items.ensino.subtitle')}
            date={t('sections.education.items.ensino.date')}
            description={t('sections.education.items.ensino.description')}
          />
        </>
      )
    },
    { 
      id: "experience",
      title: t('sections.experience.title'), 
      icon: Briefcase, 
      content: (
        <>
          <TimelineItem
            title={t('sections.experience.items.senior.title')}
            subtitle={t('sections.experience.items.senior.subtitle')}
            date={t('sections.experience.items.senior.date')}
            description={t('sections.experience.items.senior.description')}
          />
          <TimelineItem
            title={t('sections.experience.items.fullstack.title')}
            subtitle={t('sections.experience.items.fullstack.subtitle')}
            date={t('sections.experience.items.fullstack.date')}
            description={t('sections.experience.items.fullstack.description')}
          />
        </>
      )
    },
    {
      id: "languages",
      title: t('sections.languages.title'),
      icon: Globe,
      content: (
        <ul className="space-y-2 text-sm sm:text-base">
          <li>{t('sections.languages.items.item1')}</li>
          <li>{t('sections.languages.items.item2')}</li>
          <li>{t('sections.languages.items.item3')}</li>
        </ul>
      )
    },
    {
      id: "certifications",
      title: t('sections.certifications.title'),
      icon: Award,
      content: (
        <ul className="space-y-2 text-sm sm:text-base">
          <li>{t('sections.certifications.items.item1')}</li>
          <li>{t('sections.certifications.items.item2')}</li>
          <li>{t('sections.certifications.items.item3')}</li>
          <li>{t('sections.certifications.items.item4')}</li>
        </ul>
      )
    },
    { 
      id: "thesis",
      title: t('sections.thesis.title'), 
      icon: FileText, 
      content: (
        <>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">{t('sections.thesis.projectTitle')}</h3>
          <p className="text-sm sm:text-base">{t('sections.thesis.description')}</p>
          <ul className="list-disc list-inside mt-2 text-sm sm:text-base">
          </ul>
        </>
      )
    },
    { 
      id: "skills",
      title: t('sections.skills.title'), 
      icon: Lightbulb, 
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
          <div>
            <h3 className="font-semibold mb-2">{t('sections.skills.categories.programming.title')}</h3>
            <ul className="list-disc list-inside">
              <li>{t('sections.skills.categories.programming.items.item1')}</li>
              <li>{t('sections.skills.categories.programming.items.item2')}</li>
              <li>{t('sections.skills.categories.programming.items.item3')}</li>
              <li>{t('sections.skills.categories.programming.items.item4')}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">{t('sections.skills.categories.frameworks.title')}</h3>
            <ul className="list-disc list-inside">
              <li>{t('sections.skills.categories.frameworks.items.item1')}</li>
              <li>{t('sections.skills.categories.frameworks.items.item2')}</li>
              <li>{t('sections.skills.categories.frameworks.items.item3')}</li>
              <li>{t('sections.skills.categories.frameworks.items.item4')}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">{t('sections.skills.categories.tools.title')}</h3>
            <ul className="list-disc list-inside">
              <li>{t('sections.skills.categories.tools.items.item1')}</li>
              <li>{t('sections.skills.categories.tools.items.item2')}</li>
              <li>{t('sections.skills.categories.tools.items.item3')}</li>
              <li>{t('sections.skills.categories.tools.items.item4')}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">{t('sections.skills.categories.soft.title')}</h3>
            <ul className="list-disc list-inside">
              <li>{t('sections.skills.categories.soft.items.item1')}</li>
              <li>{t('sections.skills.categories.soft.items.item2')}</li>
              <li>{t('sections.skills.categories.soft.items.item3')}</li>
              <li>{t('sections.skills.categories.soft.items.item4')}</li>
            </ul>
          </div>
        </div>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-900 text-white flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-20 sm:py-24">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12">{t('title')}</h1>

        <Filter sections={sections} activeSection={activeSection} setActiveSection={setActiveSection} />

        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            (activeSection === 'all' || activeSection === section.title) && (
              <Section key={section.id} title={section.title} icon={section.icon}>
                {section.content}
              </Section>
            )
          ))}
        </div>
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