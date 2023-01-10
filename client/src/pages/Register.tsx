import { ChangeEvent, FormEvent, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import { Rules, Values, validate } from "extravalidation";
import { useRegisterMutation } from "../features/Auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../features/Auth/userSlice";

type Field = {
    value: null | any;
    error: null | string;
    touched: null | boolean;
};

type Data = {
    email: Field;
    username: Field;
    firstname: Field;
    lastname: Field;
    password: Field;
    password_confirmation: Field;
    bio: Field;
    [key: string]: Field;
};

let rules: Rules = {
    email: ["required", "email"],
    username: ["required", "min:3", "max:50"],
    firstname: ["required", "min:3", "max:50"],
    lastname: ["required", "min:3", "max:50"],
    password: ["required", "min:8", "max:50", "confirmed"],
    bio: ["nullable", "min:3", "max:50"],
};

let Register = () => {
    const dispatch = useDispatch();
    const [register, { isLoading, isSuccess, isError }] = useRegisterMutation();
    const [data, setData] = useState<Data>({
        email: {
            value: null,
            error: null,
            touched: null,
        },
        username: {
            value: null,
            error: null,
            touched: null,
        },
        firstname: {
            value: null,
            error: null,
            touched: null,
        },
        lastname: {
            value: null,
            error: null,
            touched: null,
        },
        password: {
            value: null,
            error: null,
            touched: null,
        },
        password_confirmation: {
            value: null,
            error: null,
            touched: null,
        },
        bio: {
            value: null,
            error: null,
            touched: null,
        },
    });

    let handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let values: Values = {
            email: data.email.value,
            username: data.username.value,
            firstname: data.firstname.value,
            lastname: data.lastname.value,
            password: data.password.value,
            password_confirmation: data.password_confirmation.value,
            bio: data.bio.value,
        };

        let [satisfied, errors] = validate(rules, values);

        if (!satisfied) {
            let data_copy = { ...data };
            Object.entries(errors).forEach(([error_name, error_messages]: [string, string[]]) => {
                data_copy[error_name].error = error_messages[0];
                data_copy[error_name].touched = true;
            });
            setData(data_copy);
        }

        if (satisfied) {
            try {
                const response = await register(values).unwrap();
                dispatch(setUser(response));
            } catch (err: any) {
                let data_copy = { ...data };

                let errors: {
                    [key: string]: string[];
                } = err.data.errors;

                Object.entries(errors).forEach(([error_name, errors]: [string, string[]]) => {
                    data_copy[error_name].error = errors[0];
                });

                setData(data_copy);
            }
        } else {
            let data_copy = { ...data };
            Object.entries(errors).forEach(([error_name, errors]: [string, string[]]) => {
                data_copy[error_name].error = errors[0];
            });
            setData(data_copy);
        }
    };

    let handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        let name: string = event.target.name;
        let value: any = event.target.value;

        let data_copy: Data = { ...data };

        if (data_copy[name]) {
            data_copy[name].value = value;

            if (name === "password_confirmation") name = "password";

            let customRules: Rules = {
                [name]: rules[name],
            };

            let values: Values = {
                [name]: data_copy[name].value,
            };

            if (name === "password") {
                values["password_confirmation"] = data_copy.password_confirmation.value;
            }

            let [satisfied, errors] = validate(customRules, values);

            if (errors[name]) {
                data_copy[name].error = errors[name][0];
            } else {
                data_copy[name].error = null;
            }

            data_copy[name].touched = true;

            setData(data_copy);
        }

        data_copy;
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-sm shadow-lg flex flex-col gap-2 w-full max-w-md">
            <Input handleChange={handleChange} placeholder="Username..." name="username" type={"text"} />
            {data.username.error && data.username.touched && <div className="text-danger font-semibold text-sm">{data.username.error}</div>}
            <Input handleChange={handleChange} placeholder="First Name..." name="firstname" type={"text"} />
            {data.firstname.error && data.firstname.touched && <div className="text-danger font-semibold text-sm">{data.firstname.error}</div>}
            <Input handleChange={handleChange} placeholder="Last Name..." name="lastname" type={"text"} />
            {data.lastname.error && data.lastname.touched && <div className="text-danger font-semibold text-sm">{data.lastname.error}</div>}
            <Input handleChange={handleChange} placeholder="Email Address..." name="email" type={"text"} />
            {data.email.error && data.email.touched && <div className="text-danger font-semibold text-sm">{data.email.error}</div>}
            <Input handleChange={handleChange} placeholder="Password..." name="password" type={"password"} />
            {data.password.error && data.password.touched && <div className="text-danger font-semibold text-sm">{data.password.error}</div>}
            <Input handleChange={handleChange} placeholder="Password Confirmation..." name="password_confirmation" type={"password"} />
            <TextArea name="bio" handleChange={handleChange} placeholder="Bio..." />
            {data.bio.error && data.bio.touched && <div className="text-danger font-semibold text-sm">{data.bio.error}</div>}
            <Button>Register</Button>
        </form>
    );
};

export default Register;
