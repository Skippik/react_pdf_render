import {useEffect, useState} from 'react';
import csvData from './colors.csv?raw';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import {Button} from 'antd';
//
// interfaces.ts
export interface CsvRow {
  beige: string;
}

export interface UniqueCount {
  text: string;
  count: number;
}

const Parcer = () => {
  // const [data, setData] = useState<CsvRow[]>([]);
  const [uniqueCounts, setUniqueCounts] = useState<UniqueCount[]>([]);
  console.log('uniqueCounts', uniqueCounts);
  const saveToExcel = () => {
    // Создайте массив для данных, включая заголовки
    const data = [['Color', 'Count']];

    // Добавьте уникальные данные в массив
    uniqueCounts.forEach(item => {
      data.push([item.text, item.count.toString()]);
    });

    // Создайте новую книгу Excel
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Test');

    // Сохраните книгу Excel в файл
    XLSX.writeFile(workbook, 'test.xlsx');
  };

  //
  useEffect(() => {
    Papa.parse(csvData, {
      header: true,
      dynamicTyping: true,
      complete: result => {
        const parsedData = result.data as CsvRow[];
        // setData(parsedData);

        // Функция для подсчета уникальных значений
        const counts = parsedData.reduce<{[key: string]: number}>(
          (acc, row) => {
            Object.values(row).forEach(value => {
              if (!value) {
                return;
              }
              // Разделение строки на подстроки по запятым и пробелам
              const values = String(value).split(/,\s*/);
              values.forEach(val => {
                if (val.trim()) {
                  acc[val.trim()] = (acc[val.trim()] || 0) + 1;
                }
              });
            });
            return acc;
          },
          {},
        );

        // Преобразование в массив объектов для отображения
        const uniqueCountsArray: UniqueCount[] = Object.keys(counts).map(
          key => ({
            text: key,
            count: counts[key],
          }),
        );

        // Сортировка по убыванию
        uniqueCountsArray.sort((a, b) => b.count - a.count);

        setUniqueCounts(uniqueCountsArray);
      },
      error: error => {
        console.error('Ошибка при парсинге:', error);
      },
    });
  }, []);

  return (
    <div style={{height: '100vh'}}>
      <h2>Уникальные значения и их количество:</h2>
      <Button onClick={saveToExcel}>{'Save'}</Button>
      <div style={{maxHeight: '900px', overflowY: 'auto'}}>
        <table>
          <thead>
            <tr>
              <th>Текст</th>
              <th>Количество</th>
            </tr>
          </thead>
          <tbody>
            {uniqueCounts.map((item, index) => (
              <tr key={index}>
                <td>{item.text}</td>
                <td>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Parcer;
