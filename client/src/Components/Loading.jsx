import React from "react";

export default function Loading({setLoading}){
    return(
        <div>
            <div>
                <img src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/e7455f108374165.5fbc778773bda.gif' alt=''/>
            </div>
            <div>
                {setTimeout(() => {setLoading(false)}, 3000)}
            </div>
        </div>
    )
}