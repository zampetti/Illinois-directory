import React from 'react';
import styles from './cardItem.scss';

type DeptProfile = {
    id: number
    deptId: number
    name: string
    description: string
    email: string
    first_name: string
    last_name: string
    title: string
    imageUrl: string
}

type CardProps = { data: DeptProfile };
 
const CardItem = ({ data }: CardProps) => {
    
    return (
        <div className={styles.body}>
            <div className={styles.department}>
                <span>{data.name}</span>
            </div>
            <div className={styles.image}>
                <img src={data.imageUrl} />
            </div>
            <div className={styles.profile}>
                <span><strong>{data.last_name}</strong>, {data.first_name}</span><br />
                <span>{data.title}</span>
                <p>{data.email}</p>
                <p>{data.description}</p>
            </div>
        </div>
    )
}
 
export default CardItem;
