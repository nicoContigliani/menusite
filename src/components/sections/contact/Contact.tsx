import styles from './contact.module.css'

export default function Contact() {
  return (
    <section className={styles.contact} id="contact">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.title}>Get in Touch</h2>
            <span className={styles.subtitle}>
              Ready to start your next project? Contact us for a free consultation.
            </span>
          </div>
          <form className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>Name</label>
              <input 
                type="text" 
                id="name" 
                className={styles.input}
                placeholder="John Doe"
                required 
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input 
                type="email" 
                id="email" 
                className={styles.input}
                placeholder="john@example.com"
                required 
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="message" className={styles.label}>Message</label>
              <textarea 
                id="message" 
                className={styles.textarea}
                placeholder="Tell us about your project..."
                required 
              />
            </div>
            <button type="submit" className={styles.button}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

