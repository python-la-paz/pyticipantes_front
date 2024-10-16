import { EventProps } from "@/const";
import { routes } from "@/lib/urls";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";
const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
};
const randomColors = ['#FF5722', '#4CAF50', '#2196F3', '#FFC107', '#9C27B0', '#03A9F4'];
export default function EventItem(props: EventProps) {
    const event = props;
    const backgroundColor = !event.image ? randomColors[Math.floor(Math.random() * randomColors.length)] : 'transparent';
    const link = routes.event.replace('{id}', event._id);
    return (
        <Card sx={{ maxWidth: 345 }}>
            <Link href={link} passHref>
                <CardActionArea>
                    {event.image ? (
                        <CardMedia
                            component="img"
                            height="140"
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
                            {event.title}
                        </CardMedia>
                    )}
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {event.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {truncateText(event.description, 125)}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>
    );
}