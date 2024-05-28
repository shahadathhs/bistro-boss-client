import { Helmet } from "react-helmet-async";
import useAuth from "../hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth()
  return (
    <div>
      <Helmet>
        <title>User Home | Bistro Boss</title>
      </Helmet>
      <div>
        <h2 className="text-3xl">Hey welcome back! 
          <span className="text-red-600">
            {user?.displayName ? 
            user?.displayName : 
            'to Bistro Boss'}
          </span>
        </h2>
      </div>
    </div>
  );
};

export default UserHome;