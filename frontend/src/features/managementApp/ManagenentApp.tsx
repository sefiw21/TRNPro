import { Header } from '@/components/layouts/header/Header'
import DynamicForm from './components/DynamicForm'

const ManagenentApp = () => {
    return (
        <div>
            <Header />
            {/* <Button>Family</Button>
            <Button>Offical</Button>
            <Recursive /> */}
            <DynamicForm />
        </div>
    )
}

export default ManagenentApp