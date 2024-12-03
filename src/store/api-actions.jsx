import { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";

import {getToken} from "./token";


export function useApiQuery(url, setPage, checking=true) {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        const userToken = getToken();

        if (checking && !userToken) {
            navigate("/login");
            return;
        }
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                dispatch(setPage(data));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
            fetchData();
        }, [url, dispatch, navigate]);
}
