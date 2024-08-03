import {
  Document,
  Image,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import logo from './img/logo-min.jpg';

const ProofOfDelivery = () => {
  //
  // Добавление кастомных шрифтов (если необходимо)
  // Font.register({
  //   family: 'CustomFont',
  //   src: 'URL_TO_FONT_FILE'
  // });

  // Замените URL_TO_ICON_xxx на фактические URL-адреса ваших иконок
  const URL_TO_ICON_CALENDAR = logo;
  const URL_TO_ICON_USER = logo;
  const URL_TO_ICON_CLOCK = logo;
  const URL_TO_ICON_ADDRESS = logo;
  const URL_TO_ICON_COMPANY = logo;

  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: 'Helvetica',
      position: 'relative',
      minHeight: '100%',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
      paddingBottom: 20,
    },
    headerText: {
      fontSize: 10,
      color: '#666',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 10,
      textAlign: 'center',
      marginBottom: 30,
    },
    shipmentNumberWrapper: {
      backgroundColor: '#f2f5fa',
      borderRadius: 8,
      padding: 10,
      marginVertical: 10,
      alignItems: 'center',
      width: 200,
      alignSelf: 'center',
    },
    shipmentNumber: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#3B82F6',
    },
    sectionStart: {
      margin: 10,
      paddingVertical: 30,
      paddingHorizontal: 20,
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 5,
      backgroundColor: 'red',
      alignItems: 'flex-start',
      height: '100%',
    },
    sectionEnd: {
      margin: 10,
      paddingVertical: 30,
      paddingHorizontal: 20,
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 5,
      backgroundColor: 'green',
      alignItems: 'flex-end',
      height: '100%',
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    sectionContent: {
      fontSize: 12,
      marginBottom: 5,
      textAlign: 'center',
    },
    sectionContentEnd: {
      fontSize: 12,
      marginBottom: 5,
      fontWeight: 'light',
      textAlign: 'right',
    },

    footer: {
      position: 'absolute',
      bottom: 30, // Расстояние от низа страницы
      left: 20,
      right: 20,
      fontSize: 10,
      textAlign: 'center',
      color: '#666',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: '#3B82F6',
    },
    footerText: {
      fontSize: 12,
      marginBottom: 5,
      fontWeight: 'light',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'blue',
      maxHeight: 368,
    },
    col: {
      maxWidth: '50%',
    },
    iconTextRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },

    iconTextRowEnd: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    icon: {
      width: 12,
      height: 12,
      marginRight: 5,
    },
    iconEnd: {
      width: 12,
      height: 12,
      marginLeft: 5,
    },

    sectionContentBold: {
      fontSize: 12,
      marginBottom: 5,
      fontWeight: 'bold',
    },
    rowText: {
      alignItems: 'flex-start',
    },
    rowTextEnd: {
      alignItems: 'flex-end',
    },
  });
  //
  const MyDocument = () => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Image src={logo} style={{width: 80, height: 50}} />
          <Image src={logo} style={{width: 80, height: 50}} />
        </View>
        <Text style={styles.title}>PROOF OF DELIVERY</Text>
        <Text style={styles.sectionContent}>
          We hereby confirm that delivery number
        </Text>
        <Text style={styles.sectionContent}>
          We hereby declare that shipment number:
        </Text>
        <View style={styles.shipmentNumberWrapper}>
          <Text style={styles.shipmentNumber}>69058611</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <View style={styles.sectionStart}>
              <View style={styles.iconTextRow}>
                <Image src={URL_TO_ICON_USER} style={styles.icon} />
                <View style={styles.rowText}>
                  <Text style={styles.sectionTitle}>For</Text>
                  <Text style={styles.sectionContent}>User Name</Text>
                </View>
              </View>
              <View style={styles.iconTextRow}>
                <Image src={URL_TO_ICON_CALENDAR} style={styles.icon} />
                <View style={styles.rowText}>
                  <Text style={styles.sectionTitle}>On</Text>
                  <Text style={styles.sectionContent}>12.04.2024</Text>
                </View>
              </View>

              <View style={styles.iconTextRow}>
                <Image src={URL_TO_ICON_CLOCK} style={styles.icon} />
                <View style={styles.rowText}>
                  <Text style={styles.sectionTitle}>At</Text>
                  <Text style={styles.sectionContent}>12:15</Text>
                </View>
              </View>
              <View style={styles.iconTextRow}>
                <Image src={URL_TO_ICON_ADDRESS} style={styles.icon} />
                <View style={styles.rowText}>
                  <Text style={styles.sectionTitle}>In the address:</Text>
                  <Text style={styles.sectionContent}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  </Text>
                </View>
              </View>

              <View style={styles.iconTextRow}>
                <Image src={URL_TO_ICON_COMPANY} style={styles.icon} />
                <View style={styles.rowText}>
                  <Text style={styles.sectionTitle}>From</Text>
                  <Text style={styles.sectionContent}>company</Text>
                </View>
              </View>
            </View>
          </View>
          {/*  */}
          <View style={styles.col}>
            <View style={styles.sectionEnd}>
              <View style={styles.iconTextRowEnd}>
                <View style={styles.rowTextEnd}>
                  <Text style={styles.sectionTitle}>For</Text>
                  <Text style={styles.sectionContentEnd}>User Name</Text>
                </View>
                <Image src={URL_TO_ICON_USER} style={styles.iconEnd} />
              </View>
              <View style={styles.iconTextRow}>
                <View style={styles.rowTextEnd}>
                  <Text style={styles.sectionTitle}>On</Text>
                  <Text style={styles.sectionContentEnd}>12.04.2024</Text>
                </View>
                <Image src={URL_TO_ICON_CALENDAR} style={styles.iconEnd} />
              </View>

              <View style={styles.iconTextRow}>
                <View style={styles.rowTextEnd}>
                  <Text style={styles.sectionTitle}>At</Text>
                  <Text style={styles.sectionContentEnd}>12:15</Text>
                </View>
                <Image src={URL_TO_ICON_CLOCK} style={styles.iconEnd} />
              </View>
              <View style={styles.iconTextRow}>
                <View style={styles.rowTextEnd}>
                  <Text style={styles.sectionTitle}>In the address:</Text>
                  <Text style={styles.sectionContentEnd}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  </Text>
                </View>
                <Image src={URL_TO_ICON_ADDRESS} style={styles.iconEnd} />
              </View>

              <View style={styles.iconTextRow}>
                <View style={styles.rowTextEnd}>
                  <Text style={styles.sectionTitle}>From</Text>
                  <Text style={styles.sectionContentEnd}>company</Text>
                </View>
                <Image src={URL_TO_ICON_COMPANY} style={styles.iconEnd} />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>03-9244441</Text>
          <Text style={styles.footerText}>www.hfd.co.il</Text>
        </View>
      </Page>
    </Document>
  );
  //
  return (
    <PDFViewer style={{height: '100%', width: '100%'}}>
      <MyDocument />
    </PDFViewer>
  );
};

export default ProofOfDelivery;
