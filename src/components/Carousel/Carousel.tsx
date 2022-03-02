import styles from './Carousel.module.scss'
import { motion, MotionValue, ResolvedValues, useAnimation, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react';
import { TransformProperties } from 'framer-motion/types/motion/types';

const items = ['A', 'B', 'C']

interface templateProps {
    x: MotionValue<number>
    rotateY: MotionValue<number>
}

const Carousel = () => {
    const wrapperRef = useRef<any>(null); // configure for TS later
    const controls = useAnimation();
    const x = useMotionValue(0);
    const rotateYRange = [-45, 0, 45];

    const xRange = [375/2, 0, -375/2];
    const rotateY = useTransform(x, xRange, rotateYRange);
    const scale = useTransform(x, xRange, [0.9, 1, 0.9]);
    const transformOrigin = useTransform(x, latestX => {
        latestX = -latestX;
        console.log(latestX)
        if(latestX >= 1) return '0% 50% 0px';
        else return '100% 50% 0px';
        // ['0% 50% 0px', '100% 50% 0px', '100% 50% 0px']
    });

    // useEffect(() => {
    //     xRange = [0, -wrapperRef.current.clientWidth];

    //     rotateY = useTransform(x, xRange, rotateYRange);
    //     scale = useTransform(x, xRange, [1, 0.95]);
    //     transformOrigin = useTransform(x, xRange, ['0% 50% 0px', '100% 50% 0px'], { clamp: false });
    // }, []);

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
            <div className={styles.cardList} ref={wrapperRef}>
                {items.map((_, index) => {
                    return (
                        <div 
                            key={index}
                            className={`${styles.cardWrapper}`}
                        >
                            <motion.div
                                className={`${styles.card} ${styles['card--' + index]}`}
                                drag="x"
                                dragMomentum={false}
                                dragElastic={0.9}
                                dragConstraints={wrapperRef}
                                onDragEnd={handleDragEnd}
                                transformTemplate={
                                    // ({ x, rotateY }) => `perspective(200px) rotateY(${rotateY}) translateX(${x})`
                                    ({ x, rotateY, scale }) => `perspective(400px) scale(${scale}) rotateY(${rotateY}) translateX(${x})`
                                }
                                style={{x, rotateY, scale, transformOrigin }}
                                animate={controls}
                            />
                        </div>
                    )})}
            </div>
        </div>
    )
}

export default Carousel;