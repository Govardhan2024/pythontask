import './app.css'
import AddExpense from './components/AddExpenses'
import AddIncome from './components/Addincome'
import Budgetsummery from './components/Budgetsummery'

import TotalList from './components/TotalList'



const App = () => {
  return (
    <div>

      <AddIncome />
      <AddExpense />
      <Budgetsummery />
      <TotalList />
    </div>
  )
}

export default App
