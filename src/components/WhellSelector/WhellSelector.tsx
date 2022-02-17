import styles from './WhellSelector.module.scss'
import { motion } from 'framer-motion'
import ItemWhell from '../ItemWhell/ItemWhell'

const WhellSelector = () => {
    
    return (
        <motion.div 
            className={styles.whellSelector}
            >
            <ItemWhell />
            <ItemWhell />
            <ItemWhell />
            <ItemWhell />
            <ItemWhell />
        </motion.div>
    )
}

export default WhellSelector;