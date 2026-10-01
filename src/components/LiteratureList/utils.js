/**
 * Экранирует спецсимволы регулярного выражения.
 * @param {string} value
 * @returns {string}
 */
export function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Фильтрует список по поисковому запросу (без учёта регистра).
 * @param {{ n: number, text: string }[]} items
 * @param {string} query
 * @returns {{ n: number, text: string }[]}
 */
export function filterItems(items, query) {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => item.text.toLowerCase().includes(q));
}

/**
 * Формирует текстовое содержимое для скачивания.
 * @param {{ n: number, text: string }[]} items
 * @returns {string}
 */
export function buildTextContent(items) {
    return items.map((item) => `${item.n}. ${item.text}`).join("\n\n");
}

/**
 * Скачивает текст как .txt файл (с BOM — корректная кириллица в Windows).
 * @param {string} content
 * @param {string} fileName
 */
export function downloadAsTextFile(content, fileName) {
    const blob = new Blob([`\uFEFF${content}`], {
        type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}