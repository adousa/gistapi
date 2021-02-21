import React, {useEffect, useState} from "react"

import styled from "styled-components";
import {getPublicGists} from "../services/gistService";
import Gist from "./Gist";

const GistList = () => {
    const [gistPublicData, setGistPublicData] = useState([]);
    useEffect(() => {
        getPublicGists().then((response) => {
            const {data} = response;
            setGistPublicData(data);
        })
    }, [])

    return (<ListWrapper>{gistPublicData.map((item) => <Gist key={item.id} {...item} />)}</ListWrapper>)
}


const ListWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    max-width:800px;
    margin: auto;
`;


export default GistList
