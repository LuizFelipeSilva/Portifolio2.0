"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Database, Server, Cpu, Globe, X, Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('Header');

  return (
    <header className="fixed w-full z-10 bg-black bg-opacity-70 py-2">
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
    <footer className="bg-gray-800 text-white p-4  mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} {t('copyright')}</p>
      </div>
    </footer>
  );
};

const SkillCategory = ({ title, icon: Icon, skills, isExpanded, onClick }) => {
  const t = useTranslations('Skills');
  return (
    <motion.div
      layout
      className={`bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-lg overflow-hidden cursor-pointer`}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <Icon className="mr-3 text-white" size={32} />
          <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
        <p className="text-white text-opacity-80">{t('clickToViewSkills')}</p>
      </div>
    </motion.div>
  );
};

const SkillDetail = ({ skill, onClose }) => {
  const t = useTranslations('Skills');
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white bg-opacity-20 rounded-lg p-6 mt-4"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold">{skill.name}</h3>
        <button onClick={onClose} className="text-white hover:text-gray-300 transition-colors">
          <X size={24} />
        </button>
      </div>
      <p className="mb-2"><strong>{t('experienceLevel')}:</strong> {t(`experienceLevels.${skill.experienceLevel}`)}</p>
      <p className="mb-4">{skill.description}</p>
      <h4 className="text-xl font-semibold mb-2">{t('relatedProjects')}:</h4>
      <ul className="list-disc list-inside">
        {skill.projects.map((project, index) => (
          <li key={index}>{project}</li>
        ))}
      </ul>
    </motion.div>
  );
};

export default function Skills() {
  const t = useTranslations('Skills');
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const skillCategories = [
    {
      title: t('categories.frontend'),
      icon: Globe,
      skills: [
        {
          name: 'React',
          experienceLevel: 'intermediate',
          description: t('skills.react'),
          projects: [t('projects.portReact'), t('projects.cursoReact')]
        },
        {
          name: 'JavaScript',
          experienceLevel: 'intermediate',
          description: t('skills.javaScript'),
          projects: [t('projects.portfolio'), t('projects.blogPlatform')]
        },
        {
          name: 'HTML/CSS',
          experienceLevel: 'advanced',
          description: t('skills.htmlCss'),
          projects: [t('projects.portHtml'), t('projects.landingPage')]
        },
      ],
    },
    {
      title: t('categories.backend'),
      icon: Server,
      skills: [
        {
          name: 'C#',
          experienceLevel: 'beginner',
          description: t('skills.C#'),
          projects: [t('projects.chatApp'), t('projects.taskManagement')]
        },
        {
          name: 'Python',
          experienceLevel: 'advanced',
          description: t('skills.python'),
          projects: [t('projects.dataAnalysis'), t('projects.webScraping')]
        },
      ],
    },
    {
      title: t('categories.api'),
      icon: Code,
      skills: [
        {
          name: 'FastAPI',
          experienceLevel: 'advanced',
          description: t('skills.fastAPI'),
          projects: [t('projects.fastMysql'), t('projects.fastMongo')]
        },
        // {
        //   name: 'GraphQL',
        //   experienceLevel: 'intermediate',
        //   description: t('skills.graphql'),
        //   projects: [t('projects.ecommerceProductApi'), t('projects.userManagement')]
        // },
        // {
        //   name: 'Swagger',
        //   experienceLevel: 'intermediate',
        //   description: t('skills.swagger'),
        //   projects: [t('projects.fintechApiDocs'), t('projects.travelApiSpec')]
        // },
      ],
    },
    {
      title: t('categories.database'),
      icon: Database,
      skills: [
        {
          name: 'MySQL',
          experienceLevel: 'advanced',
          description: t('skills.mysql'),
          projects: [t('projects.automacao'), t('projects.inventoryManagement')]
        },
        {
          name: 'MongoDB',
          experienceLevel: 'intermediate',
          description: t('skills.mongodb'),
          projects: [t('projects.inventoryManagement'), t('projects.cms')]
        },
        {
          name: 'PostgreSQL',
          experienceLevel: 'intermediate',
          description: t('skills.postgresql'),
          projects: [t('projects.geospatialApp')]
        },
      ],
    },
    {
      title: t('categories.ai'),
      icon: Cpu,
      skills: [
        {
          name: t('skills.machineLearning'),
          experienceLevel: 'intermediate',
          description: t('skills.machineLearningDesc'),
          projects: [t('projects.predictiveMaintenance'), t('projects.churnPrediction')]
        },
        {
          name: t('skills.nlp'),
          experienceLevel: 'beginner',
          description: t('skills.nlpDesc'),
          projects: [t('projects.sentimentAnalysis'), t('projects.chatbotDevelopment')]
        },
        {
          name: 'TensorFlow',
          experienceLevel: 'intermediate',
          description: t('skills.tensorflow'),
          projects: [t('projects.imageClassification'), t('projects.timeSeriesForecasting')]
        },
      ],
    },
  ];

  const handleCategoryClick = (index) => {
    setExpandedCategory(expandedCategory === index ? null : index);
    setSelectedSkill(null);
  };

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-900 text-white flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-24">
        <h1 className="text-5xl font-bold text-center mb-8">{t('title')}</h1>
        <p className="text-center text-gray-300 mb-12 text-xl">
          {t('subtitle')}
        </p>

        <div className={`flex flex-col ${expandedCategory !== null ? 'md:flex-row' : ''}`}>
          <motion.div
            layout
            className={`grid gap-6 ${
              expandedCategory !== null
                ? 'md:w-2/5 grid-cols-2'
                : 'w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            }`}
          >
            <AnimatePresence>
              {skillCategories.map((category, index) => (
                <SkillCategory
                  key={index}
                  {...category}
                  isExpanded={expandedCategory === index}
                  onClick={() => handleCategoryClick(index)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {expandedCategory !== null && (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="md:w-3/5 md:ml-6 mt-6 md:mt-0"
              >
                <div className="bg-white bg-opacity-10 rounded-lg p-6 relative">
                  <button
                    className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                    onClick={() => setExpandedCategory(null)}
                  >
                    <X size={24} />
                  </button>
                  <h2 className="text-3xl font-bold mb-4">{skillCategories[expandedCategory].title}</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {skillCategories[expandedCategory].skills.map((skill, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white bg-opacity-20 text-white px-3 py-2 rounded-full text-sm hover:bg-opacity-30 transition-colors"
                        onClick={() => handleSkillClick(skill)}
                      >
                        {skill.name}
                      </motion.button>
                    ))}
                  </div>
                  <AnimatePresence>
                    {selectedSkill && (
                      <SkillDetail 
                        skill={selectedSkill} 
                        onClose={() => setSelectedSkill(null)} 
                      />
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
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