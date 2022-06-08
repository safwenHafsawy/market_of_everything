import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/actions";

const CheckAuth = () => {
  const dispatcher = useDispatch();
  useEffect(() => {
    fetch("/api/home", {
      method: "GET",
      headers: { "content-type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        res
          .json()
          .then((data) => {
            if (data.userID) dispatcher(loginAction(data.userID,data.username, true));
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  }, []);
  return null;
};

export default CheckAuth;
