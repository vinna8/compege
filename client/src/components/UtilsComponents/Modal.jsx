import styled from 'styled-components';

const PopUp = ({active, setActive, children}) => {
    return (
        <Modal onClick={() => setActive(false)}>
            <ModalContent onClick={e => e.stopPropagation()}>
                {children}
            </ModalContent>
        </Modal>
    )
}

export default PopUp;

const Modal = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

const ModalContent = styled.div`
    padding: 20px;
    border: 1px solid #000000;
    border-radius: 25px;
	background: #FFFFFF;
    width: 400px;
`