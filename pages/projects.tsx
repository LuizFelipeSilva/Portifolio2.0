"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Calendar, Users, Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const t = useTranslations('Header');

  return (
    <header className="fixed w-full z-10 bg-black bg-opacity-70 py-2">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-white text-2xl font-bold">
            {t('portfolioTitle')}
          </Link>
          <ul className="hidden md:flex space-x-6">
            {['about', 'skills', 'projects', 'curriculum', 'contact'].map((item) => (
              <li key={item} className="hover:scale-110 transition-transform">
                <Link href={`/${item}`} className="text-white hover:text-purple-300 transition-colors">
                  {t(item)}
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

const ProjectCard: React.FC<{
  project: Project;
}> = ({ project }) => {
  const t = useTranslations('Projects');
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl transition-shadow duration-300"
    >
      <Image
        src={project.image}
        alt={t(`projects.${project.id}.title`)}
        width={600}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{t(`projects.${project.id}.title`)}</h3>
        <p className="text-gray-300 mb-4">{t(`projects.${project.id}.description`)}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span key={index} className="bg-purple-600 text-white px-2 py-1 rounded-full text-sm">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export interface Project {
  id: string;
  image: string;
  technologies: string[];
  date: string;
  team: string;
  codebase: string;
  tools: string[];
}

const projects: Project[] = [
  {
    id: 'software-modeling',
    image: "/flags/imagem-modelagem.png",
    technologies: ["UML", "Software Design", "Database Modeling", "System Architecture"],
    date: "2022",
    team: "Individual Project",
    codebase: "Documentation and Diagrams",
    tools: ["Astah", "Draw.io", "MySQL Workbench"],
  },
  {
    id: 'task-management-app',
    image: "/flags/imagem-tcc.png",
    technologies: ["IA", "SAX", "Clustering", "MVC"],
    date: "September 2022 - July 2023",
    team: "3 developers",
    codebase: "30,000 lines",
    tools: ["VS Code", "Git", "Google Docs", "Google Colabory"],
  },
  {
    id: 'EDA-Data',
    image: "/flags/imagem-eda.png",
    technologies: ["Python", "EDA", "Jupyter", "VS-Code", "Git"],
    date: "August 2024 - September 2024",
    team: "Individual Project",
    codebase: "1,000 lines",
    tools: ["PyCharm", "Git", "Vs-Code", "Jupyter Notebook"],
  },
];

export default function Projects() {
  const t = useTranslations('Projects');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-900 text-white flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-24">
        <h1 className="text-5xl font-bold text-center mb-12">{t('title')}</h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
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
      messages: (await import(`../messages/${locale}.json`)).default,
    },
  }
}
