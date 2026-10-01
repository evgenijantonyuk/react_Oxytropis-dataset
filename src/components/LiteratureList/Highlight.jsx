import React from "react";
import { escapeRegExp } from "./utils";

/**
 * Подсвечивает все совпадения `query` внутри `text`.
 * @param {{ text: string, query: string }} props
 */
export default function Highlight({ text, query }) {
    const q = query.trim();
    if (!q) return text;

    const parts = text.split(new RegExp(`(${escapeRegExp(q)})`, "gi"));
    const lower = q.toLowerCase();

    return parts.map((part, i) =>
        part.toLowerCase() === lower ? (
            <mark key={i} className="lit-mark">
                {part}
            </mark>
        ) : (
            <React.Fragment key={i}>{part}</React.Fragment>
        )
    );
}