import { useEffect } from "react";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const PaymentSucces = () => {
  const { user, refetchUser } = useAuth();
  const axiosSecure = useAxios();

useEffect(() => {
  const makePremium = async () => {
    if (user?.email) {
    axiosSecure.patch(`/users/premium/${encodeURIComponent(user.email)}`)

      await refetchUser(user.email);
    }
  };

  makePremium();
}, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-xl text-center">
        <h2 className="text-4xl font-bold text-green-600">
          Payment Successful
        </h2>

        <p className="mt-4 text-lg">
          You are now a <b>Premium User</b>
        </p>

        <Link to="/dashboard">
          <button className="btn btn-primary mr-6 mt-6">Dashboard</button>
        </Link>
        <Link to="/">
          <button className="btn btn-primary mt-6">Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSucces;
