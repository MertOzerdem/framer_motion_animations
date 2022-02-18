import styles from './ItemImage.module.scss';
import { motion } from 'framer-motion';
import { useState } from 'react';

type props = {
    img: string,
    setOpenImageId: React.Dispatch<React.SetStateAction<number>>
    index: number,
    openImageId: number
}

const variants = {
    wide: {
        opacity: 1,
        // display: 'block'
        // display: 'initial'
    },
    normal: {
        opacity: 1,
        // height: '30vh',
        // width: 'auto',
        // display: 'initial'
    },
    closed: {
        opacity: 0,
        // transitionEnd: {
        //     display: 'none'
        // }
    }
}

const ItemImage = ({ img, index, setOpenImageId, openImageId }: props) => {
    const [isOpen, setIsOpen] = useState(false);

    const imgClickHandler = () => {
        setIsOpen(!isOpen);
        setOpenImageId(prev => {
            return prev === index ? 0 : index;
        })
        console.log(isOpen);
    }

    return (
        <motion.div
            className={styles.itemWrapper}
            layout
            variants={variants}
            initial='closed'
            animate={openImageId === 0 ? 'normal' : openImageId === index ? 'wide' : 'closed'}
            transition= {{ delay: 0.2, duration: 0.5, ease: "easeInOut"}}
            exit={{ opacity: 0, transition: { duration: 0.2, ease: "linear" }}}
        >
            <motion.img
                src={img} 
                className={`${styles.ItemImage} ${isOpen ? styles.open : ''}`}
                variants={variants} 
                transition= {{ delay: 0.2, duration: 0.5, ease: "easeInOut"}}
                onClick={imgClickHandler}
            />
        </motion.div>
    );
}

export default ItemImage;