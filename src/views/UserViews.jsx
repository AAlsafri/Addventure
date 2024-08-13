import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "../components/Nav/NavBar";
import { Welcome } from "../components/welcome/Welcome";
import { DestinationList } from "../components/destinations/DestinationList";
import { AddDestinationPage } from "../components/destinations/AddDestinationForm";
import { DestinationDetails } from "../components/destinations/DestinationDetails";
import { UserList } from "../components/users/UserList";
import { AddUserForm } from "../components/users/AddUserForm";
import { EditUserForm } from "../components/users/EditUserForm";
import { UserDetails } from "../components/users/UserDetails";
import UserExplorations from "../components/users/UserExplorations";
import { UserJourney } from "../Journey/UserJourney";
import UserProfile from "../components/users/UserProfile";

export const UserViews = ({ currentUser }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome />} />
        {/* <Route path="explorations" element={<UserExplorations />} />
        <Route
          path="journey"
          element={<UserJourney currentUser={currentUser} />}
        />
        <Route
          path="profile"
          element={<UserProfile currentUser={currentUser} />}
        /> */}
        <Route path="destinations">
          <Route
            index
            element={<DestinationList currentUser={currentUser} />}
          />
          <Route
            path="add"
            element={<AddDestinationPage currentUser={currentUser} />}
          />
          <Route path=":destinationId" element={<DestinationDetails />} />
        </Route>
        <Route path="users">
          <Route index element={<UserList />} />
          <Route path="add" element={<AddUserForm />} />
          <Route path=":userId/edit" element={<EditUserForm />} />
          <Route path=":userId" element={<UserDetails />} />
        </Route>
      </Route>
    </Routes>
  );
};
