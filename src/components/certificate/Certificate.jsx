import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import PropTypes from "prop-types";

const colors = {
  primaryBlue: "#003366",
  accentGold: "#DAA520",
  lightBlue: "#4A90E2",
  charcoalGrey: "#333333",
  lightGrey: "#F8F9FA",
  white: "#FFFFFF",
  borderGrey: "#E0E0E0",
};

const Certificate = ({ agentName, email, location, completionDate }) => {
  const styles = StyleSheet.create({
    page: {
      backgroundColor: colors.white,
      padding: 30,
      fontFamily: "Times-Roman",
      position: "relative",
      height: "100%",
    },
    decorativeBorder: {
      position: "absolute",
      top: 15,
      left: 15,
      right: 15,
      bottom: 15,
      border: `3px solid ${colors.primaryBlue}`,
      borderRadius: 8,
    },
    innerBorder: {
      position: "absolute",
      top: 25,
      left: 25,
      right: 25,
      bottom: 25,
      border: `1px solid ${colors.accentGold}`,
      borderRadius: 5,
    },
    header: {
      textAlign: "center",
      marginBottom: 25,
      marginTop: 15,
    },
    instituteLogo: {
      width: 120,
      height: 60,
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: 10,
    },
    instituteTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.primaryBlue,
      marginBottom: 3,
      fontFamily: "Times-Bold",
    },
    instituteUrl: {
      fontSize: 9,
      color: colors.lightBlue,
      marginBottom: 15,
    },
    certificateTitle: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.accentGold,
      textAlign: "center",
      marginBottom: 20,
      fontFamily: "Times-Bold",
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    body: {
      textAlign: "center",
      marginHorizontal: 30,
      marginBottom: 25,
      flexGrow: 1,
    },
    congratulationsText: {
      fontSize: 22,
      fontWeight: "bold",
      color: colors.primaryBlue,
      marginBottom: 20,
      fontFamily: "Times-Bold",
      lineHeight: 1.3,
    },
    agentDetails: {
      backgroundColor: colors.lightGrey,
      padding: 15,
      marginVertical: 20,
      borderRadius: 5,
      border: `1px solid ${colors.borderGrey}`,
    },
    agentName: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.primaryBlue,
      marginBottom: 8,
      fontFamily: "Times-Bold",
    },
    agentInfo: {
      fontSize: 12,
      color: colors.charcoalGrey,
      marginBottom: 3,
    },
    courseTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.primaryBlue,
      marginVertical: 15,
      fontFamily: "Times-Bold",
      textTransform: "uppercase",
    },
    completionText: {
      fontSize: 12,
      color: colors.charcoalGrey,
      marginBottom: 15,
      lineHeight: 1.4,
    },
    signatureSection: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginHorizontal: 40,
      marginTop: 20,
    },
    signature: {
      textAlign: "center",
      width: 100,
    },
    signatureLine: {
      borderTop: `2px solid ${colors.primaryBlue}`,
      width: 100,
      marginBottom: 5,
    },
    signatureTitle: {
      fontSize: 10,
      fontWeight: "bold",
      color: colors.primaryBlue,
      marginBottom: 1,
      fontFamily: "Times-Bold",
    },
    signatureRole: {
      fontSize: 8,
      color: colors.charcoalGrey,
    },
    footer: {
      position: "absolute",
      bottom: 30,
      left: 30,
      right: 30,
      textAlign: "center",
    },
    footerText: {
      fontSize: 8,
      color: colors.charcoalGrey,
      marginBottom: 2,
    },
    watermark: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%) rotate(-45deg)",
      fontSize: 50,
      color: colors.lightGrey,
      opacity: 0.08,
      fontWeight: "bold",
      zIndex: -1,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.decorativeBorder} />
        <View style={styles.innerBorder} />

        {/* Watermark */}
        <Text style={styles.watermark}>CHURCHILL</Text>

        {/* Header */}
        <View style={styles.header}>
          <Image
            style={styles.instituteLogo}
            src="/assets/logo.png"
            alt="logo"
          />
          <Text style={styles.instituteTitle}>
            CHURCHILL INSTITUTE OF HIGHER EDUCATION
          </Text>
          <Text style={styles.instituteUrl}>https://churchill.nsw.edu.au</Text>
        </View>

        {/* Certificate Title */}
        <Text style={styles.certificateTitle}>Certificate</Text>

        {/* Body */}
        <View style={styles.body}>
          <Text style={styles.congratulationsText}>
            Congratulations for completing
          </Text>

          <Text style={styles.courseTitle}>Agent Induction Course</Text>

          <View style={styles.agentDetails}>
            <Text style={styles.agentName}>{agentName}</Text>
            <Text style={styles.agentInfo}>Email: {email}</Text>
            <Text style={styles.agentInfo}>Location: {location}</Text>
          </View>

          <Text style={styles.completionText}>
            This certificate acknowledges your successful completion of the
            Agent Induction Course and demonstrates your commitment to
            professional development and excellence in service delivery.
          </Text>

          <Text style={styles.completionText}>
            <Text style={{ fontWeight: "bold", fontFamily: "Times-Bold" }}>
              Date of Completion:{" "}
            </Text>
            {completionDate}
          </Text>
        </View>

        {/* Signatures */}
        {/* <View style={styles.signatureSection}>
          <View style={styles.signature}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureTitle}>Dr. Michael Chen</Text>
            <Text style={styles.signatureRole}>Chief Executive Officer</Text>
          </View>
          <View style={styles.signature}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureTitle}>Training Director</Text>
            <Text style={styles.signatureRole}>Agent Services</Text>
          </View>
        </View> */}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Churchill Institute of Higher Education • ABN: 12 345 678 901 •
            Phone: +61 2 9876 5432
          </Text>
          <Text style={styles.footerText}>
            RTO Code: 91290 | CRICOS Provider: 03893J
          </Text>
        </View>
      </Page>
    </Document>
  );
};

Certificate.propTypes = {
  agentName: PropTypes.string,
  email: PropTypes.string,
  location: PropTypes.string,
  completionDate: PropTypes.string,
};

export default Certificate;
