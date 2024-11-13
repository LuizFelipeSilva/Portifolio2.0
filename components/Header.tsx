// components/Header.js
import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/skills">Skills</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/curriculum">Curriculum</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
};

export default Header;