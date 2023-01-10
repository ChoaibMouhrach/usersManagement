import React, { useState } from "react";
import Input from "../Input";
import { useUpdateUserMutation, useFetchRolesQuery } from "../../features/Auth/authApi";
import { Role } from "../../types/User";
import Button from "../Button";
import { User } from "../../types/User";

interface Props {
    closeFunction: (event: React.MouseEvent<HTMLButtonElement>) => void;
    userData: User;
}

export default function Update({ closeFunction, userData }: Props) {
    const { data, isSuccess } = useFetchRolesQuery(undefined);
    const [updateUser, updatingState] = useUpdateUserMutation();
    const [updatingData, setupDatingData] = useState({
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

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        let data: any = {};

        Object.entries(updatingData).forEach(([key, value]) => {
            if (value.value) {
                data[key] = value.value;
            }
        });

        try {
            await updateUser({
                id: userData.id,
                data,
            }).unwrap();
        } catch (err: any) {
            let updatingData_copy: any = { ...updatingData };

            Object.entries(err.data.errors).forEach(([key, errors]: [string, any]) => {
                updatingData_copy[key].error = errors[0];
            });

            setupDatingData(updatingData_copy);
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        let value = event.target.value;
        let name = event.target.name;

        let updatingData_copy: any = { ...updatingData };

        updatingData_copy[name].value = value;

        setupDatingData(updatingData_copy);
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-sm shadow-md w-full max-w-md flex flex-col gap-4">
            <div>
                <h2 className="text-2xl font-semibold tracking-wide">Create New User</h2>
            </div>

            {updatingState.isSuccess && <div className=" bg-semitransparentsuccess border-2 border-success p-2 text-white tracking-wide">User created successfully</div>}

            <div className="flex flex-col gap-4">
                <Input value={userData.username} handleChange={handleChange} placeholder="User Name..." name="username" type="text" />
                {updatingData.username.error && <div className="text-danger text-sm tracking-wide">{updatingData.username.error}</div>}
                <Input value={userData.firstname} handleChange={handleChange} placeholder="First Name..." name="firstname" type="text" />
                {updatingData.firstname.error && <div className="text-danger text-sm tracking-wide">{updatingData.firstname.error}</div>}
                <Input value={userData.lastname} handleChange={handleChange} placeholder="Last Name..." name="lastname" type="text" />
                {updatingData.lastname.error && <div className="text-danger text-sm tracking-wide">{updatingData.lastname.error}</div>}
                <Input value={userData.email} handleChange={handleChange} placeholder="Email Address..." name="email" type="text" />
                {updatingData.email.error && <div className="text-danger text-sm tracking-wide">{updatingData.email.error}</div>}
                <Input handleChange={handleChange} placeholder="Password..." name="password" type="text" />
                {updatingData.password.error && <div className="text-danger text-sm tracking-wide">{updatingData.password.error}</div>}
                <Input handleChange={handleChange} placeholder="Password_confirmation..." name="password_confirmation" type="text" />
                {updatingData.password_confirmation.error && <div className="text-danger text-sm tracking-wide">{updatingData.password_confirmation.error}</div>}
                <Input value={userData.points} handleChange={handleChange} placeholder="Points..." name="points" type="number" />
                {updatingData.points.error && <div className="text-danger text-sm tracking-wide">{updatingData.points.error}</div>}
                <Input value={userData.bio} handleChange={handleChange} placeholder="Bio..." name="bio" type="text" />
                {updatingData.bio.error && <div className="text-danger text-sm tracking-wide">{updatingData.bio.error}</div>}
                {isSuccess ? (
                    <select value={userData.role.id} onChange={handleChange} name="role_id" className="outline-none border-2 bg-[rgba(0,0,0,0.02)] border-[rgba(0,0,0,0.2)] p-2 ">
                        {data.map((role: Role, index: number) => (
                            <option key={role.name + role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                ) : null}
                {updatingData.role_id.error && <div className="text-danger text-sm tracking-wide">{updatingData.role_id.error}</div>}
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
