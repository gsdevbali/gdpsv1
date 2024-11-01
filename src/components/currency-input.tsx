"use client"

import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface CurrencyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    defaultValue?: number
    className?: string
}

export function CurrencyInput({ defaultValue = 0, name, className, ...props }: CurrencyInputProps) {
    const [displayValue, setDisplayValue] = useState("")
    const [numericValue, setNumericValue] = useState(defaultValue)

    // Format number to IDR currency
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value)
    }

    // Convert string to number, removing currency formatting
    const parseValue = (value: string) => {
        return Number(value.replace(/[^0-9-]/g, ''))
    }

    useEffect(() => {
        setDisplayValue(formatCurrency(defaultValue))
    }, [defaultValue])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = parseValue(e.target.value)
        setNumericValue(rawValue)
        setDisplayValue(formatCurrency(rawValue))
    }

    return (
        <div className="relative">
            <Input
                {...props}
                value={displayValue}
                onChange={handleChange}
                className={cn("w-full", className)}
            />
            <input 
                type="hidden"
                name={name}
                value={numericValue}
            />
        </div>
    )
}