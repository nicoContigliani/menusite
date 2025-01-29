import { Code, Shield, Sparkles, Globe, Zap, FileText } from 'lucide-react'
import styles from './projects.module.css'

const projects = [
  {
    icon: <Code />,
    title: 'Custom Solutions',
    description: 'Tailored project development strategies to meet your specific requirements.'
  },
  {
    icon: <Shield />,
    title: 'Secure & Scalable',
    description: 'Robust security and scalable infrastructure for large, growing projects.'
  },
  {
    icon: <Sparkles />,
    title: 'Creative Design',
    description: 'Beautiful, modern designs that provide seamless user experiences.'
  },
  {
    icon: <Globe />,
    title: 'Global Reach',
    description: 'Cloud-based solutions for performance and accessibility anywhere in the world.'
  },
  {
    icon: <Zap />,
    title: 'Fast Delivery',
    description: 'Agile development ensuring fast delivery without compromising quality.'
  },
  {
    icon: <FileText />,
    title: 'Comprehensive Reporting',
    description: 'In-depth reports and documentation to track project progress and results.'
  }
]

export default function Projects() {
  return (
    <section className={styles.projects} id="projects">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Our Project Expertise</h2>
          <span className={styles.subtitle}>
            We specialize in delivering customized solutions and managing projects of all sizes.
          </span>
        </div>
        <div className={styles.grid}>
          {projects.map((project, index) => (
            <div key={index} className={styles.project}>
              <div className={styles.icon}>
                {project.icon}
              </div>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <span className={styles.description}>{project.description}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
