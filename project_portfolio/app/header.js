import Link from 'next/link';
import styles from "../app/style.module.css"

// Present in every page
export default function Header()
{
  return (
    <header>
      <nav className={styles.nav}>
        <div>
          <Link href='/'>Home</Link>
        </div>
        
        <div>
          <Link href='/'>About Me</Link>
        </div>
        
        <div>
          <Link href='/'>Projects</Link>
        </div>
        
        <div>
          <Link href='/test'>TEST</Link>
        </div>
      </nav>
    </header>
  )
}