import { useAppSelector, useAppDispatch } from '../Redux/hook';
import { decrement, increment, selectCount } from '../Redux/features/counter/counterSlice';
import { useGetPokemonByNameQuery } from './../Redux/services/pokemon';
import { useGetManagersQuery } from '../Redux/services/managers';

interface BombFieldProps {
    name: string
}
const BombField: React.FC<BombFieldProps> = () => {
    const count = useAppSelector(selectCount);
    const dispatch = useAppDispatch();
    const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur');
    const { data:managers, error:ERR, isLoading:loading } = useGetManagersQuery();
    console.log(managers);
    
    return (
        <div>
            <h1 className='font-bold text-3xl text-white p-5'> BombField 💣</h1>
            {error ? (
                <>Oh no, there was an error</>
            ) : isLoading ? (
                <>Loading...</>
            ) : data ? (
                <>
                    <h3>{data.species.name}</h3>
                    <img src={data.sprites.front_shiny} alt={data.species.name} />
                </>
            ) : null}
          
            <button onClick={() => dispatch(increment())}>increment</button>
            <button onClick={() => dispatch(decrement())}>decrement</button>
        </div>
    );
};

export default BombField;
