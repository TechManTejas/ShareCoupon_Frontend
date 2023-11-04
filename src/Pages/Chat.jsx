import { useEffect, useState } from "react";
import CouponCard from "../Components/CouponCard";
import Navbar from "../Components/Navbar";
import axios from "axios";
import ButtonWavey from "../Components/ButtonWavey";

export default function Chat() {

  const [couponData, setCouponData] = useState({});
  const [chatData, setChatData] = useState([
    // {
    //   text:"Some Text",
    //   source: localStorage.getItem("share-coupon-user")
    // }
  ]);
  const [text, setText] = useState("")

  const getChats = () => {
    axios.get(`/all-coupons/${localStorage.getItem("coupon-id")}/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("share-coupon-access-token")}`,
      },
    })
      .then((response) => {
        setChatData(response.data.chats.data)
      })
      .catch((error) => {
        console.error('Error fetching coupon details:', error);
      });
  }

  const updateChats = (newChatData) => {
    axios.patch(`/all-coupons/${localStorage.getItem("coupon-id")}/`, { chats: { data: newChatData } }, {
      headers: {
        Authorization: `Token ${localStorage.getItem("share-coupon-access-token")}`,
      }
    })
      .then((response) => {
        console.log(response.data)
        setChatData(response.data.chats.data)
      })
      .catch((error) => {
        console.error('Error fetching coupon details:', error);
      });
  }

  useEffect(() => {
    setInterval(getChats, 2000)
    // Fetch coupon details based on couponId using Axios
    axios.get(`/all-coupons/${localStorage.getItem("coupon-id")}/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("share-coupon-access-token")}`,
      },
    })
      .then((response) => {
        setCouponData(response.data);
        setChatData(response.data.chats.data)
      })
      .catch((error) => {
        console.error('Error fetching coupon details:', error);
      });
  }, []);


  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex h-[calc(100%-64px)]">
        <div className="w-4/6 border border-gray-200">
          <div className="w-full px-5 flex flex-col justify-between h-full">

            <div className="flex flex-col mt-5 h-screen overflow-y-scroll">

              {/* <div className="flex justify-end mb-4">
                <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                  Welcome to group everyone !
                </div>
              </div>

              <div className="flex justify-start mb-4">
                <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat at
                  praesentium, aut ullam delectus odio error sit rem. Architecto nulla
                  doloribus laborum illo rem enim dolor odio saepe, consequatur quas?
                </div>
              </div> */}

              {
                chatData?.map((chat, id) => {
                  return (
                    <div key={id}>
                      {chat.source === localStorage.getItem("share-coupon-user") ?
                        <>
                          <div className="flex justify-end mb-4">
                            <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                              <div className="text-xs">
                                {chat.source}
                              </div>
                              <div>
                                {chat.text}
                              </div>
                            </div>
                          </div>
                        </> : <>
                          <div className="flex justify-start mb-4">
                            <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                              <div className="text-xs">
                                {chat.source}
                              </div>
                              <div>
                                {chat.text}
                              </div>
                            </div>
                          </div>
                        </>
                      }
                    </div>
                  )
                })
              }

            </div>

            <div className="flex sticky bottom-0 py-5 w-full">
              <div className="w-full">
                <input
                  className="w-full bg-gray-300 py-5 px-3 rounded-xl"
                  type="text"
                  placeholder="type your message here..."
                  value={text}
                  onChange={(e) => { setText(e.target.value) }}
                />
              </div>
              <div className="w-48 m-5">
                <ButtonWavey text="SEND" onClick={() => {
                  const newChatData = [...chatData, { text: text, source: localStorage.getItem('share-coupon-user') }];
                  setText("")
                  updateChats(newChatData)
                }} />
              </div>
            </div>

          </div>

        </div>
        <div className="w-2/6 border border-gray-200">
          <CouponCard title={couponData.title} status={couponData.status} likes={couponData.likes} />
          <div className="flex justify-center border m-4 py-4 px-4">
            {couponData.description}
          </div>
          <div className="min-w-full">
            <div className="bg-white rounded-lg py-3">
              <div className="p-2">
                <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                  {couponData.user?.username}
                </h3>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
