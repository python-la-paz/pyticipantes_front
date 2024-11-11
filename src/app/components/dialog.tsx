import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import { TransitionProps } from '@mui/material/transitions';
import Typography from '@mui/material/Typography';
import * as React from 'react';

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
                <AppBar sx={{ position: 'fixed' }}>
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
                    margin: 'auto', padding: '10px',
                    mt: 8
                }}>
                    {children}
                </Box>
            </Dialog>
        </React.Fragment>
    );
}