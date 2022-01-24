import { useAppSelector, useAppDispatch } from './../store/hook';
import { decrement, increment } from './../store/features/counter/counterSlice';
interface BombFieldProps {}

const BombField: React.FunctionComponent<BombFieldProps> = () => {
    const count = useAppSelector((state) => state.counter.value)
    const dispatch = useAppDispatch()

    return <div>
        <button onClick={() => dispatch(increment())}>increment</button>
        <button onClick={() => dispatch(decrement())}>decrement</button>
    </div>;
};

export default BombField;
