import styles from './Card.module.scss';
import { motion, MotionValue, useTransform } from 'framer-motion'

interface CardProps {
    index: number,
    x: MotionValue<number>,
    marginRight: number,
    width: number
}

const Card = ({ index, x, marginRight, width }:CardProps) => {
    const animationBias = -1;
    const length = marginRight + width
    const cardX = useTransform(x, latestX => {
        latestX = animationBias * latestX;
        const middlePoint = (index * length) + (width / 2)

        if (latestX < middlePoint - width) return -width
        else if (latestX > middlePoint + width) return width
        else return latestX - (index * length)
    });
    const xRange = [-length/2, 0, length/2];
    const rotateYRange = [-45, 0, 45];
    const scaleRange = [0.9, 1, 0.9]
    const rotateY = useTransform(cardX, xRange, rotateYRange);
    const scale = useTransform(cardX, xRange, scaleRange);
    const getCloser = useTransform(cardX, xRange, [-25, 0, 25]);
    const transformOrigin = useTransform(x, latestX => {
        if (length * index >= animationBias * latestX) return '100% 50% 0px' 
        else return '0% 50% 0px'
    });

    return (
        <motion.div
            className={`${styles.card} ${styles['card--' + index]}`}

            transformTemplate={
                // ({ x, rotateY }) => `perspective(200px) rotateY(${rotateY}) translateX(${x})`
                ({ rotateY, scale , x}) => {
                    console.log(x)
                    // x = x.replace('px', '%')
                    return `perspective(400px) scale(${scale}) rotateY(${rotateY}) `
                }
            }
            style={{ rotateY, scale, transformOrigin, x: getCloser }}
        />
    )
}

export default Card;