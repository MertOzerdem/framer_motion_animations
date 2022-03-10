import styles from "./DynamicGrid.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface SVG {
    clickEvent: Function,
    className: string
}

const items = ["A", "B", "C", "D", "E", "F"];

const GridSvg = ({clickEvent, className}:SVG) => {
	return (
		<motion.svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="0 0 24 24"
			fill="none"
			stroke="rgb(255, 255, 255)"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
            className={className}
            onClick={() => clickEvent()}
            initial={false}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
		>
			<rect x="3" y="3" width="7" height="7"></rect>
			<rect x="14" y="3" width="7" height="7"></rect>
			<rect x="14" y="14" width="7" height="7"></rect>
			<rect x="3" y="14" width="7" height="7"></rect>
		</motion.svg>
	);
};

const ListSvg = ({clickEvent, className}:SVG) => {
	return (
		<motion.svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="0 0 24 24"
			fill="none"
			stroke="rgb(255, 255, 255)"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
            className={className}
            onClick={() => clickEvent()}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
		>
			<line x1="8" y1="6" x2="21" y2="6"></line>
			<line x1="8" y1="12" x2="21" y2="12"></line>
			<line x1="8" y1="18" x2="21" y2="18"></line>
			<line x1="3" y1="6" x2="3.01" y2="6"></line>
			<line x1="3" y1="12" x2="3.01" y2="12"></line>
			<line x1="3" y1="18" x2="3.01" y2="18"></line>
		</motion.svg>
	)
};


const margin = '20px'
const variants = {
	list: {
		height: `calc(50% - ${margin})`,
		width: `calc(100% - ${margin})`,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 25,
        }
	},
	block: {
		height: `calc(100% - ${margin})`,
		width: `calc(50% - ${margin})`,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 25,
        }
	},
};

const DynamicGrid = () => {
	const [isList, setIsList] = useState(false);

	const getList = (items: Array<string>) => {
		let tempItems = [];
		const newItems = items.map((_, index) => {
			return (
				<motion.div
					className={styles.item}
					key={index}
					variants={variants}
					initial="block"
					animate={isList ? "list" : "block"}
				/>
			);
		});

		for (let i = 0; i < newItems.length / 2; i++) {
			tempItems[i] = (
				<div key={i} className={styles.itemWrapper}>
					{newItems[2 * i]}
					{newItems[2 * i + 1]}
				</div>
			);
		}

		return tempItems;
	};

	return (
		<div className={styles.listContainer}>
            <AnimatePresence>
                {isList ? 
                    <ListSvg className={styles.toggleButton} key={2} clickEvent={() => setIsList(!isList)}/> :
                    <GridSvg className={styles.toggleButton} key={1} clickEvent={() => setIsList(!isList)}/> 
                }
            </AnimatePresence>
			{getList(items)}
		</div>
	);
};

export default DynamicGrid;
