import styles from './TabNavigation.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

const Navs = ['A', 'B', 'C']

const TabNavigation = () => {
    const [activeTab, setActiveTab] = useState(0)

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
                <div className={styles.contentWrapper}>
                    <div className={styles.content}></div>
                    <div className={styles.content}></div>
                    <div className={styles.content}></div>
                </div>
            </div>
    )
}

export default TabNavigation;