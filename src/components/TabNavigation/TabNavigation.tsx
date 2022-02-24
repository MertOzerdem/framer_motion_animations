import styles from './TabNavigation.module.scss'
import { motion, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const Navs = ['A', 'B', 'C']

const variants = {
    left: {
        x: 0,
        opacity: 0,
    },
    middle: {
        x: '100vw',
        opacity: 1,
    },
    right: {
        x: '-100vw',
        opacity: 0,
    }
}



const TabNavigation = () => {
    const [activeTab, setActiveTab] = useState(0)
    const contentRef = useRef<HTMLDivElement>(null);
    const x = useSpring(0);

    useEffect(() => {
        if (contentRef.current) {
            x.set(contentRef.current.offsetWidth * -activeTab)
        }
    }, [activeTab, x])

    return (
            <div className={styles.navigationWrapper}>
                <ul className={styles.navigationItemsWrapper}>
                    {Navs.map((nav, index) => {
                        return (
                            <motion.li 
                                
                                key={index}
                                onClick={() => setActiveTab(index)}
                                className={`${styles.navigationItem} ${activeTab === index ? styles.active : ''}`}
                                >
                                <div>{nav}</div>
                                    {activeTab === index  && <motion.div
                                        layoutId='underline'
                                        className={styles.activeNavigationBar} />}
                            </motion.li>
                        )
                    })}
                </ul>
                <div className={styles.itemList}>
                    {Navs.map((_, index) => {
                        return (
                                <motion.div 
                                    key={index}
                                    ref={contentRef}
                                    className={styles.contentWrapper}
                                    variants={variants}
                                    style={{x}}
                                    transition={ { duration: 1 } }
                                    >
                                    <div className={styles.content}></div>
                                    <div className={styles.content}></div>
                                    <div className={styles.content}></div>
                                </motion.div>
                        )
                    })}
                </div>
            </div>
    )
}

export default TabNavigation;