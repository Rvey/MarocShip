import { useEffect } from "react";

interface AdminLoginProps {
  
}

const AdminLogin: React.FC<AdminLoginProps> = () => {
  useEffect(() => {
    console.log("Name: AdminLogin");
  }, []);

  return (
    <div>
      <h1>Login Page</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
        repellendus, quisquam doloremque, dolore quibusdam quis dolorum
        voluptate, quaerat, doloremque quisquam dolores quia quibusdam
        repellendus.
      </p>
    </div>
  );
};
export default AdminLogin;