import React from 'react';
import { useModal } from '@/store/modal';
import CommonModal from './CommonModal';

const ModalRenderer = () => {
    const { modals, closeModal } = useModal();

    return (
        <>
            {modals.map((modal) => {
                const ModalComponent = modal.component;
                return (
                    <CommonModal
                        key={modal.key}
                        visible={true}
                        onClose={()=>closeModal()}
                    >
                        <ModalComponent {...modal.props} />
                    </CommonModal>
                );
            })}
        </>
    );
};

export default ModalRenderer;
