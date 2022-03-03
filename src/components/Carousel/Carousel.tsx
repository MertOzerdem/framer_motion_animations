import styles from './Carousel.module.scss'
import { motion, useAnimation, useMotionValue } from 'framer-motion'
import { useEffect, useRef, useState } from 'react';
import Card from './Card/Card';

const items = ['A', 'B', 'C']

interface Shape {
    marginRight: number,
    width: number,
}

const Carousel = () => {
    const [showCards, setShowCards] = useState(false)
    const [shape, setShape] = useState<Shape>({ marginRight: 0, width: 0 })
    const wrapperRef = useRef<any>(null); // configure for TS later
    const controls = useAnimation();
    const x = useMotionValue(0);

    useEffect(() => {
        setShape({
            marginRight: Number(window.getComputedStyle(wrapperRef.current.childNodes[0]).getPropertyValue('margin-right').replace('px', '')),
            width: wrapperRef.current.getBoundingClientRect().width
        })
    }, [])

    useEffect(() => {
        setShowCards(true)
    }, [shape])

    const handleDragEnd = () => {
        if (wrapperRef.current) {
            let animationDirection = -1;
            let marginValue = Number(window.getComputedStyle(wrapperRef.current.childNodes[0]).getPropertyValue('margin-right').replace('px', ''));
            let targetItem = animationDirection * Number((x.get() / wrapperRef.current.clientWidth).toFixed());
            let maxNumberOfDragTarget = items.length - 1

            if (maxNumberOfDragTarget < targetItem) {
                targetItem = maxNumberOfDragTarget
            } else if (targetItem < 0) {
                targetItem = 0
            }

            let targetXValue = animationDirection * targetItem * (wrapperRef.current.clientWidth + marginValue)

            controls.start({
                x: targetXValue,
                transition: {
                    duration: 0.3,
                }
            })
        }
    }

    return (
        <div className={styles.contentWrapper}>
            <div className={styles.cardList} ref={wrapperRef}>
                {items.map((_, index) => {
                    return (
                        <motion.div
                            key={index}
                            className={`${styles.cardWrapper}`}
                            drag="x"
                            dragMomentum={false}
                            dragElastic={0.9}
                            onDragEnd={handleDragEnd}
                            animate={controls}
                            style={{ x }}
                        >
                            {showCards && <Card x={x} index={index} marginRight={shape.marginRight} width={shape.width} />}
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}

export default Carousel;