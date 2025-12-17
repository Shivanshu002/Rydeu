import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/slices/authSlice';

import {
  getNextSixMonths,
  generateMonthDays,
  days,
} from '../utils/calendarUtils';

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const [selectedDate, setSelectedDate] = useState(moment());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const months = useMemo(() => getNextSixMonths(), []);

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Welcome</Text>
          <Text style={styles.username}>
            {user?.firstName || 'User'} {user?.lastName}
          </Text>
        </View>

        <TouchableOpacity onPress={onLogout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.selectedBox}>
        <Text style={styles.selectedText}>
          Selected Date: {selectedDate.format('DD MMM YYYY')}
        </Text>
        <Text style={styles.selectedText}>
          Selected Time: {selectedDate.format('hh:mm A')}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.timeBtn}
        onPress={() => setShowTimePicker(true)}
      >
        <Text style={styles.timeBtnText}>Select Time</Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={selectedDate.toDate()}
          mode="time"
          onChange={(_, date) => {
            setShowTimePicker(false);
            if (date) {
              setSelectedDate(moment(date));
            }
          }}
        />
      )}

      {months.map((month, index) => (
        <View key={index} style={styles.monthContainer}>
          <Text style={styles.monthTitle}>
            {month.format('MMMM YYYY')}
          </Text>

          <View style={styles.weekRow}>
            {days.map(d => (
              <Text key={d} style={styles.weekText}>{d}</Text>
            ))}
          </View>

          <View style={styles.daysContainer}>
            {generateMonthDays(month).map((day, idx) => {
              const isSelected = day.isSame(selectedDate, 'day');
              const isCurrentMonth = day.month() === month.month();

              return (
                <TouchableOpacity
                  key={idx}
                  disabled={!isCurrentMonth}
                  onPress={() =>
                    setSelectedDate(prev =>
                      prev.clone().set({
                        year: day.year(),
                        month: day.month(),
                        date: day.date(),
                      })
                    )
                  }
                  style={[
                    styles.dayBox,
                    isSelected && styles.selectedDay,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      !isCurrentMonth && styles.disabledText,
                      isSelected && styles.selectedDayText,
                    ]}
                  >
                    {day.date()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Home;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2EAFF',
    padding: 16,
  },

  header: {
    backgroundColor: '#1646e4',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  welcome: {
    color: '#fff',
    fontSize: 14,
  },

  username: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  logoutBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  logoutText: {
    color: '#1646e4',
    fontWeight: 'bold',
  },

  selectedBox: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },

  selectedText: {
    fontSize: 14,
    marginBottom: 4,
  },

  timeBtn: {
    backgroundColor: '#1646e4',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },

  timeBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  monthContainer: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 14,
    marginBottom: 16,
  },

  monthTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },

  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  weekText: {
    width: '14.2%',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 12,
  },

  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  dayBox: {
    width: '14.2%',
    alignItems: 'center',
    paddingVertical: 10,
  },

  dayText: {
    fontSize: 13,
  },

  selectedDay: {
    backgroundColor: '#1646e4',
    borderRadius: 20,
  },

  selectedDayText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  disabledText: {
    color: '#ccc',
  },
});
