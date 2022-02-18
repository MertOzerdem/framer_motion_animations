import styles from './ItemWhell.module.scss'
import { motion, useTransform, useMotionValue } from 'framer-motion'
import { useEffect } from 'react';

type ItemWhellProps = {
    index: number,
    yOffset?: number
}

const ItemWhell = (props:ItemWhellProps) => {
    const { index, yOffset } = props
    const y = useMotionValue(0);
    const yRange = [-100, 0, 100];
    const rotateXRange = [-90, 0, 90];
    const scaleRange = [0.9, 1.1, 0.9];

    const rotateX = useTransform(y, yRange, rotateXRange);
    const scale = useTransform(y, yRange, scaleRange);

    // useEffect(() => {
    //     setInterval(() => {
    //         console.log(rotateX.get())
    //     },1000)
    // }, [])

    console.log(index, ' y: ',rotateX.get())
    useEffect(() => y.onChange(latest => {console.log(index, ' index: ', latest)}), [])

    return (
        <div>
            <motion.div
                className={styles.itemWhell}
                drag="y"
                dragConstraints={{top: -90, bottom: 90}}
                // initial= {{y:-100}}
                // animate={{y: 100}}
                // transition= {{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                style={{ y, rotateX, scale }}
                >
                textToDrag
            </motion.div>
        </div>

        
    )
}

export default ItemWhell;