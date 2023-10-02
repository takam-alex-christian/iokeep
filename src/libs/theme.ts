
const lightColorClasses = {
    primary: "emerald-500",
    secondary: "",
    background: "zinc-200",
    surface: "zinc-100",
    Error: "red-500",

    onPrimary: "neutral-100",
    onSecondary: "",

    onBackground: "zinc-700",
    onSurface: "zinc-600",
    onError: "red-500"
}

const darkColorClasses = {
    primary: "emerald-800",
    secondary: "",
    background: "zinc-900",
    surface: "zinc-800",
    Error: "red-800",

    onPrimary: "neutral-300",
    onSecondary: "",

    onBackground: "zinc-500",
    onSurface: "zinc-500",
    onError: "neutral-50"
}

// colors are basically tailwindcss classes without prefix (i.e without bg-, text-)
const colors = {
    light: lightColorClasses,
    dark: darkColorClasses
}

export {
    colors
}