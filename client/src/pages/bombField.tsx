import { useAppSelector, useAppDispatch } from '../Redux/hook';
import { decrement, increment, selectCount } from '../Redux/features/counter/counterSlice';
import { useGetPokemonByNameQuery } from './../Redux/services/pokemon';

const BombField = () => {
    const count = useAppSelector(selectCount);
    const dispatch = useAppDispatch();
    const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur');
    return (
        <div>
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
