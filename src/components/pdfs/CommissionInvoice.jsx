import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const colors = {
  primaryOrange: "#e59623",
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    fontFamily: "Times-Roman",
    fontSize: 11,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    color: "#DAA520",
    fontFamily: "Times-Bold",
  },
  header: {
    textAlign: "center",
    marginBottom: 25,
    marginTop: 15,
  },
  instituteLogo: {
    width: 180,
    height: 40,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 10,
  },
  instituteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primaryOrange,
    textAlign: "center",
    marginBottom: 3,
    fontFamily: "Times-Bold",
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontSize: 10,
    color: "#333",
    marginBottom: 2,
  },
  value: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
  },
  table: {
    border: "1px solid #E0E0E0",
    padding: 10,
    borderRadius: 4,
    backgroundColor: "#F8F9FA",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  bold: {
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
    fontSize: 9,
    textAlign: "center",
    color: "#666",
  },
});

const maskStudentName = (fullName) => {
  if (!fullName) return "";

  const parts = fullName.trim().split(" ");
  if (parts.length < 2) return fullName;

  const [first, last] = parts;
  const maskedFirst = first[0] + "*".repeat(Math.max(2, first.length - 1));
  const maskedLast =
    last.length > 1
      ? "*".repeat(Math.max(2, last.length - 1)) + last[last.length - 1]
      : last;

  return `${maskedFirst} ${maskedLast}`;
};

const CommissionInvoice = ({ formData, result }) => {
  const parseAmount = (v) => parseFloat(v || 0).toFixed(2);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Image
            style={styles.instituteLogo}
            src="https://churchill.nsw.edu.au/assets/logo.png"
          />

          <Text style={styles.instituteTitle}>
            CHURCHILL INSTITUTE OF HIGHER EDUCATION
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Invoice To:</Text>
          <Text style={styles.value}>
            MPIKA HOLDINGS PTY LTD T/as Churchill Institute of Higher Education
          </Text>
          <Text>ABN: 91 612 507 141</Text>
          <Text>Level 1, 16-18 Wentworth Street Parramatta NSW 2150</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Student Name:</Text>
          <Text style={styles.value}>
            {maskStudentName(formData.studentName)}
          </Text>
          <Text>Enrollment Date: {formData.enrollmentDate}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.row}>
            <Text>Tuition Fee Paid:</Text>
            <Text>AUD {parseAmount(formData.feePayment)}</Text>
          </View>

          {formData.isFirstSemester === "yes" && (
            <>
              <View style={styles.row}>
                <Text>Less: Enrollment Fee:</Text>
                <Text>AUD {parseAmount(formData.enrollmentFee)}</Text>
              </View>
              <View style={styles.row}>
                <Text>Less: SAAF Fee:</Text>
                <Text>AUD {parseAmount(formData.saafFee)}</Text>
              </View>
            </>
          )}

          <View style={styles.row}>
            <Text>Less: Incentive:</Text>
            <Text>AUD {parseAmount(formData.incentive)}</Text>
          </View>

          <View style={[styles.row, styles.bold]}>
            <Text>Claimable Base (20%):</Text>
            <Text>AUD {parseAmount(result.baseCommission)}</Text>
          </View>

          {formData.location === "australia" &&
            formData.gstRegistered === "yes" ? (
            <>
              <View style={styles.row}>
                <Text>GST (10%):</Text>
                <Text>AUD {parseAmount(result.gstAmount)}</Text>
              </View>
              <View style={[styles.row, styles.bold]}>
                <Text>Total Amount (inc. GST):</Text>
                <Text>AUD {parseAmount(result.totalAmount)}</Text>
              </View>
            </>
          ) : (
            <View style={[styles.row, styles.bold]}>
              <Text>Total Claimable Commission:</Text>
              <Text>AUD {parseAmount(result.totalAmount)}</Text>
            </View>
          )}
        </View>

        <Text style={styles.footer}>
          Churchill Institute of Higher Education
          • CRICOS Provider Code 04082E
          • TEQSA Provider Number PRV14305
          • ABN: 91 612 507 141
        </Text>
      </Page>
    </Document>
  );
};

export default CommissionInvoice;
