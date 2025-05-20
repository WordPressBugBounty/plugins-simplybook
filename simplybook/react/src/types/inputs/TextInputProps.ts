import { InputHTMLAttributes } from "react";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    name?: string;
    placeholder?: string;
    type?: string;
    className?: string;
    ref?: string;
    clickToSelect?: boolean;
    storedValue?: string;
    disabled: boolean;
}