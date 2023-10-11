

const lightColorClasses = {
    primary:"bg-emerald-500",
       
    secondary: "",
    background: "bg-zinc-200",
    surface: "bg-zinc-100",
    Error: "bg-red-500",

    onPrimary: "text-neutral-100",
    onSecondary: "",

    onBackground: "text-zinc-700",
    onSurface: "text-zinc-600",
    onError: "text-red-500"
}

const darkColorClasses = {
    primary:  "bg-emerald-800",
    secondary: "",
    background: "bg-zinc-900",
    surface: "bg-zinc-800",
    Error: "bg-red-800",

    onPrimary: "text-neutral-300",
    onSecondary: "",

    onBackground: "text-zinc-500",
    onSurface: "text-zinc-500",
    onError: "text-neutral-50"
}

// colors are basically tailwindcss classes without prefix (i.e without bg-, text-)
//usage, place a prefix (i.e bg-, text-) before the actual class like <text-<colors.light.onPromary>>
const colors = {
    light: lightColorClasses,
    dark: darkColorClasses
}

export default {
    colors,
}