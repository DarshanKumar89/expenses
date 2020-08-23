import { useSubscription } from '@apollo/react-hooks'

import { Cards } from '../sections/expenses/cards'
import { useWindowSize, paginate } from '../utils'
import { EXPENSES, TOTAL_EXPENSES } from '../graphql'
import { Layout } from '../sections'
import { Listing, Analytics } from '../sections/expenses/tables'

const Expenses = () => {
   const { width } = useWindowSize()
   const [limit] = React.useState(10)
   const [offset, setOffset] = React.useState(0)
   const { data: { total_expenses = {} } = {} } = useSubscription(
      TOTAL_EXPENSES
   )
   const { loading, data: { expenses = [] } = {} } = useSubscription(EXPENSES, {
      variables: {
         offset: offset * limit,
         limit,
      },
   })

   const TOTAL_PAGES = Math.ceil(total_expenses?.aggregate?.count / limit) || 0

   return (
      <Layout>
         <div className="w-full lg:w-9/12">
            <h1 className="mt-4 text-xl text-teal-600 border-b pb-2">
               Expenses
            </h1>
            <section className="my-3 w-full flex items-center justify-center space-x-3">
               <button
                  className="h-8 px-2 border rounded"
                  onClick={() => setOffset(offset > 0 ? offset - 1 : 0)}
               >
                  Prev
               </button>
               <ul className="flex space-x-2">
                  {paginate(offset, TOTAL_PAGES).map(node => (
                     <li key={node + Math.floor(Math.random() * 100)}>
                        {typeof node === 'string' ? (
                           <span className="h-8 w-8">{node}</span>
                        ) : (
                           <button
                              onClick={() => setOffset(node - 1)}
                              className={`h-8 w-8 border rounded ${
                                 offset + 1 === node
                                    ? 'bg-green-500 border-green-500 text-white'
                                    : ''
                              }`}
                           >
                              {node}
                           </button>
                        )}
                     </li>
                  ))}
               </ul>
               <button
                  className="h-8 px-2 border rounded"
                  onClick={() =>
                     setOffset(
                        offset + 1 < TOTAL_PAGES ? offset + 1 : TOTAL_PAGES - 1
                     )
                  }
               >
                  Next
               </button>
            </section>
            {width >= 768 && <Listing loading={loading} expenses={expenses} />}
            {width < 768 && <Cards loading={loading} expenses={expenses} />}
         </div>
         <div className="w-full lg:w-3/12">
            <h1 className="mt-4 text-xl text-teal-600 border-b pb-2">
               Analytics
            </h1>
            <Analytics />
         </div>
      </Layout>
   )
}

export default Expenses
