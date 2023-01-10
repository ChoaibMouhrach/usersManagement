import Input from "../../components/Input";
import Pagination from "../../components/Pagination";
import { useDeleteUserMutation, useFetchUsersQuery } from "../../features/Auth/authApi";
import { ChangeEvent, useEffect, useState } from "react";
import { User } from "../../types/User";
import Table from "../../components/Table";
import { debounce } from "../../helpers";
import Create from "../../components/Dashboard/Create";
import Button from "../../components/Button";
import Update from "../../components/Dashboard/Update";

export default function Dashboard() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState<string>("");
    const users = useFetchUsersQuery({ page, search });
    const [users_data, setUsers_data] = useState<User[]>([]);
    const [modal, setModal] = useState<{ open: boolean; content: null | JSX.Element }>({ open: false, content: null });
    const [deleteUser] = useDeleteUserMutation();

    useEffect(() => {
        if (users.isSuccess) {
            let users_copy: User[] = [...users.data.data];

            users_copy = users_copy.map((user: User) => {
                let user_copy: any = { ...user };

                switch (user_copy.role.name) {
                    case "admin":
                        user_copy.role = <div className="text-xs bg-semitransparentdanger border-2 border-danger rounded-md text-center py-1 text-white px-2 uppercase font-semibold tracking-wide ">{user_copy.role.name}</div>;
                        break;

                    case "member":
                        user_copy.role = <div className="text-xs bg-semitransparentsuccess border-2  border-success rounded-md text-center py-1 text-white px-2 uppercase font-semibold tracking-wide ">{user_copy.role.name}</div>;
                        break;

                    case "delivery":
                        user_copy.role = <div className="text-xs bg-semitransparentpurple border-2  border-purple rounded-md text-center py-1 text-white px-2 uppercase font-semibold tracking-wide ">{user_copy.role.name}</div>;
                        break;

                    default:
                        user_copy.role = user_copy.role.name;
                }

                if (user_copy.bio) {
                    user_copy.bio = user_copy.bio.substr(0, 50) + "...";
                } else {
                    user_copy.bio = <div>Not Found</div>;
                }

                user_copy.updated_at = convertDate(user_copy.updated_at);
                user_copy.created_at = convertDate(user_copy.created_at);

                if (user_copy.email_verified_at) {
                    user_copy.email_verified_at = convertDate(user_copy.email_verified_at);
                } else {
                    user_copy.email_verified_at = <div className="bg-semitransparentwarning border-2 border-warning text-white text-center py-1 rounded-md text-xs">Not Yet</div>;
                }

                delete user_copy.role_id;

                user_copy.options = (
                    <div className="flex gap-2">
                        <Button
                            handleClick={() => {
                                setModal({
                                    open: true,
                                    content: (
                                        <Update
                                            userData={user}
                                            closeFunction={() => {
                                                setModal({
                                                    open: false,
                                                    content: null,
                                                });
                                            }}
                                        />
                                    ),
                                });
                            }}
                            color="success"
                        >
                            Update
                        </Button>
                        <Button
                            handleClick={() => {
                                let id: number = user_copy.id;
                                handleDelete(id);
                            }}
                            color="danger"
                        >
                            Delete
                        </Button>
                    </div>
                );

                return user_copy;
            });

            setUsers_data(users_copy);
        }
    }, [users]);

    async function handleDelete(id: number) {
        await deleteUser(id);
        await users.refetch();
    }

    let convertDate = (timestamp: string) => {
        let date = new Date(timestamp);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getSeconds()}:${date.getMinutes()}:${date.getHours()}`;
    };

    let updateSearch = debounce((value: string) => {
        setSearch(value);
    });

    return (
        <div className="bg-[#fff] shadow-sm border border-gray-ish p-4 w-full rounded-sm">
            <div className="pb-4  flex justify-between items-center">
                <h2 className="text-2xl font-bold">Users</h2>
                <Button
                    handleClick={() => {
                        setModal({
                            open: true,
                            content: (
                                <Create
                                    closeFunction={() => {
                                        setModal({
                                            open: false,
                                            content: null,
                                        });
                                    }}
                                />
                            ),
                        });
                    }}
                >
                    Create User
                </Button>
            </div>
            <div>
                <div className="flex flex-col pb-4">
                    <Input
                        handleChange={(event: ChangeEvent<HTMLInputElement>) => {
                            let value: string = event.target.value;
                            updateSearch(value);
                        }}
                        placeholder="Search..."
                        type="text"
                    />
                </div>
                <Table isLoading={users.isLoading} headers={["ID", "User Name", "First Name", "Last Name", "Email Address", "Verified at", "Bio", "Points", "Created At", "Updated At", "Roles", "options"]} data={users_data} />
                {users.isSuccess && (
                    <div className="flex justify-end pt-4">
                        <Pagination
                            forcePage={users.data.current_page}
                            pageCount={users.data.last_page}
                            handlePageChange={(event: { selected: number }) => {
                                setPage(event.selected + 1);
                            }}
                        />
                    </div>
                )}
            </div>
            {modal.open && <div className="fixed top-0 left-0 w-full h-full bg-semitransparentBlack flex items-center justify-center">{modal.content}</div>}
        </div>
    );
}
