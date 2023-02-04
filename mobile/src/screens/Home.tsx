import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Header } from "../components/Header";
import { HabitDay, daySize } from "../components/HabitDay";
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning';

const weekDays = [
    'D',
    'S',
    'T',
    'Q',
    'Q',
    'S',
    'S',
]

const datesFromYearStart = generateDatesFromYearBeginning();
const minimunSummaryDatesSize = 18 * 5;
const amountOfDayToFill = minimunSummaryDatesSize - datesFromYearStart.length;


export function Home() {
    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <Header />
            <View className="flex-row mt-6 mb-2">
                {
                    weekDays.map((weekDay, index) => (
                        <Text key={`${weekDay}-${index}`}
                            className="text-zinc-400 text-xl font-bold text-center mx-1"
                            style={{ width: daySize }} >
                            {weekDay}
                        </Text>
                    ))
                }
            </View>
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}>

                <View className="flex-row flex-wrap">
                    {
                        datesFromYearStart.map(date => (
                            <HabitDay
                                key={date.toString()} />
                        ))
                    }

                    {amountOfDayToFill > 0 && Array
                        .from({ length: amountOfDayToFill })
                        .map(
                            (_, i) => {
                                return (

                                    <View key={i}
                                        className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                                        style={{ width: daySize, height: daySize }}
                                    />
                                )
                            }
                        )}
                </View>
            </ScrollView>
        </View>
    )
}