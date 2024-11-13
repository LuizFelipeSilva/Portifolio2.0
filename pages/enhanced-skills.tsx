'use client'

import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import confetti from 'canvas-confetti'
import { Tilt } from 'react-tilt'
import { Player } from '@lottiefiles/react-lottie-player'
import { Code, Database, Server, Cpu, Globe } from 'lucide-react'

export default function EnhancedSkills() {
  const [selectedSkill, setSelectedSkill] = useState(null)
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const skillCategories = [
    { title: 'Front-end', icon: Globe },
    { title: 'Back-end', icon: Server },
    { title: 'API', icon: Code },
    { title: 'Database', icon: Database },
    { title: 'AI', icon: Cpu },
  ]

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill)
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-900 text-white p-8">
      <h1 className="text-5xl font-bold text-center mb-12">My Enhanced Skills</h1>
      
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 50 }
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {skillCategories.map((category, index) => (
          <Tilt key={index} options={{ max: 25, scale: 1.05 }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white bg-opacity-10 rounded-lg p-6 cursor-pointer"
              onClick={() => handleSkillClick(category)}
            >
              <category.icon className="w-12 h-12 mb-4 text-purple-400" />
              <h2 className="text-2xl font-bold">{category.title}</h2>
            </motion.div>
          </Tilt>
        ))}
      </motion.div>

      {selectedSkill && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-white bg-opacity-10 rounded-lg p-6"
        >
          <h3 className="text-3xl font-bold mb-4">{selectedSkill.title} Skills</h3>
          <Player
            autoplay
            loop
            src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
            style={{ height: '200px', width: '200px' }}
          />
        </motion.div>
      )}
    </div>
  )
}