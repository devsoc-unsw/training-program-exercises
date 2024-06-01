import { useState } from "react";
import { Navbar } from "../components/Navbar/Navbar";

import '../css/Login.css';
import { GMButton } from "../components/GMButton/GMButton";

import { useNavigate } from "react-router";

export function Login() {
    const [gID, setGID] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    function handleSubmit() {
        console.log(gID);
        localStorage.setItem("gId", gID);
        localStorage.setItem('USER_TYPE', 'STUDENT');
        console.log(password);
        navigate("/home");
    }
 
    return (
        <>
            <Navbar/>
            <div className="flex w-screen h-[87%] padding-2 justify-center items-center">
                <div className="flex flex-col items-center py-20 w-[70%] h-[80%] shadow-lg bg-[url('./src/assets/MAIN_BLOCK.png')]">
                    <h1 className="text-4xl text-center">Welcome Back!</h1>
                    <div className="flex flex-col items-center text-left w-[70%] h-[50%] mt-8 ">
                        <div className="w-[75%] mb-[4%]">
                            <h2 className="text-xl">gID</h2>
                            <input type="text" className="w-full shadow-xl p-[10px] loginInput" onChange={e => setGID(e.target.value)}></input>
                        </div>
                        <div className="w-[75%]">
                            <h2 className="text-xl">Password</h2>
                            <input type="password" className="w-full shadow-xl p-[10px] mb-7 loginInput"  onChange={e => setPassword(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-[70%] h-[20%] mt-[3rem]">
                        <GMButton name="Log In" onClick={handleSubmit}/>
                    </div>
                </div>
            </div>
        </>
    )
}