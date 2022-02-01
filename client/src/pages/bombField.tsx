import { useAppSelector, useAppDispatch } from '../Redux/hook';
import { decrement, increment, selectCount } from '../Redux/features/counter/counterSlice';
import { useGetManagersQuery } from '../Redux/services/managers';
import { userData, selectUser, clearData } from '../Redux/features/auth/userSlice';
import { useCookies } from 'react-cookie';
import { useState } from 'react';

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







    const [value , setValue] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');








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


                {/* <form action="">
                    <input type="text" value={value} onChange={() => setValue(e.sfsdf)} />
                </form> */}


        </div>
    );
};

export default BombField;

// class HelloMessage extends React.Component {
//     render() {
//       return (
//         <div>
//           Hello {this.props.name}
//         </div>
//       );
//     }
//   }
  
//   ReactDOM.render(
//     <HelloMessage name="Taylor" />,
//     document.getElementById('hello-example')
//   );

  

//   const ParentbombField = ({name}) => {
//     return <div>
// <cHILDbOM name={name} LAST={lastaname} />
//     </div>;
//   };
  
//   export default bombField;




//   const ChildbombField = ({name , laset}) => {
//     return <div>
// {name}
//     </div>;
//   };
  
//   export default bombField;
  