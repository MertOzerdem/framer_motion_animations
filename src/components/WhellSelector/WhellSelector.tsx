import styles from './WhellSelector.module.scss'
import { motion } from 'framer-motion'
import ItemWhell from '../ItemWhell/ItemWhell'
import { useRef } from 'react'

const items = [
    {
        text: 'textToDrag',
        id: 1
    },
    {
        text: 'textToDrag',
        id: 2
    },
    {
        text: 'textToDrag',
        id: 3
    },
    {
        text: 'textToDrag',
        id: 4
    },
    {
        text: 'textToDrag',
        id: 5
    }
]

const WhellSelector = () => {
    const origin = useRef(null);

    return (
        <motion.div
            // drag="y"
            // dragConstraints={{ top: -90, bottom: 90 }}
            // onDrag={
            //     (event, info) => {
            //         console.log('info: ', info.point.x, info.point.y)
            //         console.log('event: ', event)
            //     }
            // }
            dragPropagation
            className={styles.whellSelector}
            ref={origin}
        >
            {items.map((item, index) => {
                return (
                    <ItemWhell
                        key={item.id}
                        index={index}
                    />
                )
            })}
        </motion.div>
    )
}

export default WhellSelector;