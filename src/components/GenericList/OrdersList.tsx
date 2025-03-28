// import * as React from 'react';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import CommentIcon from '@mui/icons-material/Comment';
// import IconButton from '@mui/material/IconButton';
// import { Button, ButtonGroup } from '@mui/material';
// import OrderDetails from './OrderDetails';

// export default function GutterlessList(props: any) {
//     const { data } = props
//     console.log("🚀 ~ GutterlessList ~ data:", data)


//     return (
//         <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
//             {
//                 data.map((items: any, index: any) => (
//                     <ListItem
//                         key={items}
//                         disableGutters
//                         secondaryAction={
//                             // <IconButton aria-label="comment">
//                             //     <CommentIcon />
//                             // </IconButton>
//                             <ButtonGroup variant="contained" size="small" aria-label="Small button group">

//                                 <Button
//                                     size='small'
//                                 >Tomar</Button>
//                                 <Button
//                                     size='small'
//                                 >En Espera</Button>
//                                 <Button
//                                     size='small'
//                                 >Terminado</Button>
//                             </ButtonGroup>
//                         }
//                     >
//                         <div key={index}>
//                             <OrderDetails
//                                 items={items}
//                                 inde={index}
//                             />

//                         </div>

//                         {/* 
//                         <ListItemText primary={`Line item ${value}`} /> */}
//                     </ListItem>
//                 ))}
//         </List>
//     );
// }


import React from 'react';
import {
    List,
    ListItem,
    IconButton,
    ButtonGroup,
    Button,
    ListItemText,
    Box,
    useTheme
} from '@mui/material';
import OrderDetails from './OrderDetails';

export default function GutterlessList(props: any) {
    const { data } = props;
    const theme = useTheme();





    return (
        <List sx={{
            width: '100%',
            maxWidth: '100%', // Elimina el límite de 360px
            bgcolor: 'background.paper',
            p: 1
        }}>
            {data.map((items: any, index: number) => (
                <ListItem
                    key={`${items.id || index}`} // Usa un identificador único real si existe
                    disableGutters
                    sx={{
                        mb: 1,
                        p: 1,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 1,
                        '&:hover': {
                            bgcolor: 'action.hover'
                        }
                    }}
                    secondaryAction={
                        <ButtonGroup
                            orientation="vertical"
                            variant="text"
                            size="small"
                            sx={{
                                '& .MuiButton-root': {
                                    minWidth: 0,
                                    px: 1,
                                    fontSize: '0.75rem',
                                    paddingRight:'0.75rem',
                                }
                            }}
                        >
                            <Button onClick={() => handleAction('take', items)}>
                                Tomar
                            </Button>
                            <Button onClick={() => handleAction('wait', items)}>
                                Espera
                            </Button>
                            <Button onClick={() => handleAction('complete', items)}>
                                Listo
                            </Button>
                        </ButtonGroup>
                    }
                >
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flex: 1,
                        gap: 1
                    }}>
                        <OrderDetails order={items} index={index} />
                    </Box>

                </ListItem>
            ))}
        </List>
    );

    function handleAction(action: string, order: any) {
        console.log(`${action} order:`, order);
        // Implementa tu lógica aquí
    }
}



// {
//     "type": "order",
//     "data": {
//         "orderType": "mesa",
//         "dataTypeOrder": "Mesa: 222",
//         "cart": [
//             {
//                 "id": "1743174669777",
//                 "itemId": 1,
//                 "name": "Lasagna Clásica",
//                 "price": 17.5,
//                 "quantity": 1,
//                 "extras": [
//                     {
//                         "name": "Queso_parmesano",
//                         "price": 2000
//                     },
//                     {
//                         "name": "Jalapeños",
//                         "price": 1000
//                     },
//                     {
//                         "name": "Salsa_extra",
//                         "price": 1500
//                     }
//                 ],
//                 "extrasTotal": 4500
//             }
//         ],
//         "comments": "asdfasdf",
//         "id": "1743174675681"
//     },
//     "username": "undefined",
//     "timestamp": "2025-03-28T15:11:15.681Z"
// }