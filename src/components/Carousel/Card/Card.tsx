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
    const scaleRange = [0.7, 1, 0.7]
    const rotateY = useTransform(cardX, xRange, rotateYRange);
    const scale = useTransform(cardX, xRange, scaleRange);
    const skidCardX = useTransform(cardX, xRange, [-65, 0, 65]);
    const transformOrigin = useTransform(x, latestX => {
        if (length * index >= animationBias * latestX) return '100% 50% 0px' 
        else return '0% 50% 0px'
    });

    return (
        <motion.div
            className={`${styles.card} ${styles['card--' + index % 3]}`}
            transformTemplate={
                ({ rotateY, scale , x}) => {
                    x = x && x.toString().replace('px', '%')
                    return `scale(${scale}) rotate3d(0, 1, 0, ${rotateY}) translateX(${x})`
                }
            }
            style={{ rotateY, scale, transformOrigin, x: skidCardX}}
        />
    )
}

export default Card;