import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useRecoilState } from 'recoil';
import { dialogOpenState } from '@/atoms';
import { Box } from '@mui/material';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ children, props }: {
    children: React.ReactNode, props: {
        title: string,
        open: boolean,
        openFunction?: () => void,
        closeFunction?: () => void,
        saveFunction?: () => void,
        saveText?: string,
    }
}) {

    const handleClickOpen = () => {
        if (props.openFunction)
            props.openFunction();
    };

    const handleClose = () => {
        if (props.closeFunction)
            props.closeFunction();
    };
    const handleSave = () => {
        if (props.saveFunction)
            props.saveFunction();
    }



    return (
        <React.Fragment>
            <Dialog
                fullScreen
                open={props.open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {props.title}
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleSave}>
                            {props.saveText || 'Guardar'}
                        </Button>
                    </Toolbar>
                </AppBar>
                <Box sx={{
                    height: '100vh',
                    margin: 'auto', padding: '10px'
                }}>
                    {children}
                </Box>
            </Dialog>
        </React.Fragment>
    );
}