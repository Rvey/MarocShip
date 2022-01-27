import { useAppSelector, useAppDispatch } from '../Redux/hook';
import { decrement, increment, selectCount } from '../Redux/features/counter/counterSlice';
import { useGetManagersQuery } from '../Redux/services/managers';
import { userData, selectUser, clearData } from '../Redux/features/auth/userSlice';
import { useCookies } from 'react-cookie';

interface BombFieldProps {
    name: string;
}
// let persistor = persistStore(store);
const BombField: React.FC<BombFieldProps> = () => {
    const count = useAppSelector(selectCount);
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const { data, error, isLoading } = useGetManagersQuery();
    const [cookies, setCookie] = useCookies(['name']);

    return (
        <div>
            <h1 className="font-bold text-3xl text-white p-5"> BombField 💣</h1>
            <button onClick={() => dispatch(increment())}>increment</button>
            <button onClick={() => dispatch(decrement())}>decrement</button>
            <button
                onClick={() => {
                    dispatch(clearData());
                }}
            >
                purge state
            </button>
            <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() =>
                    dispatch(
                        userData({
                            name: cookies.name,
                            email: cookies.name,
                            token: 'test'
                        })
                    )
                }
            >
                add user to store
            </button>

            <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() =>
                    dispatch(
                        userData({
                            name: cookies.name,
                            email: cookies.name,
                            token: 'test'
                        })
                    )
                }
            >
                REMOVE user from store
            </button>

            {user.name && <p>{JSON.stringify(user)}</p>}
            {/* {user.email && <p>{user.email}</p>} */}
            {/* {user.token && <p>{user.token}</p>} */}
            {/* cookie :{cookies.name && <p>{cookies.name}</p>} */}
        </div>
    );
};

export default BombField;
