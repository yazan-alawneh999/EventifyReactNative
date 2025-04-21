// context/UserContext.js
import React, {createContext, useState} from 'react';

// هذا هو الشكل الافتراضي لبيانات المستخدم
const defaultUserInfo = {
  userid: 3,
  username: 'Bader abu saaleek',
  roleid: 2,
  profileID: 15,
  profileImage: '../../../../../src/assets/Images/person.jpg',
  role: {
    roleId: 3,
    roleName: 'Organizer',
  },
};

export const UserContext = createContext({
  userInfo: defaultUserInfo,
  setUserInfo: () => {},
});

export const UserProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState(defaultUserInfo);

  return (
    <UserContext.Provider value={{userInfo, setUserInfo}}>
      {children}
    </UserContext.Provider>
  );
};
