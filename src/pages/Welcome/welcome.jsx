import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBlog } from "../../Context/blog";
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
        navigate("/")
    };

    return (
        <div>
            <label htmlFor="">Name</label>
            <input
                type="text"
                value={username}
                onChange={(e)=>{setUsername(e.target.value)}}
                placeholder="Enter your name"
            />
            <label htmlFor="">email</label>
 <input
                type="email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                placeholder="Enter your email"
            />
<label htmlFor="">Role</label>
<select id="role" value={role}  onChange={(e)=>{setRole(e.target.value)}}>
            <option value="reader">Reader</option>
            <option value="writer">Writer</option>
           
          </select>
          {role == "writer" ? <label htmlFor="">Estimate Pay per article
           <select id="pay" value={pay}  onChange={(e)=>{setPay(e.target.value)}}>
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
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default WelcomePage;