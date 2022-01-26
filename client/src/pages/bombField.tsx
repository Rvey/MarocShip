import { useAppSelector, useAppDispatch } from '../Redux/hook';
import { decrement, increment, selectCount } from '../Redux/features/counter/counterSlice';
import { useGetManagersQuery } from '../Redux/services/managers';
import { userData, selectUser } from '../Redux/features/auth/userSlice';
interface BombFieldProps {
    name: string;
}
const BombField: React.FC<BombFieldProps> = () => {
    const count = useAppSelector(selectCount);
    const user = useAppSelector(selectUser);
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
            <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() =>
                    dispatch(
                        userData({
                            name: 'test',
                            email: 'rredouane@gmail.com',
                            token: 'test'
                        })
                    )
                }
            >
                add user to store
            </button>

            {user.name && <p>{user.name}</p>}
            {user.email && <p>{user.email}</p>}
            {user.token && <p>{user.token}</p>}
        </div>
    );
};

export default BombField;
