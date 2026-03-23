import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import { useSchedule } from '@/context/ScheduleContext';
import { router } from 'expo-router';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const DAYS: ('Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri')[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export default function AddClassScreen() {
  const { addClass } = useSchedule();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [subject, setSubject] = useState('');
  const [professor, setProfessor] = useState('');
  const [day, setDay] = useState<typeof DAYS[number]>('Mon');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:30');

  const handleAdd = () => {
    if (!subject || !professor || !startTime || !endTime) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    addClass({
      subject,
      professor,
      day,
      startTime,
      endTime,
      color: '#E0F2FE', // Default color
    });
    router.back();
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Input label="Subject Name" placeholder="e.g. Algorithms" value={subject} onChangeText={setSubject} />
        <Input label="Professor" placeholder="e.g. Prof. Kim" value={professor} onChangeText={setProfessor} />
        
        <Text style={[styles.label, { color: theme.text }]}>Day</Text>
        <View style={styles.dayContainer}>
          {DAYS.map((d) => (
            <TouchableOpacity
              key={d}
              style={[
                styles.dayBadge,
                { 
                  backgroundColor: day === d ? theme.primary : theme.card,
                  borderColor: theme.border 
                },
              ]}
              onPress={() => setDay(d)}
            >
              <Text style={{ color: day === d ? '#FFFFFF' : theme.text }}>{d}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.timeRow}>
          <Input label="Start Time" placeholder="09:00" value={startTime} onChangeText={setStartTime} style={styles.timeInput} />
          <Input label="End Time" placeholder="10:30" value={endTime} onChangeText={setEndTime} style={styles.timeInput} />
        </View>

        <Button title="Add to Schedule" onPress={handleAdd} style={styles.button} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  dayContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  dayBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    minWidth: 50,
    alignItems: 'center',
  },
  timeRow: {
    flexDirection: 'row',
    gap: 16,
  },
  timeInput: {
    flex: 1,
  },
  button: {
    marginTop: 24,
  },
});
