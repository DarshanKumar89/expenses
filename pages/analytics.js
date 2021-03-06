import tw from 'twin.macro'
import { useSubscription } from '@apollo/react-hooks'

import { Layout } from '../sections'
import { EXPENSES } from '../graphql'
import { ByCategories, ByYears, ByMonths } from '../sections/analytics'

const Analytics = () => {
   const { loading, data: { expenses = [] } = {} } = useSubscription(EXPENSES)

   return (
      <Layout>
         <div tw="w-full lg:w-6/12">
            <h2 tw="border-b pb-2 text-lg mt-3 text-teal-700">
               Spendings by categories
            </h2>
            <ByCategories loading={loading} expenses={expenses} />
         </div>
         <div tw="w-full lg:w-6/12">
            <div tw="w-full">
               <h2 tw="border-b pb-2 text-lg mt-3 text-teal-700">
                  Spendings by Years
               </h2>
               <ByYears loading={loading} expenses={expenses} />
            </div>
            <div tw="w-full">
               <h2 tw="border-b pb-2 text-lg mt-5 text-teal-700">
                  Spendings by Months
               </h2>
               <ByMonths loading={loading} expenses={expenses} />
            </div>
         </div>
      </Layout>
   )
}

export default Analytics
