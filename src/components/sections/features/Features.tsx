import { Code, Gem, Globe, Shield, Sparkles, Zap } from 'lucide-react'
import styles from './features.module.css'

const features = [
  {
    icon: <Code />,
    title: 'Custom Development',
    description: 'Tailored solutions built with cutting-edge technologies to meet your specific needs.'
  },
  {
    icon: <Shield />,
    title: 'Secure & Scalable',
    description: 'Enterprise-grade security with infrastructure that grows with your business.'
  },
  {
    icon: <Sparkles />,
    title: 'Modern UI/UX',
    description: 'Beautiful, intuitive interfaces that deliver exceptional user experiences.'
  },
  {
    icon: <Globe />,
    title: 'Cloud Solutions',
    description: 'Cloud-native applications optimized for performance and reliability.'
  },
  {
    icon: <Zap />,
    title: 'Rapid Development',
    description: 'Agile methodology ensuring quick iterations and faster time-to-market.'
  },
  {
    icon: <Gem />,
    title: 'Quality Assurance',
    description: 'Rigorous testing and quality control for flawless applications.'
  }
]

export default function Features() {
  return (
    <section className={styles.features} id="features">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Comprehensive Software Solutions</h2>
          <span className={styles.subtitle}>
            We offer a full range of software development services to help your business thrive in the digital age.
          </span>
        </div>
        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.feature}>
              <div className={styles.icon}>
                {feature.icon}
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <span className={styles.description}>{feature.description}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

