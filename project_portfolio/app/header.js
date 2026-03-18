import styles from "../app/style.module.css"

export default function Header()
{
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header>
      <nav className={styles.nav}>
        <div>
          <a className={styles.navText} onClick={() => scrollToSection('hero')}>Home</a>
        </div>

        <div>
          <a className={styles.navText} onClick={() => scrollToSection('projects')}>Projects</a>
        </div>
      </nav>
    </header>
  );
}