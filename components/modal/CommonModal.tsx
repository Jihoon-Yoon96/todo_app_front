import React from 'react';
import { Modal, View, TouchableOpacity, Text } from 'react-native';
import { X } from 'lucide-react-native';

const CommonModal = ({ visible, onClose, children }) => {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="bg-white w-80 p-5 rounded-2xl relative">
                    <TouchableOpacity
                        onPress={onClose}
                        className="absolute top-3 right-3 p-1"
                    >
                        <X size={24} color="black" />
                    </TouchableOpacity>
                    {children}
                </View>
            </View>
        </Modal>
    );
};

export default CommonModal;
