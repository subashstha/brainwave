import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <section className="py-20">
      <div className="container py-10">
        <h1 className="mb-4">Profile</h1>
        {user && (
          <>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <button onClick={handleLogout} className="btn mt-4">
              Logout
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default Profile;
