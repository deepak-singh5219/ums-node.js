import React,{useState, useEffect} from 'react'
import axios from 'axios';


const Users = () => {

    const [users,setUsers] = useState(null);
    const fetchUsers = async () => {
        const response = await axios.get('http://localhost:4000/allusers');
        if(response.data.users) setUsers(response.data.users);
        // console.log(response);
    }

   
    
  useEffect(()=>{
    fetchUsers();
    // console.log(users)
  },[users]);

  const updateUser = async (user) => {

    const userName = prompt("Enter your new name");
    const userEmail = prompt("Enter Your new mail");

    if (!(userName && userEmail)) {
      alert("Please Enter Name and Email Both");
    } else {
        await axios.put(`http://localhost:4000/updateuser/${user._id}`, {
        name: userName,
        email: userEmail,
      });
      
    }

}


  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:4000/deleteuser/${userId}`);
}
    
  return (
    <div>
        <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-8">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
            All Users
          </h1>
        </div>
        <div className="lg:w-2/3 w-full mx-auto overflow-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  Name
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Email
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Edit
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {
                users && users.map((user) => (
                    <tr>
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  <button onClick={()=>updateUser(user)} className="text-green-500 hover:text-green-900">Edit</button>
                </td>
                <td className="px-4 py-3 text-lg text-gray-900">
                  <button onClick={()=>deleteUser(user._id)} className="text-red-500 hover:text-red-900">Delete</button>
                </td>
              </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </section>
    </div>
  )
}

export default Users