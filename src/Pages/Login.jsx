import ShareCouponLogo from "../Images/ShareCouponLogo.png"
import axios from "axios";
import { useState } from "react";

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const sectionStyle = {
        backgroundImage: `url('https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg')`
    };

    function login() {

        axios.post("/auth/", {
            'username': email,
            'password': password
        })
            .then(function (response) {
                // Handle the successful response here
                console.log('Response data:', response.data);

                localStorage.setItem('share-coupon-access-token', response.data.token)
                localStorage.setItem('share-coupon-user', response.data.user)
                window.location.href = "/"
            })
            .catch(function (error) {
                // Handle any errors that occurred during the request
                console.error('Error:', error);
            });
    }

    return (
        <>
            <section className="bg-gray-100 dark:bg-gray-900" style={sectionStyle}>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a
                        href="#"
                        className="flex items-center mb-6 text-2xl font-semibold text-white"
                    >
                        <img
                            className="w-8 h-8 mr-2"
                            src={ShareCouponLogo}
                            alt="logo"
                        />
                        ShareCoupon
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Login
                            </h1>
                            <div className="space-y-4 md:space-y-6">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@domain.com"
                                        required="*"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value) }}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required="*"
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    onClick={login}
                                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Login
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Do not have an account?{" "}
                                    <a
                                        href="/signup"
                                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                    >
                                        Create account
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
