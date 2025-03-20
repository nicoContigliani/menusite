// import React from 'react';

// const ShowItemMenu = (props: any) => {
//     const { memoData, title } = props;

//     return (
//         <div>
//             <h2>ShowItemMenu</h2>
//             {memoData?.map(([sectionName, items]: [string, any[]], index: number) => (
//                 <div key={index}>
//                     <h3>{sectionName}</h3>
//                     <div>
//                         {items.map((item, itemIndex) => (
//                             <div key={itemIndex}>
//                                 <div>
//                                     {item.Name}--{item.Description}--<span>{item.Price}</span>
//                                 </div>


//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default ShowItemMenu;

import React, { useState } from 'react';
import { Checkbox, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';

// Definir un tipo para los ítems
type Item = {
    Name: string;
    Description: string;
    Price: number;
};

// Definir un tipo para memoData
type Section = [string, Item[]];

interface ShowItemMenuProps {
    memoData: Section[];
    title: string;
}

const ShowItemMenu: React.FC<ShowItemMenuProps> = (props) => {
    const { memoData, title } = props;
    const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
    console.log("🚀 ~ checkedItems:", checkedItems)

    const handleToggle = (sectionIndex: number, itemIndex: number) => () => {
        const key = `${sectionIndex}-${itemIndex}`;
        setCheckedItems((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <div>
            <h2>{title}</h2>
            {memoData?.map(([sectionName, items], sectionIndex) => (
                <div key={sectionIndex}>
                    <h3>{sectionName}</h3>
                    <List>
                        {items.map((item, itemIndex) => {
                            const key = `${sectionIndex}-${itemIndex}`;
                            return (
                                <ListItem
                                    key={itemIndex}
                                    dense
                                    component="button" // Usar component en lugar de button
                                    onClick={handleToggle(sectionIndex, itemIndex)}
                                >
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={!!checkedItems[key]}
                                            tabIndex={-1}
                                            disableRipple
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`${item.Name} -- ${item.Description}`}
                                        secondary={`$${item.Price}`}
                                    />
                                </ListItem>
                            );
                        })}
                    </List>
                </div>
            ))}
        </div>
    );
};

export default ShowItemMenu;