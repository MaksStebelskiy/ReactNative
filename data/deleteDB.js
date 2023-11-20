// deleteDB.js

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import dbPromise from './manageDB';

const handleDelete = (year, month, service) => {
  console.log('Inside handleDelete:', year, month, service);

  dbPromise()
    .then((db) => {
      db.transaction(
        (tx) => {

            tx.executeSql(
                'SELECT * FROM costs WHERE year = ? AND month = ? AND service = ?;',
                [year, month, service],
                (_, resultSet) => {
                  const rows = resultSet.rows;
                  console.log('Записи, які будуть видалені:');
                  for (let i = 0; i < rows.length; i++) {
                    console.log(rows.item(i));
                  }
                },
                (_, error) => {
                  console.error('Помилка при виборі даних перед видаленням:', error);
                }
              );




              tx.executeSql(
                'DELETE FROM costs WHERE year = ? AND month = ? AND service = ?;',
                [year, month, service],
                (_, result) => {
                  console.log('Кількість видалених записів:', result.rowsAffected);
                },
                (_, error) => {
                  console.error('Помилка при видаленні запису з таблиці:', error);
                }
              );

          // Виведення вмісту БД в консоль після видалення
          tx.executeSql(
            'SELECT * FROM costs;',
            [],
            (_, resultSet) => {
              const rows = resultSet.rows;
              console.log('Вміст таблиці costs після видалення:');
              for (let i = 0; i < rows.length; i++) {
                console.log(rows.item(i));
              }
            },
            (_, error) => {
              console.error('Помилка при виборі даних з таблиці:', error);
            }
          );
        },
        (error) => {
          console.error('Помилка при транзакції:', error);
        }
      );
    })
    .catch((error) => {
      console.error('Помилка при доступі до бази даних:', error);
    });
};

const DeleteMode = ({
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
  selectedService,
  setSelectedService,
  handleDelete,
}) => {
  const [years, setYears] = useState([]);

  useEffect(() => {
    // Отримати роки з бази даних
    dbPromise()
      .then((db) => {
        db.transaction(
          (tx) => {
            tx.executeSql(
              'SELECT DISTINCT year FROM costs;',
              [],
              (_, resultSet) => {
                const rows = resultSet.rows;
                const yearsArray = [];
                for (let i = 0; i < rows.length; i++) {
                  yearsArray.push({ label: rows.item(i).year, value: rows.item(i).year });
                }
                setYears(yearsArray);
              },
              (_, error) => {
                console.error('Помилка при виборі років з таблиці:', error);
              }
            );
          },
          (error) => {
            console.error('Помилка при транзакції:', error);
          }
        );
      })
      .catch((error) => {
        console.error('Помилка при доступі до бази даних:', error);
      });
  }, []);

  const handleDeleteWithLogging = async () => {
    // Виклик функції видалення
    await handleDelete(selectedYear, selectedMonth, selectedService);
  };

  return (
    <View>
      <TextInput
        placeholder="Введіть рік"
        keyboardType="numeric"
        value={selectedYear}
        onChangeText={(text) => setSelectedYear(text)}
        style={{ width: 200, marginTop: 10, padding: 10, borderWidth: 1, borderColor: 'gray' }}
      />

      <RNPickerSelect
        placeholder={{ label: 'Виберіть місяць', value: null }}
        items={[
          { label: 'Січень', value: '01' },
          { label: 'Лютий', value: '02' },
          { label: 'Березень', value: '03' },
          { label: 'Квітень', value: '04' },
          { label: 'Травень', value: '05' },
          { label: 'Червень', value: '06' },
          { label: 'Липень', value: '07' },
          { label: 'Серпень', value: '08' },
          { label: 'Вересень', value: '09' },
          { label: 'Жовтень', value: '10' },
          { label: 'Листопад', value: '11' },
          { label: 'Грудень', value: '12' },
        ]}
        onValueChange={(value) => setSelectedMonth(value)}
        style={{ inputAndroid: { width: 200, marginTop: 10 } }}
        value={selectedMonth}
      />

      <RNPickerSelect
        placeholder={{ label: 'Виберіть послугу', value: null }}
        items={[
          { label: 'Вода', value: 'water' },
          { label: 'Газ', value: 'gas' },
        ]}
        onValueChange={(value) => setSelectedService(value)}
        style={{ inputAndroid: { width: 200, marginTop: 10 } }}
        value={selectedService}
      />

      <TouchableOpacity onPress={handleDeleteWithLogging} style={{ marginTop: 10, backgroundColor: 'red', padding: 10 }}>
        <Text style={{ color: 'white' }}>Видалити</Text>
      </TouchableOpacity>
    </View>
  );
};

export default {
  handleDelete,
  DeleteMode,
};
