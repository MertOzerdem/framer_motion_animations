import styles from './TabNavigationWithTransform.module.scss'
import { motion } from 'framer-motion'

const TabNavigationWithTransform = () => {

    return (
        <motion.div className={styles.navigationWrapper}>
            <ul className={styles.navigationItemsWrapper}>
                <li className={`${styles.navigationItem} ${styles.selectedItem}`}>A</li>
                <li className={styles.navigationItem}>B</li>
                <li className={styles.navigationItem}>C</li>
            </ul>
            <div className={styles.navigationBar}>
                <div className={styles.activeNavigationBar}></div>
            </div>
        </motion.div>
    )
}

export default TabNavigationWithTransform;