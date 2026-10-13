'use client'

import { motion } from 'framer-motion'
import { MapPin, GraduationCap, Languages } from 'lucide-react'
import { profile } from '@/lib/portfolio-data'

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 220, damping: 24 } },
}

export function ProfilePanel({ align = 'center' }: { align?: 'center' | 'left' }) {
  const isLeft = align === 'left'
  const textAlign = isLeft ? 'text-left' : 'text-center'
  const rowJustify = isLeft ? 'justify-start' : 'justify-center'
  const mx = isLeft ? '' : 'mx-auto'

  return (
    <div className={`w-full max-w-2xl ${mx} ${textAlign}`}>
      <motion.p
        variants={item}
        className="font-mono text-xs uppercase tracking-[0.3em] text-primary"
      >
        {profile.role}
      </motion.p>
      <motion.h2
        variants={item}
        className="mt-2 font-heading text-4xl font-bold leading-tight sm:text-5xl text-balance"
      >
        <span className="text-gradient">{profile.name}</span>
      </motion.h2>

      <motion.div
        variants={item}
        className={`mt-4 flex flex-wrap items-center ${rowJustify} gap-x-5 gap-y-2 text-sm text-muted-foreground`}
      >
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-4 w-4 text-primary" />
          {profile.location}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <GraduationCap className="h-4 w-4 text-primary" />
          {profile.education}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Languages className="h-4 w-4 text-primary" />
          {profile.languages.join(', ')}
        </span>
      </motion.div>

      <motion.p
        variants={item}
        className={`${mx} mt-5 max-w-2xl text-pretty leading-relaxed text-muted-foreground`}
      >
        {profile.bio}
      </motion.p>

      <motion.div variants={item} className="mt-6">
        <p className={`mb-2 ${textAlign} font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground`}>
          Skills
        </p>
        <ul className={`flex flex-wrap ${rowJustify} gap-x-1.5 gap-y-2`}>
          {profile.skills.map((skill) => (
            <li
              key={skill}
              className="gradient-pill cursor-default rounded-full px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-primary hover:text-primary-foreground"
            >
              {skill}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div variants={item} className={`mt-6 flex flex-wrap ${rowJustify} gap-3`}>
        {profile.socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            {social.label}
          </a>
        ))}
      </motion.div>
    </div>
  )
}
