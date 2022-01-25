import { useAppSelector, useAppDispatch } from '../Redux/hook';
import { decrement, increment, selectCount } from '../Redux/features/counter/counterSlice';
import { useGetManagersQuery } from '../Redux/services/managers';

interface BombFieldProps {
    name: string;
}
const BombField: React.FC<BombFieldProps> = () => {
    const count = useAppSelector(selectCount);
    const dispatch = useAppDispatch();
    const { data, error, isLoading } = useGetManagersQuery();

    return (
        <div>
            <h1 className="font-bold text-3xl text-white p-5"> BombField 💣</h1>
            <ul>
                {data?.map((el, index) => (
                    <li key={index}>{el.name}</li>
                ))}
            </ul>

            <button onClick={() => dispatch(increment())}>increment</button>
            <button onClick={() => dispatch(decrement())}>decrement</button>
        </div>
    );
};

export default BombField;
