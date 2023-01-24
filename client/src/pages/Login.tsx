import { Rules } from "extravalidation";
import { validate } from "extravalidation/lib/es6/Core";
import { Values } from "extravalidation/lib/es6/Core/types";
import { useState, ChangeEvent, SyntheticEvent } from "react";
import { useLoginMutation } from "../features/Auth/authApi";
import { User } from "../types/User";
import { setUser } from "../features/Auth/userSlice";
import { useDispatch } from "react-redux";

type DataValue = {
    value: null | string;
    error: null | string;
    touched: boolean;
};

type Data = {
    email: DataValue;
    password: DataValue;
};

export default function Login() {
    const dispatch = useDispatch();
    const [login] = useLoginMutation();
    let [data, setData]: [Data, Function] = useState({
        email: {
            value: null,
            error: null,
            touched: false,
        },
        password: {
            value: null,
            error: null,
            touched: false,
        },
    });

    async function handleSubmit(event: SyntheticEvent) {
        event.preventDefault();

        let rules: Rules = {
            email: ["required", "email"],
            password: ["required", "min:8"],
        };

        let values: Values = {
            email: data.email.value,
            password: data.password.value,
        };

        let [satisfied, errors] = validate(rules, values);

        if (!satisfied) {
            let data_copy2: Data = { ...data };

            if (errors.email) {
                data_copy2.email.error = errors.email[0];
            } else {
                data_copy2.email.error = null;
            }

            if (errors.password) {
                data_copy2.password.error = errors.password[0];
            } else {
                data_copy2.password.error = null;
            }

            setData(data_copy2);
        } else {
            try {
                let {
                    token,
                    user,
                }: {
                    token: string;
                    user: User;
                } = await login(values).unwrap();

                dispatch(
                    setUser({
                        token,
                        user,
                    })
                );
            } catch (err) {
                let data_copy = { ...data };

                let errors: {
                    [key: string]: string[];
                } = err.data.errors;

                Object.entries(errors).forEach(([error_name, errors]: [string, string[]]) => {
                    data_copy[error_name].error = errors[0];
                });

                setData(data_copy);
            }
        }
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        let { name, value } = event.target;

        if (name === "email" || name === "password") {
            let rules: Rules = {};

            let values: Values = {};

            let data_copy1: Data = { ...data };
            data_copy1[name].value = value;
            data_copy1[name].touched = true;
            setData(data_copy1);

            if (name === "email") {
                rules["email"] = ["required", "email"];
                values["email"] = data.email.value;
            }

            if (name === "password") {
                rules["password"] = ["required", "min:8"];
                values["password"] = data.password.value;
            }

            let [satisfied, errors] = validate(rules, values);

            let data_copy2: Data = { ...data };

            if (errors.email) {
                data_copy2.email.error = errors.email[0];
            } else {
                data_copy2.email.error = null;
            }

            if (errors.password) {
                data_copy2.password.error = errors.password[0];
            } else {
                data_copy2.password.error = null;
            }

            setData(data_copy2);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-sm shadow-lg flex flex-col gap-2 w-full max-w-md">
            <input onChange={handleChange} name="email" className={`focus:border-purple transition duration-300 border-2 outline-none bg-[rgba(0,0,0,0.05)] border-[rgba(0,0,0,0.4)] p-2 ${data.email.error ? "border-danger" : ""}`} placeholder="Email Address..." type="text" />
            {data.email.error && <div className="text-danger text-sm px-2"> {data.email.error}</div>}
            <input onChange={handleChange} name="password" className={`focus:border-purple transition duration-300 border-2 outline-none bg-[rgba(0,0,0,0.05)] border-[rgba(0,0,0,0.4)] p-2 ${data.password.error ? "border-danger" : ""}`} placeholder="Password..." type="password" />
            {data.password.error && <div className="text-danger text-sm px-2"> {data.password.error}</div>}
            <button className="bg-purple py-3 font-semibold text-white rounded-sm hover:bg-midnight transition duration-300">LOGIN</button>
        </form>
    );
}
