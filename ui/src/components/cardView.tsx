import React from 'react';
import styles from './cardView.scss';

import CardItem from './cardItem'

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

type CardProps = { data: DeptProfile[] };
 
const CardView = ({ data }: CardProps) => {
    
    return (
        <div className={styles.body}>
            {data.map((d) => {
                return (
                    <CardItem key={d.id} data={d} />
                )
            })}
        </div>
    )
}
 
export default CardView;