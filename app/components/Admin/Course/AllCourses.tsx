import React, { useEffect, useState } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import { FiEdit2 } from 'react-icons/fi';
import { useDeleteCourseMutation, useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import Loader from '../../Loader/Loader';
import { format } from "timeago.js"
import toast from 'react-hot-toast';
import Link from 'next/link';
import { styles } from '@/app/styles/style';


type Props = {}

const AllCourses = (props: Props) => {
    const { theme, setTheme } = useTheme();
    const [open, setOpen] = useState(false);
    const [courseId, setCourseId] = useState("");
    const { isLoading, data, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });
    const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation({});

    const columns = [
        { 
            field: "id", 
            headerName: "ID", 
            flex: 0.3,
            minWidth: 80,
            maxWidth: 120,
        },
        { 
            field: "title", 
            headerName: "Course Title", 
            flex: 1.5,
            minWidth: 200,
        },
        { 
            field: "ratings", 
            headerName: "Ratings", 
            flex: 0.4,
            minWidth: 80,
            maxWidth: 100,
            align: 'center' as const,
            headerAlign: 'center' as const,
        },
        { 
            field: "purchased", 
            headerName: "Purchased", 
            flex: 0.4,
            minWidth: 100,
            maxWidth: 120,
            align: 'center' as const,
            headerAlign: 'center' as const,
        },
        { 
            field: "created_at", 
            headerName: "Created At", 
            flex: 0.6,
            minWidth: 120,
            maxWidth: 160,
        },
        {
            field: "edit",
            headerName: "Edit",
            flex: 0.3,
            minWidth: 80,
            maxWidth: 100,
            sortable: false,
            filterable: false,
            align: 'center' as const,
            headerAlign: 'center' as const,
            renderCell: (params: any) => {
                return (
                    <div className="flex items-center justify-center w-full h-full">
                        <Link 
                            href={`/admin/edit-course/${params.row.id}`}
                            className="flex items-center justify-center p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors duration-200"
                        >
                            <FiEdit2 
                                className='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300' 
                                size={18} 
                            />
                        </Link>
                    </div>
                )
            }
        },
        {
            field: "delete",
            headerName: "Delete",
            flex: 0.3,
            minWidth: 80,
            maxWidth: 100,
            sortable: false,
            filterable: false,
            align: 'center' as const,
            headerAlign: 'center' as const,
            renderCell: (params: any) => {
                return (
                    <div className="flex items-center justify-center w-full h-full">
                        <Button 
                            onClick={() => {
                                setOpen(!open);
                                setCourseId(params.row.id);
                            }}
                            className="flex items-center justify-center p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors duration-200 min-w-0"
                            sx={{ 
                                minWidth: 'auto',
                                padding: '8px',
                                '&:hover': {
                                    backgroundColor: theme === 'dark' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.1)'
                                }
                            }}
                        >
                            <AiOutlineDelete 
                                className='text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300' 
                                size={18} 
                            />
                        </Button>
                    </div>
                );
            },
        },
    ];

    const rows: any = [];

    {
        data && data.courses.forEach((item: any) => {
            rows.push({
                id: item._id,
                title: item.name,
                ratings: item.ratings,
                purchased: item.purchased,
                created_at: format(item.createdAt),

            });
        });
    }

    useEffect(() => {
        if (isSuccess) {
            setOpen(false);
            refetch();
            toast.success("course deleted Successfully");
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [isSuccess, error, refetch])

    const handleDelete = async () => {
        const id = courseId;
        await deleteCourse(id);
    }

    return (
        <div className='mt-[120px] w-full overflow-hidden'>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <Box className="px-4 md:px-6 w-full max-w-full">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                                All Courses
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Manage and edit your courses
                            </p>
                        </div>
                        
                        <Box 
                            className="w-full max-w-full overflow-hidden"
                            sx={{
                                height: 'calc(100vh - 200px)',
                                maxHeight: '80vh',
                                minHeight: '500px',
                                width: '100%',
                                '& .MuiDataGrid-root': {
                                    border: "none",
                                    outline: "none",
                                    width: '100%',
                                    maxWidth: '100%',
                                    overflow: 'hidden',
                                },
                                "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-sortIcon": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-row": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                    borderBottom: theme === "dark" ? "1px solid #ffffff30!important" : "1px solid #ccc!important",
                                    '&:hover': {
                                        backgroundColor: theme === "dark" ? "#374151" : "#f9fafb",
                                    }
                                },
                                "& .MuiTablePagination-root": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-cell": {
                                    borderBottom: "none",
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '8px 16px',
                                },
                                "& .name-column--cell": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-columnHeaders": {
                                    backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                                    borderBottom: "none",
                                    color: theme === "dark" ? "#fff" : "#000",
                                    fontWeight: 600,
                                },
                                "& .MuiDataGrid-virtualScroller": {
                                    backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
                                    overflowX: 'hidden !important',
                                },
                                "& .MuiDataGrid-footerContainer": {
                                    backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                                    borderTop: "none",
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiCheckbox-root": {
                                    color: theme === "dark" ? "#b7ebde !important" : "#000 !important",
                                },
                                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                    color: "#fff !important",
                                },
                                "& .MuiDataGrid-columnSeparator": {
                                    display: "none",
                                },
                                "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
                                    outline: "none",
                                },
                                "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within": {
                                    outline: "none",
                                },
                            }}
                        >
                            <DataGrid 
                                checkboxSelection 
                                rows={rows} 
                                columns={columns}
                                disableRowSelectionOnClick
                                disableColumnMenu
                                rowHeight={60}
                                hideFooterSelectedRowCount
                                pageSizeOptions={[5, 10, 25, 50]}
                                initialState={{
                                    pagination: {
                                        paginationModel: { pageSize: 10 },
                                    },
                                }}
                                sx={{
                                    width: '100%',
                                    maxWidth: '100%',
                                    '& .MuiDataGrid-virtualScrollerContent': {
                                        width: '100% !important',
                                    },
                                    '& .MuiDataGrid-row': {
                                        maxWidth: '100%',
                                    }
                                }}
                            />
                        </Box>
                        {open && (
                            <Modal 
                                open={open} 
                                onClose={() => setOpen(!open)} 
                                aria-labelledby="modal-modal-title" 
                                aria-describedby="modal-modal-description"
                            >
                                <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                                    <h1 className={`${styles.title} text-center mb-4`}>
                                        Are you sure you want to delete this course?
                                    </h1>
                                    <div className='flex w-full items-center justify-center gap-4 mt-6'>
                                        <div 
                                            className={`${styles.button} !w-[120px] h-[40px] bg-gray-500 hover:bg-gray-600 text-white cursor-pointer`} 
                                            onClick={() => setOpen(!open)}
                                        >
                                            Cancel
                                        </div>
                                        <div 
                                            className={`${styles.button} !w-[120px] h-[40px] bg-red-500 hover:bg-red-600 text-white cursor-pointer`} 
                                            onClick={handleDelete}
                                        >
                                            Delete
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

export default AllCourses