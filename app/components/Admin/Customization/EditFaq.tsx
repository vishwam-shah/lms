import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi'
import React, { useEffect, useState } from 'react'

type Props = {}

const EditFaq = (props: Props) => {
    const {data, isLoading} = useGetHeroDataQuery("FAQ", {
        refetchOnMountOrArgChange: true,
    });

    const [questions, setQuestions] = useState<any[]>([]);

    useEffect(() => {
        if(data){
            setQuestions(data.layout.faq);
        }
    }, [data])

  return (
    <div>EditFaq</div>
  )
}

export default EditFaq