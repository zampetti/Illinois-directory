import React from 'react';
import styles from './listView.scss';

import ListItem from './listItem'

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

type ListProps = { data: DeptProfile[] };
 
const ListView = ({ data }: ListProps) => {
    
    return (
        <div className={styles.body}>
            {data.map((d) => {
                return (
                    <ListItem key={d.id} data={d} />
                )
            })}
        </div>
    )
}
 
export default ListView;