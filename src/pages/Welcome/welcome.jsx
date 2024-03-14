import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBlog } from "../../Context/blog";
const WelcomePage = () => {
    const [username, setUsername] = useState("");
    const navigate = useNavigate()
    const { handleUsernameSubmit } = useBlog();

    const handleInputChange = (event) => {
        setUsername(event.target.value);
    };

    const handleSubmit = () => {
        handleUsernameSubmit(username);
        navigate("/")
    };

    return (
        <div>
            <input
                type="text"
                value={username}
                onChange={handleInputChange}
                placeholder="Enter your name"
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default WelcomePage;