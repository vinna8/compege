import preloader from './preloader.json';
import Lottie from "lottie-react";
import styled from "styled-components";

const Wrapper = styled.div`
    z-index: 1;
    position: absolute;

    margin: 0;
    transform: translate(-50%, -50%);
    top: 50%; 
    left: 50%;
`;

let Preloader = () => {
    return (
        <Wrapper>
            <Lottie animationData={preloader} />
        </Wrapper>
    )
}

export default Preloader;