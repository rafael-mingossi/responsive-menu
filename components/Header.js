import { useState, useEffect } from 'react';

import styles from './Header.module.scss';

import { BiMenuAltRight } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <h2 className={styles.header__content__logo}>
          <a href="/">navbar</a>
        </h2>

        <nav
          className={`${styles.header__content__nav} ${
            menuOpen && size.width < 768 ? styles.isMenu : ''
          }`}
        >
          <ul>
            <li>
              <a href="/PageOne" onclick={menuToggleHandler}>
                PageOne
              </a>
            </li>
            <li>
              <a href="/PageTwo" onclick={menuToggleHandler}>
                PageTwo
              </a>
            </li>
            <li>
              <a href="/PageThree" onclick={menuToggleHandler}>
                PageThree
              </a>
            </li>
          </ul>
          <button>CTA Page</button>
        </nav>
        <div className={styles.header__content__toggle}>
          {!menuOpen ? (
            <BiMenuAltRight onClick={menuToggleHandler} />
          ) : (
            <AiOutlineClose onClick={menuToggleHandler} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
