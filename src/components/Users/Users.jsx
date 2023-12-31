import React, { useEffect, useState } from 'react';
import UsersList from './UsersList/UsersList';
//import SearchUsersForm from 'components/Forms/SearchUsersForm/SearchUsersForm';
import data from '../../users.json';
import FilterUsersForm from 'components/Forms/FilterUsersForm/FilterUsersForm';

const Users = () => {
  const [users, setUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);

  useEffect(() => {
    const LocalData = localStorage.getItem('users');
    if (LocalData && JSON.parse(LocalData).length > 0)
      setUsers(JSON.parse(LocalData));
    else setUsers([...data]);
  }, []);

  useEffect(() => {
    if (users) localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleFilter = filterQuery => {
    filterQuery
      ? setFilteredUsers(
          users.filter(user =>
            user.firstName.toLowerCase().includes(filterQuery.toLowerCase())
          )
        )
      : setFilteredUsers(null);
  };

  const deleteUser = id => {
    setUsers(prev => prev.filter(user => user._id !== id));
  };

  return (
    <div>
      <FilterUsersForm handleFilter={handleFilter} />
      <UsersList
        users={users}
        filteredUsers={filteredUsers}
        deleteUser={deleteUser}
      />
    </div>
  );
};

export default Users;

//========================================
// import { Component } from 'react';
// import SearchUsersForm from '../Forms/SearchUsersForm/SearchUsersForm';
// import UsersList from './UsersList/UsersList';
// import { getUsersBySearch } from '../../api/users';
// import { toast } from 'react-hot-toast';

// const STATUS = {
//   IDLE: 'IDLE',
//   PENDING: 'PENDING',
//   FULFILLED: 'FULFILLED',
//   REJECTED: 'REJECTED',
// };

// class Users extends Component {
//   state = {
//     users: null,
//     searchQuery: '',
//     status: STATUS.IDLE,
//     error: '',
//   };

//   // handleSearch = async (e) => {
//   // 	e.preventDefault()
//   // 	const data = await getUsersBySearch(e.target[0].value)
//   // 	this.setState({ users: [...data.users] })
//   // }

//   handleSearch = e => {
//     e.preventDefault();
//     this.setState({ searchQuery: e.target[0].value });
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.searchQuery !== this.state.searchQuery) this.apiUsers();
//   }

//   apiUsers = async () => {
//     try {
//       this.setState({ status: STATUS.PENDING });
//       const data = await getUsersBySearch(this.state.searchQuery);
//       this.setState({ users: [...data.users], status: STATUS.FULFILLED });
//       toast.success(`Total: ${data.total}`);
//     } catch (error) {
//       this.setState({
//         error: error.message,
//         status: STATUS.REJECTED,
//       });
//       toast.error(error.message);
//     }
//   };

//   render() {
//     const { users, error, status } = this.state;
//     return (
//       <>
//         <SearchUsersForm handleSearch={this.handleSearch} />
//         <UsersList
//           users={users}
//           status={status}
//           error={error}
//           STATUS={STATUS}
//         />
//       </>
//     );
//   }
// }

// export default Users;

// class Users extends Component {
// 	state = {
// 		users: null,
// 		searchQuery: '',
// 		isLoading: false,
// 		error: '',
// 	}

// 	// handleSearch = async (e) => {
// 	// 	e.preventDefault()
// 	// 	const data = await getUsersBySearch(e.target[0].value)
// 	// 	this.setState({ users: [...data.users] })
// 	// }

// 	handleSearch = (e) => {
// 		e.preventDefault()
// 		this.setState({ searchQuery: e.target[0].value })
// 	}

// 	componentDidUpdate(prevProps, prevState) {
// 		if (prevState.searchQuery !== this.state.searchQuery) this.apiUsers()
// 	}

// 	apiUsers = async () => {
// 		try {
// 			this.setState({ isLoading: true })
// 			const data = await getUsersBySearch(this.state.searchQuery)
// 			this.setState({ users: [...data.users] })
// 			toast.success(`Total: ${data.total}`)
// 		} catch (error) {
// 			this.setState({
// 				error: error.message,
// 			})
// 			toast.error(error.message)
// 		} finally {
// 			this.setState({ isLoading: false })
// 		}
// 	}

// 	render() {
// 		const { isLoading, users, error } = this.state
// 		return (
// 			<>
// 				<SearchUsersForm handleSearch={this.handleSearch} />
// 				{isLoading && <h2>Loading...</h2>}
// 				{error && <h2>{error}</h2>}
// 				<UsersList users={users} />
// 			</>
// 		)
// 	}
// }

// export default Users
