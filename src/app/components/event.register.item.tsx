import { accessTokenState } from '@/atoms';
import { EventRegisterProps } from '@/const';
import { fetchImage } from '@/lib/http/events';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import InfoIcon from '@mui/icons-material/Info';
import { Chip, IconButton, Stack, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { blue, green, orange, red } from '@mui/material/colors';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React from 'react';
import { useRecoilState } from 'recoil';

function stringAvatar(color: string) {

    return {
        sx: {
            bgcolor: color
        },
    };
}

export default function EventRegisterItem(props: { register: EventRegisterProps }) {
    const [token] = useRecoilState(accessTokenState);
    dayjs.extend(customParseFormat);
    const downloadImage = (name: string = "") => {
        if (!name) return { content: "" };
        fetchImage(name, token).then((response) => {
            return response.content;
        }).catch((error) => {
            console.error(error);
            return { content: "" };
        });
        return { content: "" };
    }
    const status = () => {
        switch (props.register.status) {
            case 'accepted': return (
                <Avatar  {...stringAvatar(green[400])} >
                    <CheckCircleOutlineIcon />
                </Avatar>
            );
            case 'rejected': return (
                <Avatar {...stringAvatar(red[400])}>
                    <HighlightOffIcon />
                </Avatar>
            );
            case 'pending': return (
                <Avatar {...stringAvatar(orange[400])}>
                    <AccessTimeIcon />
                </Avatar>
            );
            default: return (
                <Avatar {...stringAvatar(blue[400])}>
                    <InfoIcon />
                </Avatar>
            );
        }
    }
    return (
        <ListItem alignItems='flex-start'
            secondaryAction={
                <React.Fragment>
                    {props.register.document_upload && (
                        <IconButton edge="end" onClick={() => downloadImage(props.register.document_upload?.name)} aria-label="download">
                            <AttachFileIcon />
                        </IconButton>
                    )}
                </React.Fragment>
            }>

            <ListItemAvatar>
                {status()}
            </ListItemAvatar>
            <ListItemText primary={
                <React.Fragment>
                    <Stack direction="row" spacing={1}>
                        <Typography>
                            {dayjs(props.register.date).format("DD/MM/YYYY HH:mm")}
                        </Typography>
                        {
                            props.register.note && (
                                <Chip variant="outlined" size="small" label={props.register.note} />
                            )
                        }
                    </Stack>
                </React.Fragment>}
                secondary={
                    <React.Fragment>
                        <Typography variant='body1'>
                            <Stack direction="row" spacing={1}>
                                {props.register.additional_info?.map((info, index) => (
                                    <Chip size="small" key={index} label={Array.isArray(info.answer) ? info.answer.join(", ") : info.answer} />
                                ))}
                            </Stack>
                        </Typography>
                    </React.Fragment>
                }
            ></ListItemText>
        </ListItem>
    )
}
