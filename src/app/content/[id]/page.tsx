"use client"
import { pageQuery } from "@/atoms/selectors.page";
import { PageProps } from "@/const";
import { useEffect, useState } from "react";
import { useRecoilValueLoadable } from "recoil";
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkHtml from 'remark-html'
import Grid from "@mui/material/Grid2";
export default function Page({ params }: { params: { id: string } }) {
    const pageLoadable = useRecoilValueLoadable(pageQuery({ id: params.id }));
    const [html, setHtml] = useState<string>("");
    const loadContent = async (content: PageProps) => {
        const file = await unified()
            .use(remarkParse)
            .use(remarkHtml)
            .process(content.html)
        setHtml(file.toString())
    };
    if (pageLoadable.state === "loading") {
        return <p>Loading...</p>;
    }
    if (pageLoadable.state === "hasError") {
        return <p>Error: {pageLoadable.contents}</p>;
    }
    const page = pageLoadable.contents.content;
    loadContent(page);
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 12, lg: 12, xl: 12 }}>
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </Grid>
        </Grid>
    );
}
