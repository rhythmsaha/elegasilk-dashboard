import React, { useCallback, useEffect, useState } from 'react';
import EmptyState from '@/components/ui/table/EmptyState';
import TableLoading from '@/components/ui/table/TableLoading';
import TableRowsControl from '@/components/ui/table/TableRowsControl';
import UsersTable, { IUserTableData } from '@/components/users/usersTable/UsersTable';
import API_URLS from '@/lib/ApiUrls';
import axios from '@/utils/axios';
import paginate from '@/utils/paginate';
import { Card, CardBody, Pagination, Selection } from '@nextui-org/react';
import Fuse, { IFuseOptions } from 'fuse.js';
import UsersFilter from '@/components/users/UsersFilter';

const fuseOptions: IFuseOptions<IUserTableData> = {
    isCaseSensitive: false,
    keys: ['fullName', 'firstName', 'lastName'],
    location: 0,
    threshold: 0.0,
};

const UsersSection = () => {
    const [selectedRoles, setSelectedRoles] = useState<Selection>(new Set([])); //State for roles selection filter
    const [selectedStatus, setSelectedStatus] = useState<Selection>(new Set([])); // State for status selection filter
    const [rowsPerPage, setRowsPerPage] = useState(new Set(['5'])); // State for rows per page
    const [maxPage, setmMaxPage] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchedUsers, setFetchedUsers] = useState<IUserTableData[]>([]);
    const [users, setUsers] = useState<IUserTableData[]>([]);
    const [sortBy, setSortBy] = useState('fullName'); // State for sorting
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch users from API
    const fetchUsers = useCallback(async () => {
        const response = await axios.get(API_URLS.getUsers);
        const data = await response.data;
        setIsLoading(false);

        if (data.users.length !== 0) {
            setFetchedUsers(data.users);
        }
    }, []);

    const deleteUser = useCallback(
        async (userId: string) => {
            const _users = [...fetchedUsers];

            const index = _users.findIndex((user) => user._id === userId);

            if (index !== -1) {
                _users.splice(index, 1);
                setFetchedUsers(_users);
            }
        },
        [fetchedUsers]
    );

    const changeSortHandler = (key: string) => {
        if (sortBy === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(key);
            setSortOrder('asc');
        }
    };

    const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    useEffect(() => {
        if (fetchedUsers.length === 0) return;

        const filterRoles = Array.from(selectedRoles);
        const filterStatus = Array.from(selectedStatus);

        const filteredUsers = fetchedUsers.filter((user) => {
            const roleMatch = filterRoles.length ? filterRoles.includes(user.role) : true;
            let activeStatus = true;

            if (filterStatus.length === 1) {
                if (filterStatus.includes('active')) {
                    activeStatus = user.status === true;
                }
                if (filterStatus.includes('inactive')) {
                    activeStatus = user.status === false;
                }
            } else if (filterStatus.length === 2) {
                activeStatus = true;
            } else {
                activeStatus = true;
            }

            return roleMatch && activeStatus;
        });

        let sortedUsers = [...filteredUsers]; // Copy filtered users

        if (sortBy === 'fullName') sortedUsers.sort((a, b) => (sortOrder === 'asc' ? a.fullName?.localeCompare(b.fullName) : b.fullName?.localeCompare(a.fullName)));

        if (searchQuery.length !== 0) {
            const fuse = new Fuse(sortedUsers, fuseOptions);
            const searchPattern = searchQuery;
            const s = fuse.search(searchPattern);
            sortedUsers = s.map((result) => result.item);
        }

        if (sortBy === 'role') sortedUsers.sort((a, b) => (sortOrder === 'asc' ? a.role?.localeCompare(b.role) : b.role?.localeCompare(a.role)));

        if (sortBy === 'status') {
            sortedUsers.sort((a, b) =>
                sortOrder === 'asc'
                    ? String(a.status)?.localeCompare(String(b.status))
                    : sortOrder === 'desc'
                      ? String(b.status)?.localeCompare(String(a.status))
                      : String(a.status)?.localeCompare(String(b.status))
            );
        }

        if (sortBy === 'email') {
            sortedUsers.sort((a, b) => {
                return sortOrder === 'asc' ? a.email.localeCompare(b.email) : sortOrder === 'desc' ? b.email?.localeCompare(a.email) : a.email?.localeCompare(b.email);
            });
        }

        if (sortBy === 'createdAt') {
            sortedUsers.sort((a, b) =>
                sortOrder === 'asc'
                    ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                    : sortOrder === 'desc'
                      ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                      : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
        }

        if (sortBy === 'updatedAt') {
            sortedUsers.sort((a, b) =>
                sortOrder === 'asc'
                    ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
                    : sortOrder === 'desc'
                      ? new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
                      : new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
            );
        }

        const maxRows = Array.from(rowsPerPage)[0] as string; // Max rows per page
        const totalPage = Math.ceil(sortedUsers.length / Number(maxRows)); // Total paginated pages

        if (totalPage < pageNo) setPageNo(1); // Reset page no if current page is greater than total page
        setmMaxPage(totalPage); // Set max page state

        setUsers(paginate(sortedUsers, pageNo, Number(maxRows)));
    }, [fetchedUsers, pageNo, rowsPerPage, searchQuery, selectedRoles, selectedStatus, sortBy, sortOrder]);

    return (
        <Card shadow="sm" className="mt-10">
            <CardBody className="w-full overflow-hidden sm:py-6">
                <UsersFilter
                    searchState={searchQuery}
                    onChange={searchHandler}
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                    selectedRoles={selectedRoles}
                    setSelectedRoles={setSelectedRoles}
                />

                {isLoading && <TableLoading rows={5} />}

                {users.length !== 0 && !isLoading && <UsersTable usersData={users} changeSortHandler={changeSortHandler} sortBy={sortBy} sortOrder={sortOrder} onDelete={deleteUser} />}
                {users.length === 0 && !isLoading && <EmptyState message="No Users Found" />}

                {!isLoading && users.length !== 0 && (
                    <div className="flex flex-col items-center justify-between gap-4 px-4 pt-4 sm:flex-row">
                        <Pagination
                            total={maxPage}
                            initialPage={1}
                            showControls
                            size="sm"
                            page={pageNo}
                            onChange={setPageNo}
                            radius="full"
                            className="order-1 sm:order-none"
                            siblings={0}
                            boundaries={0}
                        />

                        <TableRowsControl rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} />
                    </div>
                )}
            </CardBody>
        </Card>
    );
};

export default UsersSection;
