import { Modal } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import CouponEditModal from "./CouponEditModal";

export default function CouponCard({ id, title, status, likes, bucket }) {

    const navigate = useNavigate()

    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const hideModal = () => {
        setVisible(false);
    };

    return (
        <>
            <Modal
                title="Create Coupon"
                open={visible}
                onCancel={hideModal}
                footer={null}
            >
                <CouponEditModal hideModal={hideModal} couponId={id}/>
            </Modal>
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-center py-6 px-20 m-4 rounded-lg shadow-md relative">
                <h3 className="text-2xl font-semibold">
                    {title}
                </h3>
                <div className="flex justify-between items-center space-x-2">
                    <button
                        onClick={() => { 
                            localStorage.setItem("coupon-id", id)
                            navigate("/chat") 
                        }}
                        id="cpnBtn"
                        className="border border-white bg-white text-purple-600 px-4 py-2 rounded-r cursor-pointer"
                    >
                        Chat
                    </button>
                    <p className="text-sm">{status}</p>
                    {/* <div className="flex gap-x-2">
                        <svg className="text-red-400 hover:text-red-500 w-6 h-auto fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
                        </svg>
                        <div>
                            {likes}
                        </div>
                    </div> */}
                </div>
                {
                    bucket === "my-coupons" && <>
                        <button
                            onClick={showModal}
                            id="cpnBtn"
                            className="border border-white bg-white text-purple-600 px-4 py-2 m-2 rounded-r cursor-pointer w-full"
                        >
                            Edit
                        </button>
                    </>
                }

                <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6" />
                <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6" />
            </div>
        </>

    )
}
