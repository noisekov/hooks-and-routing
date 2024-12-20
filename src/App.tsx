import './App.css';
import { useState } from 'react';
import Search from './components/Search/Search';
import Pokemon from './components/Pokemon/Pokemon';
import Pagination from './components/Pagination/Pagination';

interface requestDataI {
    name: string;
    abilities: string[];
    sprites: string;
    next: string;
    previous: string;
    url: string[];
    isInputEmpty: boolean;
}
export default function App() {
    const [inputData, setInputData] = useState<requestDataI>({
        name: '',
        abilities: [],
        sprites: '',
        next: '',
        previous: '',
        url: [],
        isInputEmpty: true,
    });
    const [isError, setError] = useState(false);
    const [paginationPage, setPaginationPage] = useState(0);

    const handleData = (inputData: requestDataI) => {
        setInputData(inputData);
    };

    const handleNewTemplate = (data: requestDataI) => {
        setInputData(data);
    };

    const handleCurrentPage = (page: number) => {
        setPaginationPage(page);
    };

    const setFirstPageWhenClickSearch = () => {
        setPaginationPage(0);
    };

    if (isError) {
        throw new Error('I crashed!');
    }

    const { isInputEmpty, url } = inputData;

    return (
        <>
            <div className="page">
                <div className="top">
                    <Search
                        onInputData={handleData}
                        setFirstPage={setFirstPageWhenClickSearch}
                    />
                </div>
                <div className="bottom">
                    <Pokemon
                        onInputData={inputData}
                        handleCurrentPage={paginationPage}
                    />
                    {isInputEmpty && !!url.length && (
                        <Pagination
                            getPage={handleCurrentPage}
                            paginationData={inputData}
                            newTemplate={handleNewTemplate}
                            setFirstPage={paginationPage}
                        />
                    )}
                </div>
            </div>
            <button
                className="button button--error"
                onClick={() => {
                    setError(true);
                }}
            >
                throw an error
            </button>
        </>
    );
}
