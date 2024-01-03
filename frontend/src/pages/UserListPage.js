import React from 'react';
import UserList from '../components/UserList';
import TeacherHeader from '../components/TeacherHeader';

const UserListPage = () => {
  return (
    <div>
      <TeacherHeader />
      <UserList />
    </div>
  );
}

export default UserListPage;