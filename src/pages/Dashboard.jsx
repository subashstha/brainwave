import { Link } from "react-router-dom";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  return (
    <section className="py-20">
      <div className="container py-10">
        <h1 className="mb-4">Dashboard</h1>
        <p>Welcome, {user ? user.name : "Guest"}!</p>
        <Link to="/profile" className="btn mt-4">
          Go to Profile
        </Link>
      </div>
    </section>
  );
};

export default Dashboard;
