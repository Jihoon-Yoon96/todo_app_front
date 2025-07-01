import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const ConceptForm = ({ close }) => {
    const [name, setName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    return (
        <View>
            <Text className="text-lg font-bold mb-4">컨셉 추가하기</Text>

            <Text className="mb-1">이름</Text>
            <TextInput
                className="w-full p-3 border border-gray-300 mb-3 rounded-lg"
                value={name}
                onChangeText={setName}
                placeholder="컨셉 이름"
            />

            <Text className="mb-1">시작 시간 (ex: 07:00)</Text>
            <TextInput
                className="w-full p-3 border border-gray-300 mb-3 rounded-lg"
                value={startTime}
                onChangeText={setStartTime}
                placeholder="시작 시간"
            />

            <Text className="mb-1">종료 시간 (ex: 09:00)</Text>
            <TextInput
                className="w-full p-3 border border-gray-300 mb-3 rounded-lg"
                value={endTime}
                onChangeText={setEndTime}
                placeholder="종료 시간"
            />

            <View className="flex-row space-x-3">
                <TouchableOpacity
                    onPress={() => close({ name, startTime, endTime, bigTodos: [], createDate: new Date().toISOString().slice(0, 10), type: 'custom', order: 0 })}
                    className="flex-1 bg-black p-3 rounded-lg items-center"
                >
                    <Text className="text-white">확인</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => close()}
                    className="flex-1 bg-gray-400 p-3 rounded-lg items-center"
                >
                    <Text className="text-white">취소</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ConceptForm;
