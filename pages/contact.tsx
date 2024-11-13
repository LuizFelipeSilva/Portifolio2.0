"use client"

import React, { ReactEventHandler, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Instagram, Menu, X, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SectionProps } from './about';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('Header');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
          <button className="md:hidden text-white" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-black bg-opacity-90 py-2"
          >
            <ul className="flex flex-col items-center space-y-2">
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
                    className="text-white hover:text-purple-300 transition-colors"
                    onClick={toggleMenu}
                  >
                    {t(item.toLowerCase())}
                  </Link>
                </motion.li>
              ))}
            </ul>
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

const SocialIcon: React.FC<SectionProps> = ({ icon: Icon, href, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
    className="bg-gray-700 p-3 rounded-full text-white hover:text-purple-400 transition-colors"
    aria-label={label}
  >
    <Icon size={24} />
  </motion.a>
);

const ContactForm = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const t = useTranslations('Contact.form');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formState);
    setIsSubmitted(true);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300">{t('name')}</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formState.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">{t('email')}</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300">{t('message')}</label>
        <textarea
          id="message"
          name="message"
          value={formState.message}
          onChange={handleChange}
          required
          rows={4}
          className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        ></textarea>
      </div>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        {t('sendButton')}
      </motion.button>
      <AnimatePresence>
        {isSubmitted && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-green-400 text-center"
          >
            {t('thankYouMessage')}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
};

const ContactInfo: React.FC<SectionProps> = ({ icon: Icon, text }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg shadow-md"
  >
    <div className="bg-purple-600 p-2 rounded-full">
      <Icon className="text-white" size={24} />
    </div>
    <span className="text-lg">{text}</span>
  </motion.div>
);

export default function Contact() {
  const t = useTranslations('Contact');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-900 text-white flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-24">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-center mb-12"
        >
          {t('title')}
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg backdrop-blur-sm">
              <h2 className="text-3xl font-semibold mb-6 text-purple-300">{t('contactInfo')}</h2>
              <div className="space-y-4">
                <ContactInfo icon={Mail} text="lfo.lacerda@gmail.com" />
                <ContactInfo icon={Phone} text="+55 (11)991315620" />
                <ContactInfo icon={MapPin} text={t('location')} />
              </div>
            </div>
            
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg backdrop-blur-sm">
              <h3 className="text-2xl font-semibold mb-6 text-purple-300">{t('connectWithMe')}</h3>
              <div className="flex justify-center space-x-4">
                <SocialIcon icon={Github} href="https://github.com/LuizFelipeSilva" label="GitHub" />
                <SocialIcon icon={Linkedin} href="https://www.linkedin.com/in/luiz-felipe-de-oliveira-lacerda-e-silva-2b33a61ab/" label="LinkedIn" />
                <SocialIcon icon={MessageCircle} href="https://wa.me/5511991315620" label="WhatsApp" />
                <SocialIcon icon={Instagram} href="https://instagram.com/_lf.lacerda" label="Instagram" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-800 p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-3xl font-semibold mb-6">{t('sendMessage')}</h2>
            <ContactForm />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-semibold mb-4">{t('callToAction')}</h2>
          <p className="text-xl text-gray-300">
            {t('callToActionDescription')}
          </p>
        </motion.div>
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