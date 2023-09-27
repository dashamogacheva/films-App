import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import FilmDetailsPage from "./components/FilmDetailsCard/FilmDetailsPage";
import MainPage from "./components/MainPage/MainPage";
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducer";
import thunkMiddleware from "redux-thunk";
import { createLogger } from 'redux-logger';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage/>,
    },
    {
        path: `films/:filmId`,
        element: <FilmDetailsPage/>,
    },
]);

const loggerMiddleware = createLogger();

const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                    <RouterProvider router={router}/>
            </Provider>
        </div>
    );
}

export default App;
