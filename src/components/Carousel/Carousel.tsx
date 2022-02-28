import styles from './Carousel.module.scss'
import { motion, useAnimation, useMotionValue } from 'framer-motion'
import { useRef } from 'react';

const items = ['A', 'B', 'C']

const Carousel = () => {
    const wrapperRef = useRef<any>(null); // configure for TS later
    const x = useMotionValue(0);
    const controls = useAnimation();

    // useEffect(() => x.onChange(latest => {
    //     if (wrapperRef.current) {
    //         console.log(latest)
    //         if(-latest > (wrapperRef.current.clientWidth / 2)) {
    //             controls.start({
    //                 x: -wrapperRef.current.clientWidth - 25,
    //                 transition: {
    //                     duration: 0.07,
    //                 }
    //             })
    //         }
    //     }
    // }), [])

    const handleDragEnd = () => {
        if (wrapperRef.current) {
            let animationDirection = -1;
            let marginValue = Number(window.getComputedStyle(wrapperRef.current.childNodes[0]).getPropertyValue('margin-right').replace('px', ''));
            let targetItem = animationDirection * Number((x.get() / wrapperRef.current.clientWidth).toFixed());
            let maxNumberOfDragTarget = items.length - 1
            
            if(maxNumberOfDragTarget < targetItem) {
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
            <div className={styles.cardWrapper} ref={wrapperRef}>
                {items.map((_, index) => {
                    return <motion.div
                        className={`${styles.card} ${styles['card--' + index]}`}
                        key={index}
                        drag="x"
                        dragMomentum={false}
                        dragElastic={0.9}
                        dragConstraints={wrapperRef}
                        onDragEnd={handleDragEnd}
                        style={{x}}
                        animate={controls}
                    />
                })}
            </div>
        </div>
    )
}

export default Carousel;