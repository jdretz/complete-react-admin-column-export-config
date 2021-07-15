// in src/App.js
import * as React from "react";
import { Admin, Resource } from 'react-admin';
import { FormsList, FormsEdit, FormsCreate } from "./forms";
import UserIcon from '@material-ui/icons/Group';
import Pages from '@material-ui/icons/Pages';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import dataProvider from "./dataProvider";
import { UsersCreate, UsersEdit, UsersList } from "./users";

const App = () => (
  <Admin dashboard={Dashboard} dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="forms" list={FormsList} edit={FormsEdit} create={FormsCreate} icon={Pages} />
    <Resource name="users" list={UsersList} edit={UsersEdit} create={UsersCreate} icon={UserIcon} />
  </Admin>
)

export default App;