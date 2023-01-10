import { ChangeEvent } from "react";

export default function TextArea({ handleChange, name, error, placeholder }: { name: string; handleChange?: (event: any) => void; error?: boolean; placeholder?: string }) {
    return <textarea name={name ?? ""} onChange={handleChange} className={`focus:border-purple transition duration-300 border-2 outline-none bg-[rgba(0,0,0,0.05)] border-[rgba(0,0,0,0.4)] p-2 ${error ? "border-danger" : ""}`} rows={5} placeholder={placeholder ?? ""}></textarea>;
}
