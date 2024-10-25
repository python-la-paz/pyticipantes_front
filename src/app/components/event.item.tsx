import { EventProps } from "@/const";
import { routes } from "@/lib/urls";
import dayjs from "dayjs";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";
import 'dayjs/locale/es';

const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
};
const randomColors = ['#FF5722', '#4CAF50', '#2196F3', '#FFC107', '#9C27B0', '#03A9F4'];
export default function EventItem(props: EventProps) {
    dayjs.locale('es');
    const event = props;
    const backgroundColor = !event.image ? randomColors[Math.floor(Math.random() * randomColors.length)] : 'transparent';
    const link = routes.event.replace('{id}', event._id);
    return (
        <Card sx={{
            marginLeft:{xs:"40px", md: "20px"}, 
            marginRight:{xs:"40px", md: "20px"}, 
            borderRadius: '20px', 
            boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.25)', 
            alignSelf:"center"}}>
            <Link href={link} passHref>
                <CardActionArea>
                    {event.image ? (
                        <CardMedia
                            component="img"
                            height="180"
                            image={event.image.url}
                            alt={event.title}
                        />
                    ) : (
                        <CardMedia
                            component="div"
                            sx={{
                                height: 140,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor,
                                color: 'white',
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                            }}
                        >
                        </CardMedia>
                    )}
                    <CardContent sx={{ backgroundColor: "white" }}>
                        <Typography color="primary" fontSize="14px">
                            {event.location}, Bolivia • {dayjs(event.date).format("DD [de] MMMM [de] YYYY")}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div" color="secondary" fontSize="20px">
                            {event.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }} fontSize="16px">
                            {truncateText(event.description, 125)}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>
    );
}