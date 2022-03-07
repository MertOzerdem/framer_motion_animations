import styles from './FloatingActionButton.module.scss'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { useState } from 'react'

const contacts = ['A', 'B', 'C']
const variants = {
    open: {
        width: 240,
        height: 224,
        borderRadius: '5%',
        transition: { duration: 1 }
    },
    closed: {
        width: 56,
        height: 56,
        borderRadius: '50%',
        transition: { duration: 1 }
    }
}

const contentsVariants = {
    open: {
        ...variants.open,
    },
    closed: {
        ...variants.closed,
    }
}

const childVariants = {
    open: {
        opacity: 0,
        scale: 0,
        transition: { duration: 1 }
    },
    closed: {
        opacity: 1,
        scale: 1,
        transition: { duration: 1 }
    }
}

const FloatingActionButton = () => {
    const [isOpen, setIsOpen] = useState(false)
    const height = useMotionValue(56);
    const opacity = useTransform(height, [124, 224], [0, 1])

    return (
        <div>
            <motion.div
                className={styles.floatingButton}
                onClick={() => setIsOpen(!isOpen)}
                variants={variants}
                initial={false}
                animate={isOpen ? 'open' : 'closed'}
            >
                <AnimatePresence>
                    {isOpen &&
                        <motion.div
                            className={styles.composeMenuWrapper}
                            variants={contentsVariants}
                            initial='closed'
                            animate='open'
                            exit='closed'
                            style={{ height, opacity }}
                        >
                            {contacts.map((_, index) => {
                                return (
                                    <div key={index} className={`${styles.composeArea} ${styles.composeMenuItem}`} >
                                        <div className={styles.composeMenuItemIcon} />
                                        <div className={styles.composeMenuItemText}>{`Contact ${index + 1}`}</div>
                                    </div>
                                )
                            })}
                            <div className={`${styles.composeArea}`}>
                                <div className={styles.composeButton}>
                                    Compose
                                </div>
                            </div>
                        </motion.div>}
                </AnimatePresence>
                <AnimatePresence>
                    {!isOpen && <motion.svg 
                        variants={childVariants}
                        initial='open'
                        animate='closed'
                        exit='open'
                        width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className={styles.plus} d="M12 0L12 24" />
                        <path className={styles.plus} d="M0 12H24" />
                    </motion.svg>}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}

export default FloatingActionButton;