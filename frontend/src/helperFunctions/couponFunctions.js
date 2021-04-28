import axios from "axios";

export const addCoupon = async (coupon, token) =>
  await axios.post(
    `${process.env.REACT_APP_API}/coupon`,
    { coupon },
    {
      headers: {
        token,
      },
    }
  );

export const getCoupons = async () =>
  await axios.get(`${process.env.REACT_APP_API}/coupons`);

export const removeCoupon = async (couponId, token) =>
  await axios.delete(`${process.env.REACT_APP_API}/coupon/${couponId}`, {
    headers: {
      token,
    },
  });




export const applyCoupon = async (coupon, token) =>
await axios.post(
  `${process.env.REACT_APP_API}/user/checkout/coupon`,
  { coupon },
  {
    headers: {
      token,
    },
  }
);
