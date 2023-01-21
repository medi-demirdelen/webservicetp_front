import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

function Auth() {

    return (
        <div className="AuthBody">
            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </div>
    )

}

export default Auth;