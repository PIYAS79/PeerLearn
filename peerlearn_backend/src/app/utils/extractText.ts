import fs from "fs";
import mammoth from "mammoth";
import type { Upload_File_Type } from "../module/QUESTION/question.interface";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import pptx2json from "pptx2json";
import Tesseract from "tesseract.js";
// Tesseract is a OCR (Optical Character Recognition)

export const extractText = async (
    file: Upload_File_Type
): Promise<string> => {
    const filePath = file.path;
    const ext = file.originalname.split(".").pop()?.toLowerCase();

    if (!ext) {
        throw new Error("Invalid file extension");
    }

    /* ---------------- PDF ---------------- */
    if (ext === "pdf") {
        const data = new Uint8Array(fs.readFileSync(filePath));
        const pdf = await pdfjsLib.getDocument({ data }).promise;

        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map((item: any) => item.str).join(" ") + "\n";
        }
        return text;
    }

    /* ---------------- DOCX ---------------- */
    if (ext === "docx") {
        const result = await mammoth.extractRawText({ path: filePath });
        return result.value;
    }

    /* ---------------- TXT ---------------- */
    if (ext === "txt") {
        return fs.readFileSync(filePath, "utf-8");
    }

    /* ---------------- PPTX ---------------- */
    if (ext === "pptx") {
        const slides = await pptx2json(filePath);
        let text = "";

        slides.slides.forEach((slide: any) => {
            slide.shapes.forEach((shape: any) => {
                if (shape.text) {
                    text += shape.text + "\n";
                }
            });
        });
        return text;
    }

    /* ---------------- IMAGE OCR ---------------- */
    if (["jpg", "jpeg", "png"].includes(ext)) {
        const result = await Tesseract.recognize(
            filePath,
            "eng",
            {
                logger: () => { }
            }
        );

        return result.data.text;
    }

    throw new Error("Unsupported file type");
};
