import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import axios from 'axios';
import ButtonWavey from "../Components/ButtonWavey";
import CouponCard from "../Components/CouponCard";
import Navbar from "../Components/Navbar";
import CouponCreateModal from '../Components/CouponCreateModal';

export default function Home() {

    const [visible, setVisible] = useState(false);
    const [selectedBucket, setSelectedBucket] = useState("all-coupons")
    const [coupons, setCoupons] = useState([])
    const [updater, setUpdater] = useState(0)

    const showModal = () => {
        setVisible(true);
    };

    const hideModal = () => {
        setUpdater(updater + 1)
        setVisible(false);
    };

    function getCoupons() {
        axios.get(`/${selectedBucket}/`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("share-coupon-access-token")}`
            }
        }).then(function (response) {
            // Handle the successful response here
            console.log('Response data:', response.data);

            setCoupons(response.data)

        }).catch(function (error) {
            // Handle any errors that occurred during the request
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        getCoupons()
    }, [selectedBucket, updater])


    return (
        <>
            <Modal
                title="Create Coupon"
                open={visible}
                onCancel={hideModal}
                footer={null}
            >
                <CouponCreateModal hideModal={hideModal} />
            </Modal>
            <Navbar />
            <div>
                <div className="flex justify-between items-center border p-4">
                    <div className="flex gap-x-4">
                        <ButtonWavey text={"All Coupons"} onClick={() => { setSelectedBucket("all-coupons") }} color="blue" />
                        <ButtonWavey text={"My Coupons"} onClick={() => { setSelectedBucket("my-coupons") }} color="blue" />
                    </div>
                    <div>
                        <div onClick={showModal} className="bg-blue-500 hover:bg-blue-600 text-white text-4xl w-16 h-16 rounded-full flex justify-center items-center shadow-black shadow-md">
                            +
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="grid grid-cols-4">
                    {coupons.map((coupon, id) => {
                        return (
                            <CouponCard key={id} id={coupon.id} title={coupon.title} status={coupon.status} likes={coupon.likes} bucket={selectedBucket}/>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
