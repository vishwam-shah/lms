import React, { FC, useEffect, useState } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import { FiEdit2 } from 'react-icons/fi';
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserRoleMutation } from '@/redux/features/user/userApi';
import Loader from '../../Loader/Loader';
import { format } from "timeago.js"
import toast from 'react-hot-toast';
import Link from 'next/link';
import { styles } from '@/app/styles/style';


type Props = {
    isTeam: boolean;
}

const AllUsers:FC<Props> = ({isTeam}) => {
    const { theme, setTheme } = useTheme();
    const [active,setActive] = useState(false);
    const [open, setOpen] = useState(false);
    const [userId, setUserId] = useState("");
    const [updateUserRole , {error: updateError, isSuccess}] = useUpdateUserRoleMutation();
    const { isLoading, data, refetch } = useGetAllUsersQuery({}, { refetchOnMountOrArgChange: true });
    const [deleteUser, { isSuccess:deleteSuccess, error:deleteError }] = useDeleteUserMutation();

    const columns = [
        { field: "id", headerName: "ID", flex: 0.3 },
        { field: "name", headerName: "Name", flex: 0.5 },
        { field: "email", headerName: "Email", flex: 0.5 },
        { field: "role", headerName: "Role", flex: 0.5 },
        { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
        { field: "created_at", headerName: "Joined At", flex: 0.5 },
       
        {
            field: "delete",
            headerName: "Delete",
            flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                        <Button onClick={() => {
                            setOpen(true);
                            setUserId(params.row.id);
                        }}>
                            <AiOutlineDelete className='dark:text-white text-black' size={20} />
                        </Button>
                    </>
                );
            },
        },
        {
            field: "email_action",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                        <a href={`mailto:${params.row.email}`}>
                            <AiOutlineMail className='dark:text-white text-black' size={20} />
                        </a>
                    </>
                );
            },
        },
        ...(isTeam ? [] : [{
            field: "role_action",
            headerName: "Role",
            flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                        <Button 
                            onClick={() => handleRoleUpdate(params.row.id, params.row.role === "admin" ? "user" : "admin")}
                            className="text-xs"
                        >
                            {params.row.role === "admin" ? (
                                <span className="text-red-500">Demote</span>
                            ) : (
                                <span className="text-green-500">Promote</span>
                            )}
                        </Button>
                    </>
                );
            },
        }]),
    ];

    const rows: any = [];

    if(isTeam){
        const newData = data && data.users.filter((item:any) => item.role === "admin");
        newData && newData.forEach((item: any) => {
            rows.push({
                id: item._id,
                name: item.name,
                email: item.email,
                role: item.role,
                courses: item.courses.length,
                created_at: format(item.createdAt),

            });
        });
    } else {
        data && data.users && data.users.forEach((item: any) => {
            rows.push({
                id: item._id,
                name: item.name,
                email: item.email,
                role: item.role,
                courses: item.courses.length,
                created_at: format(item.createdAt),

            });
        });
    }

    useEffect(() => {

        if (updateError){
            if("data" in updateError){
                const errorMessage = updateError as any;
                toast.error(errorMessage.data.message);
            }
        }

        if (isSuccess) {
            refetch();
            toast.success("User role updated successfully");
            setActive(false);
        }
        if (deleteSuccess) {
            refetch();
           toast.success("User deleted successfully");
           setOpen(false);
        }
        if (deleteError) {
            if("data" in deleteError) {
                const errorMessage = deleteError as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [isSuccess, updateError, deleteSuccess, deleteError, refetch])

    const handleDelete = async () => {
        const id = userId;
        await deleteUser(id);
    }

    const handleRoleUpdate = async (id: string, newRole: string) => {
        await updateUserRole({ id, role: newRole });
    }

    return (
        <div className='mt-4'>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <Box m="20px">
                        {isTeam && (
                            <div className="mb-4">
                                <h1 className="text-2xl font-bold dark:text-white text-black mb-2">
                                    Team Management
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Manage your admin team members and their permissions
                                </p>
                            </div>
                        )}
                        {!isTeam && (
                            <div className="mb-4">
                                <h1 className="text-2xl font-bold dark:text-white text-black mb-2">
                                    User Management
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Manage all platform users and their accounts
                                </p>
                            </div>
                        )}
                        <div className="w-full flex justify-end">
                            <div className={`${styles.button} !w-[200px] dark:bg-[#57c7a3] !h-[35px] dark:border dark:border-[#ffffff6c]`} onClick={() => setActive(!active)}>
                                {isTeam ? "Add New Admin" : "Add New Member"}
                            </div>
                        </div>
                        <Box m="40px 0 0 0" height="80vh" sx={{
                            "& .MuiDataGrid-root": {
                                border:"none",
                                outline:"none",
                            },
                            "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon":{
                                color: theme === "dark" ? "#fff" : "#000",
                            },
                            "& .MuiDataGrid-sortIcon": {
                                color: theme === "dark" ? "#fff" : "#000",
                            },
                            "& .MuiDataGrid-row": {
                                color: theme === "dark" ? "#fff" : "#000",
                                borderBottom:
                                theme === "dark" ? "1px solid #ffffff30!important":
                                "1px solid #ccc!important",
                            },
                            "& .MuiTablePagination-root": {
                                color: theme === "dark" ? "#fff" : "#000",
                            },
                            "& .MuiDataGrid-cell": {
                                borderBottom:"none",
                            },
                            "& .name-column--cell": {
                                color: theme === "dark" ? "#fff" : "#000",
                            },
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                                borderBottom:"none",
                                color: theme === "dark" ? "#fff" : "#000",
                            },
                           "& .MuiDataGrid-virtualScroller": {
                                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
                            },
                            "& .MuiDataGrid-footerContainer": {
                                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                                borderTOp:"none",
                                color: theme === "dark" ? "#fff" : "#000",
                            },
                            "& .MuiCheckbox-root": {
                                color: theme === "dark" ? `#b7ebde !important` : `#000 !important`,
                            },
                            "& .MuiDataGrid-toolbarContainer ,MuiButton-text": {
                                color: `#fff !important`,
                            },
                        }}>
                            <DataGrid checkboxSelection rows={rows} columns={columns}></DataGrid>
                        </Box>
                        {open && (
                            <Modal
                                open={open}
                                onClose={() => setOpen(!open)}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                                    <h1 className={`${styles.title}`}>
                                        Are you sure you want to delete this user?
                                    </h1>
                                    <div className="flex w-full items-center justify-between mb-6 mt-4">
                                        <div className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7a3]`} onClick={() => setOpen(!open)}>
                                            Cancel
                                        </div>
                                        <div className={`${styles.button} !w-[120px] h-[30px] bg-[#d63f3f]`} onClick={handleDelete}>
                                            Delete
                                        </div>
                                    </div>
                                </Box>
                            </Modal>
                        )}
                        {active && (
                            <Modal
                                open={active}
                                onClose={() => setActive(!active)}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                                    <h1 className={`${styles.title}`}>
                                        {isTeam ? "Add New Admin" : "Add New Member"}
                                    </h1>
                                    <div className="mt-4">
                                        <input
                                            type="email"
                                            placeholder="Enter email..."
                                            className={`${styles.input}`}
                                        />
                                        {isTeam && (
                                            <p className="text-sm text-gray-500 mt-2">
                                                This user will be granted admin privileges
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex w-full items-center justify-between mb-6 mt-4">
                                        <div className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7a3]`} onClick={() => setActive(!active)}>
                                            Cancel
                                        </div>
                                        <div className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7a3]`} onClick={() => setActive(!active)}>
                                            Submit
                                        </div>
                                    </div>
                                </Box>
                            </Modal>
                        )}
                    </Box>
                )
            }
        </div>
    )
}

export default AllUsers