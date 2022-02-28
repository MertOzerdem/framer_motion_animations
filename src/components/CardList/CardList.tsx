import { AnimationProps, motion } from 'framer-motion'
import { useState } from 'react'
import styles from './CardList.module.scss'
import Exclude from '../../images/Exclude.png'

const bars = ['A', 'B', 'C']

const variants = {
    opened: {
        opacity: 1,
        scale: 1,
        x: 50,
        y: 50,
        transition: {
            duration: 0.3
        }
    },
    closed: {
        opacity: 0,
        scale: 0,
        x: 0,
        y: 0,
        transition: {
            duration: 0.3
        }
    }
}

const CardList = () => {
    const [selected, setSelected] = useState(-1)

    const handleClick = (index: number) => {
        if (index === selected) { 
            setSelected(-1)
        } else {
            setSelected(index)
        }
    }

    return (
        <div className={`${styles.contentList}`}>
            {bars.map((_, index) => {
                return (
                    <motion.div 
                        className={`${styles.cardWrapper} ${selected === index ? styles.open : ''}`} 
                        onClick={() => handleClick(index)}
                        key={index}
                        style={{ originX: 0, originY: 0 }} // not sure if this contributes to anyting
                        transition={{ duration: 4 }}
                        >
                        <motion.div
                            layout
                            className={`${styles.card} ${styles['card--' + index]}`}
                        >
                            <TurnBack 
                                className={`${styles.turnBackButton} ${styles['turnBackButton--' + index]}`} 
                                variants={variants}
                                isSelected={selected === index}/>
                        </motion.div>
                    </motion.div>
                )
            })}
        </div>
    )
}

interface SVGProps {
    className: string,
    variants: AnimationProps["variants"],
    isSelected: boolean
}

const TurnBack = ({ className, variants, isSelected }: SVGProps) => {

    return (
        <motion.img
            style={{ originX: 0, originY: 0 }}
            src={Exclude} 
            layout
            className={className}
            variants={variants}
            initial={false}
            animate={isSelected ? 'opened' : 'closed'}
        />
    )
}

export default CardList;

