import React, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { Calendar } from "react-native-calendars";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Plus } from "lucide-react-native";
import { useModal } from "@/store/modal";
import ConceptForm from "@/components/modal/ConceptForm";

const CalendarSortTabs = () => {
    const { openModal } = useModal();

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const today = `${year}-${month}-${day}`
    const [selectedDay, setSelectedDay] = useState(today);

    const [selectedTab, setSelectedTab] = useState("time");
    const [concept, setConcept] = useState([
        { id: 1, name: "출근", bigTodos: [{ id: 1, name: "달성도 3/3", doingYn: true }], createDate: "2025-02-04", startTime: "07:00", endTime: "09:00", type: "default", order: 1 },
        { id: 2, name: "퇴근", bigTodos: [], createDate: "2025-02-04", startTime: "18:00", endTime: "20:00", type: "default", order: 2 },
        { id: 3, name: "취침", bigTodos: [], createDate: "2025-02-09", startTime: "23:00", endTime: "07:00", type: "custom", order: 3 },
    ]);

    const sortedConcepts = useMemo(() => {
        if (selectedTab === "time") {
            return [...concept].sort((a, b) => a.startTime.localeCompare(b.startTime));
        } else if (selectedTab === "order") {
            return [...concept].sort((a, b) => a.order - b.order);
        }
    }, [concept, selectedTab]);

    const handleDragEnd = ({ data }) => {
        const updatedData = data.map((item, index) => ({
            ...item,
            order: index,
        }));
        setConcept(updatedData);
    };

    // 모달 열기
    const addBigTodo = async () => {
        const result = await openModal(ConceptForm); // 모달 호출
        if (result) {
            const newConcept = { id: concept.length + 1, ...result };
            setConcept([...concept, newConcept]);
        }
    };

    return (
        <GestureHandlerRootView>
            <View className="p-4 flex-1 bg-white">
                {/* 캘린더 */}
                <Calendar
                    current={today}
                    theme={{
                        selectedDayBackgroundColor: "black",
                        selectedDayTextColor: "white",
                        todayTextColor: "red",
                        arrowColor: "black",
                    }}
                    onDayPress={day => setSelectedDay(day.dateString)}
                    markedDates={{
                        [selectedDay]: {selected: true, marked: true, disableTouchEvent: true, selectedColor: 'black'}
                    }}
                />

                {/* 정렬 탭 */}
                <View className="flex-row mt-4 border-b border-gray-300">
                    {["time", "order"].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            className={`flex-1 py-3 items-center ${selectedTab === tab ? 'border-b-2 border-black' : ''}`}
                            onPress={() => setSelectedTab(tab)}
                        >
                            <Text className={`text-base ${selectedTab === tab ? 'text-black font-bold' : 'text-gray-500'}`}>
                                {tab === "time" ? "시간순" : "사용자 지정순"}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* ToDo 리스트 */}
                <DraggableFlatList
                    className="mt-4"
                    data={sortedConcepts}
                    keyExtractor={(item) => item.id.toString()}
                    onDragEnd={handleDragEnd}
                    renderItem={({ item, drag }) => (
                        <TouchableOpacity
                            className="bg-gray-100 p-4 mb-2 rounded-xl"
                            onLongPress={selectedTab === "order" ? drag : undefined}
                        >
                            <Text className="text-base font-bold text-gray-800">
                                {item.name} ({item.startTime}-{item.endTime})
                            </Text>
                        </TouchableOpacity>
                    )}
                />

                {/* 플로팅 버튼 */}
                <TouchableOpacity
                    className="fixed bottom-5 right-2 bg-black w-14 h-14 rounded-full justify-center items-center shadow-lg"
                    onPress={addBigTodo}
                >
                    <Plus size={28} color="white" />
                </TouchableOpacity>
            </View>
        </GestureHandlerRootView>
    );
};

export default CalendarSortTabs;
