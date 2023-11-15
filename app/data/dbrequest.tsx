import axios from "axios";

export async function getUsers() {
  try {
    const url = `${process.env.NEXT_PUBLIC_DATABASE_URL}/api/User/UserList`;
    const response = await axios.get(url);

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Error al obtener datos:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function CreateUser(
  name: string,
  email: string,
  password: string
) {
  try {

    const url = `${process.env.NEXT_PUBLIC_DATABASE_URL}/api/User/Add`;

    const userData = {
      name: name,
      email: email,
      password: password,
    };

    const existingUsers = await getUsers();
    const existingUserByEmail = existingUsers.response.find((u:any) => u.email === email);
    const existingUserByName = existingUsers.response.find((u:any) => u.name === name);
    if (existingUserByEmail && existingUserByName) {
      throw new Error("User with this email and name already exists");
    }
    
    if (existingUserByEmail) {
      throw new Error("User with this email already exists");
    }
    
    if (existingUserByName) {
      throw new Error("User with this name already exists");
    }
   

    const res = await axios.post(url, userData);

    if (res.status === 200) {
      console.log(res.data);
      return res.data;
    } else {
      console.error("Error al obtener datos:", res.status);
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

interface User {
  name: string;
  password: string;
}


export async function authentification(user:User){
  const url = `${process.env.NEXT_PUBLIC_DATABASE_URL}/API/Auth`

  try{

    const response = await axios.post(url, user);
    console.log(response);
    return response;
    
  } catch (error){
    console.log("error in the server", error)
}
}