'use client'
import React, { FC, useState, useEffect } from 'react';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';

type Props = {
  course: any;
  user: any;
}

const CheckOutForm: FC<Props> = ({ course, user }) => {
  const [order, setOrder] = useState('');

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          description: course?.name,
          amount: {
            currency_code: 'USD',
            value: course?.price,
          },
        },
      ],
      application_context: {
        return_url: process.env.NEXT_PUBLIC_SERVER_URI,
        cancel_url: process.env.NEXT_PUBLIC_SERVER_URI,
      },
    });
  };

  const onApprove = async (data: any, actions: any) => {
    return actions.order.capture().then(function (details: any) {
      console.log('Payment successful:', details);
      // Handle successful payment here
      setOrder(details);
    });
  };

  return (
    <div className="w-full">
      <h1 className="text-[25px] font-Poppins font-[600] text-center py-2">
        Course - {course.name}
      </h1>
      <div className="w-full flex items-center justify-center">
        <h1 className="text-[20px] font-Poppins">
          Price: ${course.price}
        </h1>
      </div>
      
      <div className="w-full mt-5">
        {/* Payment form will go here */}
        <div className="text-center p-5 bg-gray-100 rounded">
          <p className="text-gray-600 mb-4">Payment integration coming soon!</p>
          <button 
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
            onClick={() => {
              // For now, just close the modal
              alert('Payment feature will be implemented soon!');
            }}
          >
            Continue with Mock Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOutForm;
