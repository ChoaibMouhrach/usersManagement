export default function Button(props: { type?: "button" | "submit"; hover_color?: string; color?: string; children: React.ReactNode; handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void }) {
    switch (props.color) {
        case "danger":
            return (
                <button type={props.type ?? "submit"} onClick={props.handleClick} className={`py-2 px-4 font-semibold text-white rounded-sm transition duration-300 bg-danger hover:bg-semitransparentdanger`}>
                    {props.children}
                </button>
            );

        case "success":
            return (
                <button type={props.type ?? "submit"} onClick={props.handleClick} className={`py-2 px-4 font-semibold text-white rounded-sm transition duration-300 bg-success hover:bg-semitransparentsuccess`}>
                    {props.children}
                </button>
            );
        default:
            return (
                <button type={props.type ?? "submit"} onClick={props.handleClick} className={`py-2 px-4 font-semibold text-white rounded-sm transition duration-300 bg-purple hover:bg-midnight`}>
                    {props.children}
                </button>
            );
    }
}
