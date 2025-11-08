import type { FC } from 'react'
import { LuMail, LuSend, LuGithub, LuLinkedin } from 'react-icons/lu'
import styles from './Footer.module.css'

const socialLinks = [
  { href: 'mailto:oleg@exocriador.dev', label: 'Email', icon: LuMail },
  { href: 'https://t.me/exocriador', label: 'Telegram', icon: LuSend },
  { href: 'https://www.linkedin.com/in/exocriador', label: 'LinkedIn', icon: LuLinkedin },
  { href: 'https://github.com/eXocriador', label: 'GitHub', icon: LuGithub },
]

const Footer: FC = () => (
  <footer className={styles.footer} id="footer">
    <div className={styles.topRow}>
      <div className={styles.devBlock}>
        <p className={styles.devLabel}>Розробка</p>
        <p className={styles.devName}>Олег Татаринов · eXocriador</p>
        <div className={styles.links}>
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
              aria-label={label}
              className={styles.iconLink}
            >
              <Icon aria-hidden size={18} />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
