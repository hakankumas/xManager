import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import React from "react";

function Footer() {
    return (
        <footer className="flex py-5 px-10 bg-slate-800">
            <div className="w-1/3 flex justify-center items-center">
                <Typography variant="subtitle2" color="white" component="div">
                    xManager is a MERN Stack, TypeScript and Tailwind CSS
                    project.
                </Typography>
            </div>
            <div className="w-1/3 flex justify-center items-center">
                <Typography variant="subtitle2" color="white" component="div">
                    Powered by Hakan KUMAŞ.
                </Typography>
            </div>
            <div className="w-1/3 flex justify-center items-center gap-10 text-3xl">
                <div>
                    <Link
                        to="https://github.com/hakankumas"
                        target="_blank"
                        style={{ textDecoration: "none", color: "white" }}
                    >
                        <FaGithub />
                    </Link>
                </div>
                <div>
                    <Link
                        to="https://www.linkedin.com/in/hakankumas/"
                        target="_blank"
                        style={{ textDecoration: "none", color: "white" }}
                    >
                        <FaLinkedin />
                    </Link>
                </div>
            </div>
        </footer>
    );
}

export default React.memo(Footer);
