import styles from './Card.module.scss';
import { motion, MotionValue, useTransform } from 'framer-motion'

interface CardProps {
    index: number,
    x: MotionValue<number>,
    rotateYRange?: number[],
    marginRight: number,
    width: number
}

const Card = ({ index, x, rotateYRange, marginRight, width }:CardProps) => {
    const animationBias = -1;
    const length = marginRight + width
    const cardX = useTransform(x, latestX => {
        latestX = animationBias * latestX;
        let leftSquareStart = latestX - (latestX/2)
        let rightSquareEnd = latestX + (latestX/2)
        let middlePoint = (index * length) + (width / 2)

        index === 0 && console.log('latestX', latestX)
        if (latestX < middlePoint - width) {
            index === 0 && console.log('left')
            return -width
        } else if (latestX > middlePoint + width) {
            index === 0 && console.log('right')
            return width
        }
        else {
            index === 0 && console.log('middle')
            return (latestX) % length
        }

        // let newX = (latestX - (index * marginRight)) % width
        let newX = (latestX) % length
        index === 1 && console.log('latestX', latestX)
        index === 1 && console.log('newX', newX)
        return newX
        
        // let leftSquareStart = latestX - (latestX/2)
        // let rightSquareEnd = latestX + (latestX/2)

        // if (middlePoint - width <= latestX && latestX < middlePoint) {
        //     return animationBias * (latestX - length) * (index + 1);
        // } else if (middlePoint <= latestX && latestX < middlePoint + width) {
        //     return animationBias * ((latestX - length) * (index + 1) + width);
        // }
        // else {
        //     return animationBias * length
        // }
    });
    const xRange = [-length/2, 0, length/2]; // doğru değiştirme bunu
    // const xRange = [width, 0, -width];
    rotateYRange = [-45, 0, 45]; // doğru değiştirme bunu
    const rotateY = useTransform(cardX, xRange, rotateYRange);
    const scale = useTransform(cardX, xRange, [0.9, 1, 0.9]);
    const transformOrigin = useTransform(x, latestX => {
        latestX = animationBias * latestX;
        let leftSide = (length * index);
        // let rightSide = leftSide + width;

        // index === 2 && console.log(leftSide)
        // doğru değiştirme bunu
        if (leftSide >= latestX) {
            return '100% 50% 0px'
        } else if (leftSide < latestX) {
            return '0% 50% 0px'
        }

        // if(latestX >= 1) return '0% 50% 0px';
        // else return '100% 50% 0px';
    });

    // useEffect(() => {
    //     console.log('marginRight', marginRight)
    //     console.log('width', width)
    // },[])

    return (
        <motion.div
            className={`${styles.card} ${styles['card--' + index]}`}

            transformTemplate={
                // ({ x, rotateY }) => `perspective(200px) rotateY(${rotateY}) translateX(${x})`
                ({ rotateY, scale }) => {
                    // console.log(rotateY)
                    return `perspective(400px) scale(${scale}) rotateY(${rotateY})`
                }
            }
            style={{ rotateY, scale, transformOrigin }}
            // animate={controls}
        />
    )
}

export default Card;