import { ChangeEvent } from "react";

export default function Input({ handleChange, value, name, error, placeholder, type }: { value?: any; handleChange?: (event: ChangeEvent<HTMLInputElement>) => void; error?: boolean; placeholder?: string; type?: string; name?: null | string }) {
    return (
        <input
            defaultValue={value ?? null}
            onChange={handleChange}
            className={`rounded-sm focus:border-purple transition duration-300 border-2 outline-none bg-[rgba(0,0,0,0.02)] border-[rgba(0,0,0,0.2)] p-2 ${error ? "border-danger" : ""}`}
            placeholder={placeholder ? `${placeholder}...` : ""}
            type={type ?? "test"}
            name={name ?? ""}
        />
    );
}
