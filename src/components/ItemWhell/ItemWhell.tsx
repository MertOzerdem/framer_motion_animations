import styles from './ItemWhell.module.scss'
import { motion, useTransform, useMotionValue } from 'framer-motion'

const ItemWhell = () => {
    const y = useMotionValue(0);
    const yRange = [-100, 0, 100];
    const rotateXRange = [-90, 0, 90];
    const scaleRange = [0.9, 1.1, 0.9];

    const rotateX = useTransform(y, yRange, rotateXRange);
    const scale = useTransform(y, yRange, scaleRange);

    return (
        <motion.div
            className={styles.itemWhell}
            drag="y"
            dragConstraints={{top: -90, bottom: 90}}
            // initial= {{y:-100}}
            // animate={{y: 100}}
            transition= {{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
            style={{ y, rotateX, scale }}
        >
            sadasdsas
        </motion.div>
    )
}

export default ItemWhell;