import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useSchedule, ClassSession } from '@/context/ScheduleContext';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { router } from 'expo-router';

const DAYS: ('Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri')[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const HOURS = Array.from({ length: 10 }, (_, i) => i + 9); // 9 AM to 6 PM

export default function ScheduleScreen() {
  const { classes } = useSchedule();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const renderClass = (cls: ClassSession) => {
    const startHour = parseInt(cls.startTime.split(':')[0]);
    const startMin = parseInt(cls.startTime.split(':')[1]);
    const endHour = parseInt(cls.endTime.split(':')[0]);
    const endMin = parseInt(cls.endTime.split(':')[1]);

    const top = (startHour - 9) * 60 + startMin;
    const height = (endHour - startHour) * 60 + (endMin - startMin);

    return (
      <View
        key={cls.id}
        style={[
          styles.classBlock,
          {
            top,
            height,
            backgroundColor: cls.color,
            borderColor: theme.border,
          },
        ]}
      >
        <Text style={styles.classSubject} numberOfLines={1}>{cls.subject}</Text>
        <Text style={styles.classProfessor} numberOfLines={1}>{cls.professor}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <View style={styles.timeColumnSpacer} />
        {DAYS.map((day) => (
          <View key={day} style={styles.dayHeader}>
            <Text style={[styles.dayText, { color: theme.text }]}>{day}</Text>
          </View>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.gridContainer}>
          {/* Time Column */}
          <View style={styles.timeColumn}>
            {HOURS.map((hour) => (
              <View key={hour} style={styles.hourCell}>
                <Text style={[styles.hourText, { color: theme.secondary }]}>{hour}:00</Text>
              </View>
            ))}
          </View>

          {/* Days Columns */}
          <View style={styles.daysContainer}>
            {DAYS.map((day) => (
              <View key={day} style={[styles.dayColumn, { borderRightColor: theme.border }]}>
                {/* Horizontal grid lines */}
                {HOURS.map((hour) => (
                  <View key={hour} style={[styles.hourGridCell, { borderBottomColor: theme.border }]} />
                ))}
                {/* Classes for this day */}
                {classes
                  .filter((cls) => cls.day === day)
                  .map(renderClass)}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={[styles.fab, { backgroundColor: theme.primary }]}
        onPress={() => router.push('/schedule/new')}
      >
        <IconSymbol name="plus.circle.fill" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  timeColumnSpacer: {
    width: 50,
  },
  dayHeader: {
    flex: 1,
    alignItems: 'center',
  },
  dayText: {
    fontSize: 14,
    fontWeight: '600',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
  },
  timeColumn: {
    width: 50,
  },
  hourCell: {
    height: 60,
    alignItems: 'center',
    paddingTop: 4,
  },
  hourText: {
    fontSize: 12,
  },
  daysContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  dayColumn: {
    flex: 1,
    height: 600, // 10 hours * 60 pixels
    borderRightWidth: 0.5,
    position: 'relative',
  },
  hourGridCell: {
    height: 60,
    borderBottomWidth: 0.5,
  },
  classBlock: {
    position: 'absolute',
    left: 2,
    right: 2,
    borderRadius: 4,
    padding: 4,
    borderWidth: 0.5,
    zIndex: 1,
  },
  classSubject: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  classProfessor: {
    fontSize: 9,
    color: '#475569',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
