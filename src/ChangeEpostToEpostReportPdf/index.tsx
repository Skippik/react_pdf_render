import {
  Document,
  Font,
  Image,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import logo from './logo-min.jpg';
import dataJson from './data.json';
import {Style} from '@react-pdf/types';
import {ReactNode} from 'react';
import sansReg from '../assets/fonts/OpenSans-Regular.ttf';
import sansBold from '../assets/fonts//OpenSans-Bold.ttf';

type BarcodeReading = {
  id: number;
  epost_id: number;
  epost_name: string;
  barcode: string;
  error: string;
  warning: string;
};

const ChangeEpostToEpostReportPdf = () =>
  // data: BarcodeReading[],
  // epostFronTo: {
  //   from: number;
  //   to: number;
  // },
  {
    //
    Font.register({
      family: 'OpenSans',
      format: 'truetype',
      fonts: [
        {
          src: sansReg,
          fontWeight: 'normal',
        },
        {
          src: sansBold,
          fontWeight: 'bold',
        },
      ],
    });
    //
    const data = JSON.parse(JSON.stringify(dataJson)) as BarcodeReading[];

    const Cell = ({
      width,
      line1,
      line2,
      shiftLeft,
      shiftRight,
      textStyles = {},
      render,
    }: {
      width: number;
      line1: string | number;
      line2?: string | number;
      shiftLeft?: boolean;
      shiftRight?: boolean;
      textStyles?: Style;
      render?: (props: {pageNumber: number}) => ReactNode | undefined;
    }) => (
      <View
        style={[
          {
            width: `${width}px`,
            marginLeft: shiftLeft ? -1 : undefined,
            marginRight: shiftRight ? -1 : undefined,
          },
          styles.cell,
          textStyles,
          {height: '28px'},
        ]}>
        <Text style={{marginTop: '-3px', textAlign: 'right'}} render={render}>
          {line1.toString()}
        </Text>
        {line2 && <Text>{line2.toString()}</Text>}
      </View>
    );

    const Row = ({row, index}: {row: BarcodeReading; index: number}) => {
      return (
        <View style={[styles.rtlRow, {marginTop: '-1px'}]}>
          {/* 1. */}
          <Cell
            width={40}
            line1={index}
            textStyles={{fontSize: 8}}
            shiftRight
          />
          {/* 2. */}
          <Cell
            width={80}
            line1={row.barcode}
            textStyles={{fontSize: 8}}
            shiftRight
          />
          {/* 3. */}
          <Cell
            width={450}
            line1={row.error}
            textStyles={{fontSize: 8}}
            shiftRight
          />
        </View>
      );
    };

    const TableHeader = () => (
      <View style={styles.rtlRow} fixed>
        {/* 1. */}
        <Cell width={40} line1={'סדר'} textStyles={{fontSize: 8}} shiftRight />
        {/* 2. */}
        <Cell
          width={80}
          line1={'ברקוד'}
          textStyles={{fontSize: 8}}
          shiftRight
        />
        {/* 3. */}
        <Cell
          width={450}
          line1={'שגיאות'}
          textStyles={{fontSize: 8}}
          shiftRight
        />
      </View>
    );

    const Table = ({rows}: {rows: BarcodeReading[]}) => {
      return (
        <>
          <TableHeader />

          {rows.map((epost, index) => (
            <Row key={epost.id} row={epost} index={index} />
          ))}

          <View style={{height: '4px'}} />
        </>
      );
    };

    //
    const MyDocument = () => (
      <Document title={'דוח שינוי נ.חלוקה עם קורא ברקוד'}>
        <Page size='A4' orientation='portrait' style={styles.page}>
          <View
            fixed
            style={[
              styles.rtlRow,
              {
                width: '100%',
                alignItems: 'center',
                marginBottom: '14px',
                justifyContent: 'space-between',
              },
            ]}>
            <View
              style={{
                width: 61,
                height: 35,
              }}>
              <Image src={logo} />
            </View>

            <View
              style={{
                flexDirection: 'row-reverse',
              }}>
              {/* date */}
              <Text
                style={{
                  paddingRight: '20px',
                  paddingBottom: '10px',
                }}>
                {new Date().toLocaleDateString('he', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </Text>
              {/* time */}
              <Text
                style={{
                  paddingRight: '20px',
                  paddingBottom: '10px',
                }}>
                {new Date().toLocaleTimeString('he', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </Text>
            </View>
          </View>

          <View
            fixed
            style={[
              styles.rtlRow,
              {
                width: '100%',
                marginBottom: 4,
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}>
            <View style={{flexDirection: 'row-reverse'}}>
              <Text
                style={[
                  styles.bold,
                  {
                    fontSize: '18px',
                    paddingBottom: '10px',
                  },
                ]}>
                {'דוח שינוי נ.חלוקה עם קורא ברקוד'}
              </Text>
            </View>
            <>
              <View style={styles.titleFromToWrapper}>
                <View style={styles.titleFromTo}>
                  <Text>{'123'}</Text>
                  <Text>{'נקודה קיימת'}</Text>
                </View>
                <View style={styles.titleFromTo}>
                  <Text>{321}</Text>
                  <Text>{'נקודה להחלפה'}</Text>
                </View>
              </View>
            </>
          </View>

          <Table rows={data} />
        </Page>
      </Document>
    );

    return (
      <PDFViewer style={{height: '100%', width: '100%'}}>
        <MyDocument />
      </PDFViewer>
    );
  };

//
const styles = StyleSheet.create({
  page: {
    fontFamily: 'OpenSans',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 10,
    lineHeight: 1.1,
    padding: 14,
    alignItems: 'flex-end',
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
  },
  rtlRow: {
    flexDirection: 'row-reverse',
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  cell: {
    height: '16px',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '2px',
    paddingRight: '2px',
    textAlign: 'center',
    border: '1px solid black',
  },
  titleFromToWrapper: {
    flexDirection: 'row',
    gap: 30,
  },
  titleFromTo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});

export default ChangeEpostToEpostReportPdf;
