import { Paper, Typography } from "@mui/material";
import Link from "next/link";

export default function FooterBar(){
    return (
        <Paper sx={{
            marginTop: 'calc(10% + 60px)',
            position: 'fixed',
            bottom: 0,
            width: '100%',
            backgroundColor: '#00000008',
        }} component="footer" square >
            <Typography sx={{ padding: '0' }} variant="caption" align="left" color="text.secondary" component="p">
                <a href="/content/privacy-policy" target="_blank" rel="noopener noreferrer" aria-label="Privacy Policy">|Privacy policy </a>
                <Link href="/content/terms-of-service" target="_blank" rel="noopener noreferrer" aria-label="Terms of service">|Terms of service </Link>
                <Link href="/content/about-us" target="_blank" rel="noopener noreferrer" aria-label="About">|About </Link>
                <a href="mailto:pythonlapaz@gmail.com" aria-label="Contact" >|Contact </a>
                {`|${new Date().getFullYear()}`}
            </Typography>
        </Paper>
    );
}