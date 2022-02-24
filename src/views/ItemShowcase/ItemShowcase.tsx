import styles from './ItemShowcase.module.scss';
import img1 from '../../images/img1.jpg'
import img2 from '../../images/img2.jpg'
import img3 from '../../images/img3.jpg'
import img4 from '../../images/img4.jpg'
import ItemImage from "../../components/ItemImage/ItemImage";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { useState } from 'react';

const IMAGES = [
    {
        id: 1,
        img: img1
    },
    {
        id: 2,
        img: img2
    },
    {
        id: 3,
        img: img3
    },
    {
        id: 4,
        img: img4
    },
]

const ItemShowcase = () => {
    const [openImageId, setOpenImageId] = useState(0);

    const getImages = () => {
        if(openImageId === 0) {
            return IMAGES.map((image) => {
                return <ItemImage
                    key={image.id} 
                    img={image.img}
                    index={image.id}
                    setOpenImageId={setOpenImageId}
                    openImageId={openImageId}
                    />
            })
        } else {
            let newImages = IMAGES.filter((image) => {
                return image.id === openImageId
            })

            return newImages.map((image) => {
                return <ItemImage 
                    key={image.id} 
                    img={image.img}
                    index={image.id}
                    setOpenImageId={setOpenImageId}
                    openImageId={openImageId}
                    />
            })
        }
    }

    return (
        <AnimateSharedLayout>
            <motion.div 
                className={styles.imageWrapper} 
                layout
            >
                <AnimatePresence>
                    {getImages()}
                </AnimatePresence>
            </motion.div>
        </AnimateSharedLayout>
    )
}

export default ItemShowcase;