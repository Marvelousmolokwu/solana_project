import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBlog } from "../../Context/blog";
import { Button } from "../../components/Button";
const WelcomePage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [about, setAbout] = useState("");
    const [role, setRole] = useState("")
    const [pay, setPay] = useState("")
    const navigate = useNavigate()
    const { handleUsernameSubmit } = useBlog();

   

    const handleSubmit = () => {
        handleUsernameSubmit(username, email, about, pay);
        navigate("/dashboard")
    };

    return (

        <section className="overflow-hidden bg-black bg-bg-up-color bg-no-repeat bg-cover h-screen">
            <div className='logo text-5xl absolute top-10 left-20 font-extrabold bg-gradient-to-r from-pink-500  to-purple-300 w-fit text-transparent bg-clip-text'>Excolo</div>
           
            <div className="container flex justify-between items-center">
                <div className="w-[45%] flex flex-col items-center">
                <h3 className="text-4xl font-medium text-purple-300">Exlpore.Connect.Create</h3>s
                    <img src="https://res.cloudinary.com/ddgyd8szc/image/upload/v1710730096/icons8-circle-50_zpadg2.png" className="animate-bounce" alt="" />
                </div>
                <form className="text-purple-300 font-semibold border-2 border-purple-300 p-5 rounded-3xl flex flex-col gap-3 w-[45%]">
                <label htmlFor="" >Name</label>
            <input
                type="text"
                value={username}
                onChange={(e)=>{setUsername(e.target.value)}}
                placeholder="Enter your name"
                className="p-2 rounded-lg text-black"
            />
            <label htmlFor="">email</label>
 <input
                type="email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                placeholder="Enter your email"
                className="p-2 rounded-lg text-black"
            />
<label htmlFor="">Role</label>
<select id="role" className="p-2 rounded-lg text-black" value={role}  onChange={(e)=>{setRole(e.target.value)}}>
            <option value="reader">Reader</option>
            <option value="writer">Writer</option>
           
          </select>
          {role == "writer" ? <label htmlFor="">Estimate Pay per article
           <select className="p-2 rounded-lg text-black" id="pay" value={pay}  onChange={(e)=>{setPay(e.target.value)}}>
            <option value="reader">$0 - $100</option>
            <option value="writer">$200 - $500</option>
            <option value="reader">$500 - $1000</option>
            <option value="writer">$1000 and above</option>
           
          </select> </label>:
          <></>
          }
          
          <label htmlFor="">About</label>
          <textarea
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        name="about__content"
    
        rows={3}
        placeholder="A little about yourself..."
        className="bg-white rounded-xl px-4 py-2 mt-3 black"
      ></textarea>
            <Button className=" text-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-[50%]' " onClick={handleSubmit}>Submit</Button>
                </form>
            </div>
        </section>
    
    );
};

export default WelcomePage;