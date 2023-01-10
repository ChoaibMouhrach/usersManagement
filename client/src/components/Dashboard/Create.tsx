import Input from "../Input";
import Button from "../Button";
import { useFetchRolesQuery } from "../../features/Auth/authApi";
import { SyntheticEvent, useState } from "react";
import { useStoreUserMutation } from "../../features/Auth/authApi";
import { Role } from "../../types/User";

export default function Create({ closeFunction }: { closeFunction: (event: React.MouseEvent<HTMLButtonElement>) => void }) {
    const { data, isSuccess } = useFetchRolesQuery(undefined);
    const [create, creatingState] = useStoreUserMutation();
    const [creatingData, setCreatingData] = useState({
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
        role_id: {
            value: null,
            error: null,
            touched: null,
        },
        points: {
            value: null,
            error: null,
            touched: null,
        },
    });

    async function handleSubmit(event: SyntheticEvent) {
        event.preventDefault();
        let data: any = {};

        Object.entries(creatingData).forEach(([key, value]) => {
            data[key] = value.value;
        });

        try {
            console.log(data);

            await create(data).unwrap();
        } catch (err: any) {
            let creatingData_copy: any = { ...creatingData };

            Object.entries(err.data.errors).forEach(([key, errors]: [string, any]) => {
                creatingData_copy[key].error = errors[0];
            });

            setCreatingData(creatingData_copy);
        }
    }

    function handleChange(event: any) {
        let value = event.target.value;
        let name = event.target.name;

        let creatingData_copy: any = { ...creatingData };

        creatingData_copy[name].value = value;

        setCreatingData(creatingData_copy);
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-sm shadow-md w-full max-w-md flex flex-col gap-4">
            <div>
                <h2 className="text-2xl font-semibold tracking-wide">Create New User</h2>
            </div>

            {creatingState.isSuccess && <div className=" bg-semitransparentsuccess border-2 border-success p-2 text-white tracking-wide">User created successfully</div>}

            <div className="flex flex-col gap-4">
                <Input handleChange={handleChange} placeholder="User Name..." name="username" type="text" />
                {creatingData.username.error && <div className="text-danger text-sm tracking-wide">{creatingData.username.error}</div>}
                <Input handleChange={handleChange} placeholder="First Name..." name="firstname" type="text" />
                {creatingData.firstname.error && <div className="text-danger text-sm tracking-wide">{creatingData.firstname.error}</div>}
                <Input handleChange={handleChange} placeholder="Last Name..." name="lastname" type="text" />
                {creatingData.lastname.error && <div className="text-danger text-sm tracking-wide">{creatingData.lastname.error}</div>}
                <Input handleChange={handleChange} placeholder="Email Address..." name="email" type="text" />
                {creatingData.email.error && <div className="text-danger text-sm tracking-wide">{creatingData.email.error}</div>}
                <Input handleChange={handleChange} placeholder="Password..." name="password" type="text" />
                {creatingData.password.error && <div className="text-danger text-sm tracking-wide">{creatingData.password.error}</div>}
                <Input handleChange={handleChange} placeholder="Password_confirmation..." name="password_confirmation" type="text" />
                {creatingData.password_confirmation.error && <div className="text-danger text-sm tracking-wide">{creatingData.password_confirmation.error}</div>}
                <Input handleChange={handleChange} placeholder="Points..." name="points" type="number" />
                {creatingData.points.error && <div className="text-danger text-sm tracking-wide">{creatingData.points.error}</div>}
                <Input handleChange={handleChange} placeholder="Bio..." name="bio" type="text" />
                {creatingData.bio.error && <div className="text-danger text-sm tracking-wide">{creatingData.bio.error}</div>}
                {isSuccess ? (
                    <select onChange={handleChange} name="role_id" className="outline-none border-2 bg-[rgba(0,0,0,0.02)] border-[rgba(0,0,0,0.2)] p-2 ">
                        {data.map((role: Role, index: number) => (
                            <option key={role.name + role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                ) : null}
                {creatingData.role_id.error && <div className="text-danger text-sm tracking-wide">{creatingData.role_id.error}</div>}
            </div>
            <div className="flex justify-end gap-4 ">
                <Button color="success" type="submit">
                    Submit
                </Button>
                <Button handleClick={closeFunction} color="danger" type="button">
                    Close
                </Button>
            </div>
        </form>
    );
}
