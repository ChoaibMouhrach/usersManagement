import { convertDate } from "../helpers";
import { ImSpinner10 } from "react-icons/im";

type Props = {
    headers: string[];
    data: any[];
    isLoading?: boolean;
};

export default function Table({ headers, data, isLoading }: Props) {
    return (
        <table className="w-full">
            <thead className="bg-gray-ish text-left border-b-2 border-[#94a3b8]">
                <tr className="">
                    {headers.map((header: string, index: number) => (
                        <th key={header + index} className="p-3 text-sm font-semibold tracking-wide">
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {!isLoading ? (
                    data.map((user: any, index: number) => (
                        <tr key={user.username + index} className={index % 2 !== 0 ? "bg-silver" : ""}>
                            {Object.entries(user).map(([key, value]: [string, any], index: number) => (
                                <td key={index} className="p-3 text-sm tracking-wide">
                                    {value}
                                </td>
                            ))}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td className="py-6 text-purple text-2xl" colSpan={headers.length}>
                            <div className="flex justify-center">
                                <ImSpinner10 className="animate-spin" />
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
